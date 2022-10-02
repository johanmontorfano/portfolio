import { onCleanup } from "solid-js";

/** use mouse moves efficiently */
export function useMouse(callback: (x: number, y: number) => void) {
    const listener = (ev: MouseEvent) => {
        callback(ev.clientX, ev.clientY);
    }
    document.body.addEventListener("mousemove", listener);

    onCleanup(() =>
        document.body.removeEventListener("mousemove", listener));
}