import { Component, ComponentProps } from "@/components/ascii/component";
import { EngineState } from "../context";

interface TypeWriterState {
    content: string;
    shownLength: number;
}

export class TypeWriter extends Component<TypeWriterState> {
    private width: number;
    private height: number;
    private timeout?: NodeJS.Timeout;

    constructor(content: string, width: number) {
        super({ content, shownLength: 0 });

        this.width = width;
        this.height = Math.ceil(content.length / width);
    }

    onRequestProperties(_: EngineState): ComponentProps {
        return {
            size: [this.width, this.height],
            position: [0, 0]
        }
    }

    onRender(_: EngineState): string {
        const buffer = new Array(this.width * this.height).fill(" ");

        for (let i = 0; i < this.state.shownLength; i++)
            buffer[i] = this.state.content[i];
        this.timeout = setTimeout(() => this.setState({
            shownLength: this.state.shownLength + 1
        }), 5);
        return buffer.join("");
    }

    onUnmount(): void {
        if (this.timeout) clearTimeout(this.timeout);
    }
}
