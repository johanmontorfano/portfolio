import { create } from "zustand";
import { EngineState, EngineUtils } from "./engine";
import { ComponentProps } from "./component";

// will determine the width and height of a single character of the chosen font
function testCharSize(fontFamily: string): [number, number] {
    const item = document.body.appendChild(document.createElement("span"));

    item.textContent = "w";
    item.style.setProperty("font-family", fontFamily);
    item.style.setProperty("font-size", "16px");
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
            const { size, position, transparent, cutout } = b.props;

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
                    ctx.font = `${fontSize![1]}px monospace`;
                    ctx.textBaseline = "top";
                    ctx.fillStyle = "white";
                    ctx.fillText(line, absX, absY);
                }
            }
        });
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
        attach(selector) {
            const target = document.querySelector(selector);

            if (target !== null) {
                target.append(canvas);
            }
        },
        addElement(el) {
            el.onComponentChange(c => {
                // since we are in an event listener, calling this will result
                // in processing a capture of this at init time, which creates
                // two different engine states
                const state = useASCIIEngine.getState();
                const { canvas, context: ctx } = state;

                if (!canvas || !ctx) return;

                const props = c.onRequestProperties(state);
                const buffer = c.onRender(state);

                layers[c.id] = { props, buffer };
                render(state);
            });
            update({ components: [...this.components, el] });
        },
    }
});
