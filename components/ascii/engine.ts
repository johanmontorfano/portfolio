"use client";

import { Component } from "./component";

export interface EngineState {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    size: [number, number];
    charSize: [number, number];
    fontSize: [number, number];
    components: Component<any>[];
    fontFamily: string;
    ready: boolean;
}

export interface EngineUtils {
    attach(selector: string): void;
    addElement(el: Component<any>): void;
}
