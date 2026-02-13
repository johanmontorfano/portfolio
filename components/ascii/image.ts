import { Component, ComponentProps } from "./component";
import { EngineState } from "./engine";

interface ImageState {
    image: HTMLImageElement | null;
}

export class ASCIIImage extends Component<ImageState> {
    private width = 70;
    private height = 40;
    private offscreenCanvas: HTMLCanvasElement;
    private offscreenCtx: CanvasRenderingContext2D;

    constructor(src: string) {
        super({ image: null });
        
        this.offscreenCanvas = document.createElement("canvas");
        this.offscreenCanvas.width = this.width;
        this.offscreenCanvas.height = this.height;
        this.offscreenCtx = this.offscreenCanvas.getContext("2d")!;
        
        const img = new Image();
        img.onload = () => this.setState({ image: img });
        img.crossOrigin = "anonymous";
        img.src = src;
    }

    onRequestProperties(_: EngineState): ComponentProps {
        return {
            cutout: true,
            transparent: false,
            position: [
                _.charSize[0] / 2 - this.width / 2,
                _.charSize[1] / 2 - this.height / 2
            ],
            size: [this.width, this.height]
        }
    }

    onRender(): string {
        const { image } = this.state;
        if (!image) return " ".repeat(this.width * this.height);
        this.offscreenCtx.drawImage(image, 0, 0, this.width, this.height);

        let g = [];
        let ascii = "";
        
        this.offscreenCtx.getImageData(
            0, 0, this.width, this.height
        ).data.forEach(d => {
            g.push(d);
            if (g.length % 4 === 0) {
                if (g[0] > 0 || g[1] > 0 || g[2] > 0 || g[3] > 0) {
                    ascii += " ";
                } else ascii += "#";
                g.splice(0);
            }
        });
        return ascii;
    }
}
