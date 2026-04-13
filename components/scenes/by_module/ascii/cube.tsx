"use client";

import { useASCIIEngine, EngineState } from "@/components/ascii/context";
import { Component, ComponentProps } from "@/components/ascii/component";
import { useOnMount } from "@/hooks/use_on_mount";

interface CubeState {
    angleX: number;
    angleY: number;
    angleZ: number;
    size: number;
}

export class Cube extends Component<CubeState> {
    private width = 140; // Character columns
    private height = 80; // Character rows

    private isDragging = false;
    private lastMousePos = { x: 0, y: 0 };

    private listeners: Record<string, (ev: MouseEvent) => any> = {
        mousedown: (e) => {
            this.isDragging = true;
            this.lastMousePos = { x: e.clientX, y: e.clientY };
        },
        mousemove: (e) => {
            if (!this.isDragging) return;

            const deltaX = e.clientX - this.lastMousePos.x;
            const deltaY = e.clientY - this.lastMousePos.y;

            this.setState({
                angleY: this.state.angleY - deltaX * 0.01,
                angleX: this.state.angleX + deltaY * 0.01
            });

            this.lastMousePos = { x: e.clientX, y: e.clientY };
        },
        mouseup: () => {
            this.isDragging = false;
        }
    }

    constructor() {
        super({ angleX: 0, angleY: 0, angleZ: 0, size: 20 });
        this.initMouseListeners();
    }

    onUnmount(): void {
        this.removeMouseListeners();
    }

    private initMouseListeners() {
        for (const key in this.listeners)
            window.addEventListener(
                key as "mousedown" | "mouseup" | "mousemove",
                this.listeners[key]
            );
    }

    private removeMouseListeners() {
        for (const key in this.listeners)
            window.removeEventListener(
                key as "mousedown" | "mouseup" | "mousemove",
                this.listeners[key]
            );
    }

    onRequestProperties(_: EngineState): ComponentProps {
        return {
            transparent: false,
            cutout: false,
            size: [this.width, this.height],
            position: [
                _.charSize[0] / 2 - this.width / 2,
                _.charSize[1] / 2 - this.height / 2
            ]
        }
    }

    onRender(_: EngineState): string {
        const { angleX, angleY, angleZ, size } = this.state;
        const buffer = new Array(this.width * this.height).fill(" ");
        const zBuffer = new Array(this.width * this.height).fill(0);

        for (let cubeX = -size; cubeX < size; cubeX += 2) {
            for (let cubeY = -size; cubeY < size; cubeY += 2) {
                // Front and Back, Left and Right, Top and Bottom
                this.projectPoint(
                    cubeX, cubeY, size, "@",
                    angleX, angleY, angleZ, buffer, zBuffer);
                this.projectPoint(
                    cubeX, cubeY, -size, ".", 
                    angleX, angleY, angleZ, buffer, zBuffer);
                this.projectPoint(
                    size, cubeY, cubeX, "#",
                    angleX, angleY, angleZ, buffer, zBuffer);
                this.projectPoint(
                    -size, cubeY, cubeX, "$",
                    angleX, angleY, angleZ, buffer, zBuffer);
                this.projectPoint(
                    cubeX, size, cubeY, "+",
                    angleX, angleY, angleZ, buffer, zBuffer);
                this.projectPoint(
                    cubeX, -size, cubeY, ";",
                    angleX, angleY, angleZ, buffer, zBuffer);
            }
        }
        return buffer.join("");
    }

    private projectPoint(
        x: number, y: number, z: number, 
        char: string, 
        ax: number, ay: number, az: number, 
        buffer: string[], zBuffer: number[]
    ) {
        // x rot
        let ny = y * Math.cos(ax) - z * Math.sin(ax);
        let nz = y * Math.sin(ax) + z * Math.cos(ax);
        y = ny; z = nz;

        // y rot
        let nx = x * Math.cos(ay) + z * Math.sin(ay);
        nz = -x * Math.sin(ay) + z * Math.cos(ay);
        x = nx; z = nz;

        // z rot
        nx = x * Math.cos(az) - y * Math.sin(az);
        ny = x * Math.sin(az) + y * Math.cos(az);
        x = nx; y = ny;

        // projection
        const ooz = 1 / (z + 100);
        const xp = Math.floor(this.width / 2 + x * ooz * this.width);
        const yp = Math.floor(this.height / 2 + y * ooz * this.height);

        // z-buffering
        if (xp >= 0 && xp < this.width && yp >= 0 && yp < this.height) {
            const idx = xp + yp * this.width;
            if (ooz > zBuffer[idx]) {
                zBuffer[idx] = ooz;
                buffer[idx] = char;
            }
        }
    }
}

export default function Scene() {
    const ascii = useASCIIEngine();

    useOnMount(() => {
        ascii.addElement(new Cube());
        ascii.attach("#main");

        return () => ascii.reset();
    });

    return <div id="main" className="w-full h-dvh" />
}

