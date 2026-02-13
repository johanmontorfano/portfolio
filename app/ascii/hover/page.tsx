"use client";

import { useASCIIEngine } from "@/components/ascii/context";
import { useEffect } from "react";
import { Component, ComponentProps } from "@/components/ascii/component";
import { EngineState } from "@/components/ascii/engine";

interface HaloState {
    x: number;
    y: number;
}

export class Halo extends Component<HaloState> {
    private readonly RADIUS = 6;
    private readonly SIZE = this.RADIUS * 2 + 1;
    private readonly charset = "@#*+=-:. ";
    private cachedBuffer: string = "";

    constructor() {
        super({ x: 0, y: 0 });
        this.preRenderCircle();
        this.initTracking();
    }

    // we render the circle once since we move the component and not the
    // rendered part
    private preRenderCircle() {
        let buffer = "";
        const center = this.RADIUS;

        for (let y = 0; y < this.SIZE; y++) {
            for (let x = 0; x < this.SIZE; x++) {
                const dx = x - center;
                const dy = y - center;
                const dist = Math.sqrt((dx * 0.8) ** 2 + dy ** 2);

                if (dist < this.RADIUS) {
                    const charIdx = Math.floor(
                        (dist / this.RADIUS) * (this.charset.length - 1)
                    );
                    buffer += this.charset[charIdx];
                } else {
                    buffer += " ";
                }
            }
        }
        this.cachedBuffer = buffer;
    }

    private initTracking() {
        window.addEventListener("mousemove", (e) => {
            this.setState({ x: e.clientX, y: e.clientY });
        });
    }

    onRequestProperties(_: EngineState): ComponentProps {
        const charX = Math.floor(
            this.state.x / (_.fontSize[0] * 0.5)) - this.RADIUS;
        const charY = Math.floor(
            this.state.y / (_.fontSize[1] * 0.5)) - this.RADIUS;

        return {
            transparent: false,
            cutout: false,
            size: [this.SIZE, this.SIZE],
            position: [charX, charY]
        }
    }

    onRender(_: EngineState): string {
        return this.cachedBuffer;
    }
}

export default function Page() {
    const ascii = useASCIIEngine();

    useEffect(() => {
        ascii.addElement(new Halo());
        ascii.attach("#main");
    }, []);

    return <div id="main" className="w-full h-dvh" />
}
