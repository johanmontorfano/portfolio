"use client";

import { Link } from "./links";
import { MapData, Node, XY } from "./types";

export function getUpscalingFactor(map: MapData) {
    return Math.max(1, window.innerWidth / map.w);
}

// NOTE: the dotted map data format is using a pixel map size to place
// dots, and to ensure proper positioning the canvas must draw dots at
// the same resolution they were registered. Therefore, canvas might be
// rendered at a lower resolution than the one they are printed at.
// HACK: to ensure the canvas is always rendered with the best quality,
// we are doing upscaling by modifying the coordinates to drawing
// behaviour of drawing functions by scaling coordinates to pixels in
// an area bigger than the one given by the map data.
//
// This function computes the scaling factor, applies it to the canvas and
// returns the scaling factor.
export function prepareUpscaling(cv: HTMLCanvasElement, map: MapData) {
    // the pixel ratio computation is fairly basic, we just scale relative
    // to the width of the dotted map compared to the width of the window
    // FIX: this breaks upscaling usefulness in portrait mode
    const scaling = getUpscalingFactor(map);

    // we increase the size of the canvas drawing area here
    cv.width = Math.round(map.w * scaling);
    cv.height = Math.round(map.h * scaling);

    return scaling;
}

// HACK: Preparing an off-screen canvas of the map allows to greatly increase
// performance by only redrawing changing content and using this canvas as a
// source of pre-rendered content which gets copied through drawImage (which is
// hardware-accelerated)
export function prepareOffScreenCanvas(
    bg: string,
    color: string,
    dots: XY[],
    map: MapData,
    gcanvas: HTMLCanvasElement | null
) {
    const canvas = gcanvas || document.createElement("canvas");
    const R = map.dot / 2;
    
    prepareUpscaling(canvas, map);

    const ctx = canvas.getContext("2d")!;

    // We draw all the dots and backgorund once
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = color;

    dots.forEach(d => {
        ctx.beginPath();
        ctx.arc(d.x, d.y, R * 0.8, 0, Math.PI * 2);
        ctx.fill();
    });
    return canvas;
}

// This canvas welcomes the off-screen canvas content all content drawn on top
// such as active nodes or animations, it is meant to be rendered (hence the
// name)
export function prepareRenderingCanvas(
    map: MapData,
    canvas: HTMLCanvasElement | null
) {
    if (canvas === null) return canvas;

    prepareUpscaling(canvas, map);
    return canvas;
}

// Converts a coordinate in RC space into a coordinate in XY space relative to
// the map data (R = row, C = col needs a conversion in a cartesian space which
// requires knowledge of the map's size, offsets, ...)
export function toXY(map: MapData, r: number, c: number) {
    const y = map.offY + r * map.dy;
    const x = map.offX + (r % 2 === 1 ? map.dx / 2 : 0) + c * map.dx;

    return { x, y };
}

// Converts a whole dotted map into a set of XY points with RC refs
export function mapToXY(map: MapData) {
    const out: { r: number; c: number; x: number; y: number; }[] = [];

    // HACK: rows and columns might not all have the same size as the dotted
    // map is heavily hexagonal, this is the reason there are so many guards
    for (let r = 0; r < map.matrix.length; r++) {
        const row = map.matrix[r] || [];
        for (let c = 0; c < row.length; c++) {
            if (!row[c]) continue;
            const { x, y } = toXY(map, r, c);
            out.push({ r, c, x, y });
        }
    }
    return out;
}

export function prepareLinkDrawing(
    ctx: CanvasRenderingContext2D,
    now: number,
    scale: number,
    linkWidthPx: number,
    linkDash: [number, number],
    linkDashSpeed: number,
    linkColor: string
) {
    ctx.lineWidth = linkWidthPx / scale;
    ctx.setLineDash([linkDash[0] / scale, linkDash[1] / scale]);    
    (ctx as any).lineDashOffset = -((linkDashSpeed * (now / 1000)) / scale);
    ctx.strokeStyle = linkColor;
}

export function drawLink(
    ctx: CanvasRenderingContext2D,
    now: number,
    link: Link,
    nodeMap: Map<number, Node>
) {
    const elapsed = now - link.createdAt;
    
    if (elapsed <= 0) return;

    const progress = Math.min(1, elapsed / link.lifetime);
    const alpha = progress < 0.2 ? progress / 0.2 :
        progress > 0.8 ? (1 - progress) / 51 : 1;

    const a = nodeMap.get(link.fromId);
    const b = nodeMap.get(link.toId);
    if (!a || !b) return;

    const falpha = 0.9 * alpha * Math.min(a.alpha, 1) * Math.min(b.alpha, 1);
    if (falpha <= 0.02) return;

    const dx = b.x - a.x, dy = b.y - a.y;
    const len = Math.hypot(dx, dy) || 1;
    const bulge = link.curve * 3 * (0.6 + 0.4 * 2);
    
    // ctx.globalAlpha = Math.max(0, Math.min(1, applyFade(now, link)));
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.quadraticCurveTo(
        (a.x + b.x) / 2 + (-dy / len) * bulge,
        (a.y + b.y) / 2 + (dx / len) * bulge,
        b.x, b.y
    );
    ctx.stroke();
}

export function applyFade(now: number, n: Link): number;
export function applyFade(now: number, n: Node): number;

// every element printed on the map must be fading in and out, therefore, this
// function is calculating the fade (alpha) of the current object's color
// relative to lifespan
export function applyFade(now: number, n: Link | Node) {
    if ("retiredAt" in n) {
        if (n.retiredAt > 0) return 1 - (now - n.retiredAt) / 2500;
    } else if ("lifetime" in n && n.createdAt + n.lifetime - 2500 >= now) {
        return 1 - (now - n.createdAt + n.lifetime) / 2500;
    } 
    if (now - n.createdAt >= 2500) return 1;
    return (now - n.createdAt) / 2500;
}
