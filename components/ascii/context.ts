import { create } from "zustand";
import { Component, ComponentProps } from "./component";

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
    debug(): void;
    reset(): void;
    attach(selector: string): void;
    forceRenderById(id: string): void;
    removeById(id: string): void;
    addElement(el: Component<any>): void;
}

// will determine the width and height of a single character of the chosen font
function testCharSize(fontFamily: string): [number, number] {
    const item = document.body.appendChild(document.createElement("span"));

    item.textContent = "w";
    item.style.setProperty("font-family", fontFamily);
    item.style.setProperty("font-size", "22px");
    item.style.setProperty("padding", "0");
    item.style.setProperty("margin", "0");

    const size = [
        item.getBoundingClientRect().width,
        item.getBoundingClientRect().height
    ] as [number, number];

    item.remove();
    return size;
}

export const useASCIIEngine = create<EngineState & EngineUtils>((update) => {
    if (typeof window === "undefined") return null as unknown as any;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) throw Error("failed to retrieve 2d context");

    const fontSize = testCharSize("monospace");
    const layers: Record<string, {
        props: ComponentProps, 
        buffer: string
    }> = {};
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = "100%";
    canvas.style.height = "100dvh";

    function handleResize() {
        canvas.width = window.innerWidth * 2;
        canvas.height = window.innerHeight * 2;

        const charWidth = Math.floor(canvas.width / fontSize[0]);
        const charHeight = Math.floor(canvas.height / fontSize[1]);

        update({ 
            size: [canvas.width, canvas.height],
            charSize: [charWidth, charHeight]
        });
        useASCIIEngine.getState().components.forEach(c => {
            const { canvas, context: ctx } = useASCIIEngine.getState();

            if (!canvas || !ctx) return;

            const props = c.onRequestProperties(useASCIIEngine.getState());
            const buffer = c.onRender(useASCIIEngine.getState());

            layers[c.id] = { props, buffer };
        });
        render(useASCIIEngine.getState());
    };

    window.addEventListener("resize", handleResize);

    function render(_: EngineState) {
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        Object.values(layers).forEach(b => {
            const { size, position, transparent, cutout, color } = b.props;

            if (transparent) {
                ctx.fillStyle = "black";
                ctx.fillRect(
                    position[0] * fontSize[0], 
                    position[1] * fontSize[1], 
                    (size[0] + 13) * fontSize[0], 
                    size[1] * fontSize[1]
                );
            }

            for (let row = 0; row < size[1]; row++) {
                const start = row * size[0];
                const end = start + size[0];
                const line = b.buffer.substring(start, end);

                const absX = position[0] * fontSize![0];
                const absY = (position[1] + row) * fontSize![1];

                if (cutout) {
                    for (let col = 0; col < line.length; col++) {
                        const char = line[col];
                        if (char === " ") {
                            ctx.clearRect(
                                absX + (col * fontSize[0]), absY,
                                fontSize[0], fontSize[1]
                            );
                        }
                    }
                } else {
                    ctx.font = `22px monospace`;
                    ctx.textBaseline = "top";
                    ctx.fillStyle = color || "#FFFF";
                    ctx.fillText(line, absX, absY);
                }
            }
        });
    }

    function extApply(
        cp: Component, mode: "props", data: ComponentProps, state: EngineState
    ): ComponentProps;
    function extApply(
        cp: Component, mode: "render", data: string, state: EngineState,
    ): string;

    function extApply(
        cp: Component,
        mode: "props" | "render",
        data: ComponentProps | string,
        state: EngineState
    ): ComponentProps | string {
        cp.extensions.forEach(e => {
            if (e.config.reactsToProperties && mode === "props")
                data = e.onProperties(data as ComponentProps, state);
            else if (e.config.reactsToRenders && mode === "render")
                data = e.onRender(data as string, state);
        });
        return data;
    }


    return {
        ready: true,
        canvas, context: ctx,
        size: [canvas.width, canvas.height],
        charSize: [
            Math.floor(canvas.width / fontSize[0]),
            Math.floor(canvas.height / fontSize[1])
        ],
        fontFamily: "monospace",
        fontSize,
        components: [],
        debug() {
            (window as Record<string, any>).ascii = () => useASCIIEngine.getState();
        },
        reset() {
            useASCIIEngine.getState().components.forEach(c => c.onUnmount());
            Object.keys(layers).forEach(l => { delete layers[l]; });
            update({ components: [] });
        },
        attach(selector) {
            const target = document.querySelector(selector);

            if (target !== null) {
                target.append(canvas);
            }
        },
        forceRenderById(id: string) {
            const component = useASCIIEngine.getState()
                .components.find(v => v.id === id);

            if (component !== undefined) component.force();
        },
        removeById(id: string) {
            const index = useASCIIEngine.getState()
                .components.findIndex(v => v.id === id);
            const newList = useASCIIEngine.getState().components;

            newList.splice(index, 1)[0]?.onUnmount();
            delete layers[id];
            update({ components: newList });
            render(useASCIIEngine.getState());
        },
        addElement(el) {
            el.onComponentChange(c => {
                // since we are in an event listener, calling this will result
                // in processing a capture of this at init time, which creates
                // two different engine states for the duration of this call
                const state = useASCIIEngine.getState();
                const { canvas, context: ctx } = state;

                if (!canvas || !ctx) return;

                const props = extApply(
                    c, "props", c.onRequestProperties(state), state
                );
                const buffer = extApply(c, "render", c.onRender(state), state);
                layers[c.id] = { props, buffer };
                render(state);
            });
            update({ components: [...this.components, el] });
        },
    }
});
