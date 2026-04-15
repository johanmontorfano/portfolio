"use client";

import { useEffect, useMemo, useRef } from "react";
import { rand, rchoice, rrange } from "./math";
import { MapData, Node, RC } from "./types";
import {
    applyFade,
    drawLink,
    getUpscalingFactor,
    mapToXY,
    prepareLinkDrawing,
    prepareOffScreenCanvas,
    prepareRenderingCanvas,
    toXY,
} from "./render";
import { createLinkGroup, Link } from "./links";

interface MapProps {
    data: MapData;
    links?: Link[];
    accent?: string;
    color?: string;
    bg?: string;

    rcNodes?: RC[]; // all RC entires will trigger a node spawn at position
    maxNodes?: number; // upper bound; actual count floats below/at this
    
    linkWidthPx?: number;
    linkDash?: [number, number];
    linkDashSpeed?: number;
    linkMaxCurve?: number;
    linkCurveFactor?: number;
    linkLifetimeRange?: [number, number];

    // NOTE: all values below are used during the "mutate" tick, which is used
    // to perform random actions with the nodes, this behaviour can be disabled
    // by setting disableMutate to true
    disableMutate?: boolean;
    addProbability?: number; // prob to add a node at mutate tick
    linkProbability?: number; // prob to link nodes at mutate tick
    retireProbability?: number; // prob to retire a node at mutate tick
    mutateEventGapRange?: [number, number] // time separation of mutate ticks
}

