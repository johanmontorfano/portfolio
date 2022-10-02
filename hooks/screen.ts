import { createSignal, onCleanup } from 'solid-js';

/** Returns the screen type */
export function useScreenType() {
    const [screenType, updateScreenType] = createSignal<"tiny" | "big">(getScreenType());

    function getScreenType() {
        return window.innerWidth <= 1100 ? "tiny" : "big";
    }

    window.addEventListener("resize", () => updateScreenType(getScreenType()));
    
    return screenType;
}

/** On screen resize callback */
export function useResize(callback: () => void) {
    window.onresize = callback;
    
    onCleanup(() => window.onresize = null);
}