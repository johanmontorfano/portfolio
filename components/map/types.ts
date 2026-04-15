/** MapData produced by the generator in map_matrix_generator.html */
export interface MapData {
    w: number;
    h: number;
    dx: number;
    dy: number;
    offX: number;
    offY: number;
    dot: number;
    matrix: number[][];
}

export type RC = { r: number; c: number; }
export type XY = { x: number; y: number; }

export type Node = RC & XY & {
    id: number;
    alpha: number;
    createdAt: number;
    retiredAt: number;
    activeAnimationsCount: number;
}