// NOTE: theming and click events on this component has been removed to 
// simplify it since it is not needed in this project 
// - refer to commit 80c0386f187d951948df7c03cd8c606f9df74f6c to reimplement it
export function DottedMap({
    data,
    links = [],
    accent = "#22c55e",
    color = "#44454b",
    bg = "#000",

    rcNodes = [],
    maxNodes = 200,
    linkWidthPx = 1.8,
    linkDash = [8, 6],
    linkDashSpeed = 90,
    linkLifetimeRange = [7500, 12500],

    disableMutate = false,
    addProbability = 0.85,
    linkProbability = 0.54,
    retireProbability = 0.47,
    mutateEventGapRange = [1200, 2200],
}: MapProps) {
    // map represented as a set of XY coords for RC coords
    const mapXY = useMemo(() => mapToXY(data), [data]);

    // HACK: to optimize efficiency, we enforce a centralized occupied cells
    // counter using the "[r]:[c]" addressing system used before.
    // NOTE: this ref is in sync with the placedNodes ref as they both witness
    // the existence of a node.
    const occupiedCells = useRef<Set<string>>(new Set());
    const placedNodes = useRef<Node[]>([]);
    const activeLinks = useRef<Link[]>([]);

    // we keep track of the total number of ndoes created to provide unique ids
    // to nodes
    const nodesTotalCount = useRef(1);
    const mutateScheduledAt = useRef<number>(0);

    const offScreenCanvas = useRef<HTMLCanvasElement>(null);
    const renderingCanvas = useRef<HTMLCanvasElement>(null);

    const minSpacing = Math.max(data.dx * 1.1, data.dy * 1.1);

    // roulette-wheel pick using region weights with bi-phasic algorithm.
    // First we sum all y, and then we determine the winner
    function weightedPick(arr: { x: number; y: number }[]): number {
        let total = 0;
        for (let i = 0; i < arr.length; i++) {
            total += arr[i].y;
        }
        if (total <= 0) return Math.floor(rand(arr.length));

        let r = rand(total);
        for (let i = 0; i < arr.length; i++) {
            r -= arr[i].y;
            if (r <= 0) return i;
        }
        return arr.length - 1;
    }

    function tryAddNode(now: number) {
        if (placedNodes.current.length >= maxNodes) return false;

        const minR2 = minSpacing * minSpacing;

        // we give ourselves a set of chances to find a place to add a node
        for (let a = 0; a < 30; a++) {
            const idx = weightedPick(mapXY);
            const p = mapXY[idx];
            const key = `${p.r},${p.c}`;

            if (occupiedCells.current.has(key)) continue;

            let spaceOk = true;
            for (const q of placedNodes.current) {
                const dx = p.x - q.x;
                const dy = p.y - q.y;
                if (dx * dx + dy * dy < minR2) {
                    spaceOk = false;
                    break;
                }
            }

            if (spaceOk) {
                occupiedCells.current.add(key);
                placedNodes.current.push({
                    id: nodesTotalCount.current++,
                    x: p.x,
                    y: p.y,
                    r: p.r,
                    c: p.c,
                    alpha: 0,
                    activeAnimationsCount: 0,
                    createdAt: now,
                    retiredAt: 0,
                });
                return true;
            }
        }
        return false;
    }

    // HACK: instead of mapping through all cells multiple times with map and
    // filter, we go through it a single time to find the closest candidate
    // INFO: some nodes might be created with a -1 now, it is a highlights
    // appartenance marker
    function addNodeNear(x: number, y: number, now: number): Node | null {
        let bestCandidate: (typeof mapXY)[0] | null = null;
        let minD2 = Infinity;

        for (let i = 0; i < mapXY.length; i++) {
            const p = mapXY[i];

            if (occupiedCells.current.has(`${p.r}:${p.c}`)) continue;

            const dx = p.x - x;
            const dy = p.y - y;
            const d2 = dx * dx + dy * dy;

            if (d2 < minD2) {
                minD2 = d2;
                bestCandidate = p;
            }
        }
        if (!bestCandidate) return null;

        const node: Node = {
            id: nodesTotalCount.current++,
            x: bestCandidate.x,
            y: bestCandidate.y,
            r: bestCandidate.r,
            c: bestCandidate.c,
            alpha: 0,
            activeAnimationsCount: 0,
            createdAt: now,
            retiredAt: 0,
        };
        placedNodes.current.push(node);
        occupiedCells.current.add(`${node.r}:${node.c}`);
        return node;
    }

    // tries to retire the oldest non-animated node
    // NOTE: all nodes with a createdAt < 0 are considered immortal
    function tryRetireNode(now: number, birthFilter = -1) {
        const candidates = placedNodes.current.filter(
            (n) =>
                !n.activeAnimationsCount &&
                n.createdAt > birthFilter &&
                n.alpha > 0 &&
                n.retiredAt < 1,
        );
        if (!candidates.length) return false;
        candidates.sort((a, b) => a.createdAt - b.createdAt);
        candidates[0].retiredAt = now;
        return true;
    }

    useEffect(() => {
        if (typeof window === "undefined") return;


        window.nodes = { activeLinks, placedNodes };

        offScreenCanvas.current = prepareOffScreenCanvas(
            bg,
            color,
            mapXY,
            data,
            offScreenCanvas.current,
        );
        prepareRenderingCanvas(data, renderingCanvas.current)!;

        const ctx = renderingCanvas.current!.getContext("2d")!;
        const scale = getUpscalingFactor(data);
        let frameReqHandle = 0;

        rcNodes.forEach((h) => {
            const { x, y } = toXY(data, h.r, h.c);
            addNodeNear(x, y, -1);
        });
        activeLinks.current.push(...links);

        const draw = (now: number) => {
            // before drawing anything, we execute everything related to node
            // mutation and spawning
            if (!disableMutate && now >= mutateScheduledAt.current) {
                if (rand() < addProbability) tryAddNode(now);
                if (rand() < linkProbability)
                    activeLinks.current.push(...createLinkGroup(
                        now, placedNodes,
                        rchoice(placedNodes.current),
                        rchoice(["star", "chain"]),
                        linkLifetimeRange
                    ));
                if (rand() < retireProbability) tryRetireNode(now);
                if (placedNodes.current.length > maxNodes) tryRetireNode(now);
                mutateScheduledAt.current = now + rrange(mutateEventGapRange);
            }
            // if a node is retired and has finished transition, we remove it
            placedNodes.current = placedNodes.current.filter(
                (n) => n.retiredAt < 1 || now - n.retiredAt <= 2500,
            );

            const nodesById = new Map(
                placedNodes.current.map((n) => [n.id, n]),
            );

            // we prune interactions to decrement nodes' animations count
            activeLinks.current = activeLinks.current.filter((l) => {
                if (l.createdAt + l.lifetime < now) {
                    if (nodesById.get(l.fromId))
                        nodesById.get(l.fromId)!.activeAnimationsCount -= 1;
                    if (nodesById.get(l.toId))
                        nodesById.get(l.toId)!.activeAnimationsCount -= 1;
                    return false;
                }
                return true;
            });

            // rendering starts here with off-screen buffer copy
            ctx.drawImage(offScreenCanvas.current!, 0, 0);

            // now we render all edges
            prepareLinkDrawing(
                ctx,
                now,
                scale,
                linkWidthPx,
                linkDash,
                linkDashSpeed,
                accent + "AA",
            );
            for (const l of activeLinks.current)
                drawLink(ctx, now, l, nodesById);

            // and the last step is rendering active nodes
            for (const n of placedNodes.current) {
                ctx.globalAlpha = n.alpha = Math.max(
                    0, Math.min(1, applyFade(now, n)),
                );
                ctx.fillStyle = accent;
                ctx.beginPath();
                ctx.arc(n.x, n.y, (data.dot / 2) * 1.1, 0, Math.PI * 2);
                ctx.fill();
            }
            frameReqHandle = requestAnimationFrame(draw);
        };
        frameReqHandle = requestAnimationFrame(draw);
        return () => cancelAnimationFrame(frameReqHandle);
    }, []);

    return <canvas className="w-full" ref={renderingCanvas} />;
}
