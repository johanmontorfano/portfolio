import { onCleanup } from 'solid-js';
/** used to be called on scroll of an element */
export function useScroll(ref: HTMLElement, callback: (top: number, height: number) => void, axis: "x" | "y" = "y", tickingSpeed = 1000 / 60) {
    const interval = setInterval(() => {
        callback(ref.getBoundingClientRect()[axis === "y"? "top" : "left"], ref.getBoundingClientRect()[axis === "y" ? "height" : "width"]);
    }, tickingSpeed);
    onCleanup(() => clearInterval(interval));
}