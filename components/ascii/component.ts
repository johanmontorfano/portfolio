"use client";

import { v4 } from "uuid";
import { type EngineState } from "./engine";

export interface ComponentProps {
    transparent: boolean;
    cutout: boolean;
    size: [number, number];
    position: [number, number];
}

export abstract class Component<S extends Record<string, any>> {
    readonly state: S;
    readonly id: string;
    private renderCallback?: (d: Component<S>) => void;

    constructor(initial: S) {
        this.state = initial;
        this.id = v4();
    } 

    abstract onRequestProperties(_: EngineState): ComponentProps;
    abstract onRender(_: EngineState): string;

    force() {
        this.renderCallback?.(this);
    }

    setState(patch: Partial<S>) {
        Object.assign(this.state, patch);
        this.force();
    }

    onComponentChange(c: (d: Component<S>) => void) {
        if (!this.renderCallback) {
            this.renderCallback = c;
            c(this);
        }
    }
}
