import { XY } from "./types";

export const rand = (a = 1) =>
    Math.random() * a;

// NOTE: output is incl in [a; b)
export const randint = (a: number, b: number) =>
    Math.floor(a + Math.random() * (b - a));

export const rchoice = <T>(arr: T[]) =>
    arr[Math.floor(Math.random() * arr.length)];

export const rrange = ([a, b]: [number, number]) =>
    a + Math.random() * (b - a);

// computes the distance between two points relative to the point 'r'
export const relativeDistance = (r: XY, a: XY, b: XY) => {
    const da = (a.x - r.x) * (a.x - r.x) + (a.y - r.y) * (a.y - r.y);
    const db = (b.x - r.x) * (b.x - r.x) + (b.y - r.y) * (b.y - r.y);
    
    return da - db;
}

// selects a X random unique numbers of a number set size
export const rsizeget = (target: number, setSize: number) => {
    if (target <= 0) return [];
    if (target >= setSize) return Array.from({ length: setSize }, (_, i) => i);

    const out = new Set<number>();

    while (out.size < target) out.add(randint(0, setSize));
    return Array.from(out);
}
