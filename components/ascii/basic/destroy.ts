import { Component, ComponentProps, Extension } from "../component";
import { EngineState, useASCIIEngine } from "../context";

// deletes a component from the rendering tree after some time
export class Destroy extends Extension {
    constructor(cp: Component, timeout = 1000) {
        super({}, {}, cp);
        setTimeout(() => {
            useASCIIEngine.getState().removeById(this.forId);
        }, timeout);
    }

    static withTimeout(timeout: number) {
        return (cp: Component) => new Destroy(cp, timeout);
    }

    onProperties(c: ComponentProps, _: EngineState): ComponentProps {
        return c;
    }

    onRender(s: string, _: EngineState): string {
        return s;
    }
}
