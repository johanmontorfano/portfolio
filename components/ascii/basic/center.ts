import { Component, ComponentProps, Extension } from "../component";
import { EngineState } from "../context";

export class Center extends Extension<{}> {
    constructor(completes: Component) {
        super({}, { reactsToProperties: true }, completes);
    }

    onProperties(c: ComponentProps, state: EngineState): ComponentProps {
        c.position = [
            Math.floor(state.charSize[0] / 2 - c.size[0] / 2),
            Math.floor(state.charSize[1] / 2 - c.size[1] / 2)
        ];
        return c;
    }

    onRender(s: string, _: EngineState): string {
        return s;
    }
}
