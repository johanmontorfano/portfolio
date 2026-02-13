"use client";

import { Component, ComponentProps } from "@/components/ascii/component";
import { useASCIIEngine } from "@/components/ascii/context";
import { EngineState } from "@/components/ascii/engine";
import { useEffect } from "react";

interface PlasmaState {
    time: number;
    speed: number;
}

export class Plasma extends Component<PlasmaState> {
    private width = 60;
    private height = 20;
    private charset = ".:-=+*#%@"; 

    constructor() {
        super({ time: 0, speed: 0.005 });
        this.startLoop();
    }

    private startLoop() {
        const tick = () => {
            this.setState({ time: this.state.time + this.state.speed });
            requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    }

    onRequestProperties(_: EngineState): ComponentProps {
        this.width = _.charSize[0];
        this.height = _.charSize[1];

        return {
            transparent: true,
            cutout: false,
            size: _.charSize,
            position: [0, 0]
        }
    }

    onRender(_: EngineState): string {
        const { time } = this.state;
        let buffer = "";

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                // combine several sine waves to create "plasma" movement
                // we normalize coordinates to 0.0 - 1.0 range
                const nx = x / this.width;
                const ny = y / this.height;

                let v = Math.sin(nx * 10 + time);
                v += Math.sin((ny * 10 + time) / 2.0);
                v += Math.sin((nx * 10 + ny * 10 + time) / 2.0);
                
                const cx = nx + 0.5 * Math.sin(time / 5.0);
                const cy = ny + 0.5 * Math.cos(time / 3.0);
                v += Math.sin(Math.sqrt(100 * (cx * cx + cy * cy) + 1) + time);

                // map the result (-4 to 4 approx) to our charset index
                v = (v + 4) / 8; // normalize to 0-1
                const charIdx = Math.floor(v * (this.charset.length - 1));
                buffer += this.charset[
                    Math.max(0, Math.min(charIdx, this.charset.length - 1))
                ];
            }
        }

        return buffer;
    }
}

export default function Page() {
    const ascii = useASCIIEngine();

    useEffect(() => {
        ascii.addElement(new Plasma());
        ascii.attach("#main");
    }, []);

    return <div id="main" className="w-full h-dvh" />
}
