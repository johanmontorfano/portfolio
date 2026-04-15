import { RefObject } from "react";
import { Node } from "./types";
import { randint, rrange, rsizeget } from "./math";

// a link consists of an animation depicting a data transfer between two nodes
// it is self-descriptive, meaning no "bigger animation group" must be created
// from this object's data.
//
// however, it is not against practical guidelines to create a set of links out
// of a "source" and with a pattern in mind.
export interface Link {
    fromId: number;
    toId: number;
    createdAt: number;
    lifetime: number;
    curve: number;
}

// creates a new link object between two IDs
//
// WARN: lifetime should never be Infinity as it breaks all calculations for
// animations, thus rendering the link invisible forever
export function createLink(
    from: number,
    to: number,
    params: {
        lifetime?: number,
        spawnAt?: number,
        curve?: number
    } = {}
): Link {
    return {
        fromId: from,
        toId: to,
        createdAt: params.spawnAt || 0,
        lifetime: params.lifetime || 5 * 60000,
        curve: params.curve || 0
    }
}

// creates a set of links between nodes using two patterns:
// - star creates a "star-like" pattern from the node with nodes around
// - chain creates a direct connection between successive nodes
//
// NOTE: this function increments the activeAnimationsCount of the selected
// nodes
export function createLinkGroup(
    now: number,
    nodes: RefObject<Node[]>,
    from: Node,
    pattern: "star" | "chain",
    lifetimeRange: [number, number]
) {
    const out: Link[] = [];
    const lifetime = rrange(lifetimeRange);

    from.activeAnimationsCount += 1;
    if (pattern === "star") {
        for (let i = 0; i < 5; i++) {
            const target = nodes.current[randint(i, nodes.current.length)];

            target.activeAnimationsCount += 1;
            out.push({
                fromId: from.id, toId: target.id,
                createdAt: now + randint(250, 1000), lifetime,
                curve: 15
            });
        }
    } else if (pattern === "chain") {
        const selectedIdx = rsizeget(randint(2, 7), nodes.current.length);

        nodes.current[selectedIdx[0]].activeAnimationsCount += 1;
        for (let i = 1; i < selectedIdx.length; i++) {
            nodes.current[selectedIdx[i]].activeAnimationsCount += 1;
            out.push({
                fromId: nodes.current[selectedIdx[i - 1]].id,
                toId: nodes.current[selectedIdx[i]].id,
                createdAt: now + i * 500, lifetime,
                curve: 0
            });
        }
    }
    return out;
}
