import { Component, ComponentProps, Extension } from "../component";
import { EngineState } from "../context";

interface FadeOutState {
    startedAt: number;
    duration: number; // in ms
}

export class FadeOut extends Extension<FadeOutState> {
    constructor(
        cp: Component,
        duration: number = 5000,
        timeout: number = 0
    ) {
        super({ startedAt: 0, duration }, { reactsToProperties: true }, cp);
        setTimeout(() => this.setState({ startedAt: Date.now() }), timeout);
    }

    static withDuration(duration: number) {
        return (cp: Component) => new FadeOut(cp, duration);
    }

    static withTimeout(timeout: number) {
        return (cp: Component) => new FadeOut(cp, 5000, timeout);
    }

    static withDurationAndTimeout(duration: number, timeout: number) {
        return (cp: Component) => new FadeOut(cp, duration, timeout);
    }

    onProperties(c: ComponentProps, _: EngineState): ComponentProps {
        if (this.state.startedAt === 0) return c;

        const hex = "0123456789ABCDEF";
        const diff = Math.min(
            this.state.duration,
            Date.now() - this.state.startedAt
        );
        c.color = "#FFF" + hex[Math.round((1 - diff / this.state.duration) * 16)];
        return c;
    }

    onRender(s: string, _: EngineState): string {
        return s;
    }
}
