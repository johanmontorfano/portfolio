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

export const distance = (a: XY, b: XY) => {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}

// selects a X random unique numbers of a number set size
export const rsizeget = (target: number, setSize: number) => {
    if (target <= 0) return [];
    if (target >= setSize) return Array.from({ length: setSize }, (_, i) => i);

    const out = new Set<number>();

    while (out.size < target) out.add(randint(0, setSize));
    return Array.from(out);
}

// mix (100 - X)% of a with X% of b
// both colors should be hex-formatted colors
export const hexmix = (a: string, b: string, mix: number): string => {
    mix = Math.min(Math.max(0, mix), 1)

    const parse = (hex: string) => {
        const clean = hex.replace('#', '');
        return {
            r: parseInt(clean.substring(0, 2), 16),
            g: parseInt(clean.substring(2, 4), 16),
            b: parseInt(clean.substring(4, 6), 16),
        };
    };
    const encode = (c: number) => 
        Math.round(c).toString(16).padStart(2, '0');

    const rgbA = parse(a);
    const rgbB = parse(b);
    const mixed = {
        r: rgbA.r * (1 - mix) + rgbB.r * mix,
        g: rgbA.g * (1 - mix) + rgbB.g * mix,
        b: rgbA.b * (1 - mix) + rgbB.b * mix,
    };

    return `#${encode(mixed.r)}${encode(mixed.g)}${encode(mixed.b)}`;
}
