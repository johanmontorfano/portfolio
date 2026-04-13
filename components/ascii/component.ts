"use client";

import { v4 } from "uuid";
import { EngineState, useASCIIEngine } from "./context";

export interface ComponentProps {
    transparent?: boolean; // engine default: false
    cutout?: boolean; // engine default: false
    color?: string; // engine default: #FFFF
    size: [number, number];
    position: [number, number];
}

export interface ExtensionConfiguration {
    reactsToProperties?: boolean;
    reactsToRenders?: boolean;
}

export type ExtensionFactory =
    | (new (cp: Component) => Extension)
    | ((cp: Component) => Extension);

// An extension is used to extend a Component without having to include effects
// by "child-ing" the component, extensions are applied to the component's
// rendered data or properties depending on its configuration
//
// NOTE: compared to a component, an extension has a static property set
export abstract class Extension<S = {}> {
    readonly state: S;
    readonly config: ExtensionConfiguration;
    readonly forId: string;
    
    constructor(
        initial: S,
        config: ExtensionConfiguration,
        completes: Component<Record<string, any>>
    ) {
        this.state = initial;
        this.config = config;
        this.forId = completes.id;
    }

    abstract onProperties(c: ComponentProps, _: EngineState): ComponentProps;
    abstract onRender(s: string, _: EngineState): string;

    force() {
        useASCIIEngine.getState().forceRenderById(this.forId);
    }

    setState(patch: Partial<S>) {
        Object.assign(this.state as object, patch);
        this.force();
    }
}

export abstract class Component<S = {}> {
    readonly extensions: Array<Extension<any>>;
    readonly state: S;
    readonly id: string;

    private renderCallback?: (d: Component<S>) => void;

    constructor(initial: S) {
        this.state = initial;
        this.extensions = [];
        this.id = v4();
    } 

    onUnmount(): void {};
    abstract onRequestProperties(_: EngineState): ComponentProps;
    abstract onRender(_: EngineState): string;

    force() {
        this.renderCallback?.(this);
    }

    // extending a component with an extension implies that the extension
    // will be ran after onRequestProperties and onRender depending on ext
    // configuration
    //
    // NOTE: extensions are applied in the order they are attached
    extendWith(ext: ExtensionFactory) {
        this.extensions.push(
            typeof ext === "function" && !ext.prototype ?
                (ext as Function)(this) :
                new (ext as (new (cp: Component<any>) => Extension))(this)
        );
        return this;
    }

    setState(patch: Partial<S>) {
        Object.assign(this.state as object, patch);
        this.force();
    }

    onComponentChange(c: (d: Component<S>) => void) {
        if (!this.renderCallback) {
            this.renderCallback = c;
            c(this);
        }
    }
}
