import { createSignal } from "solid-js";

/** set the variable to true after a timeout in milliseconds */
export function useTimedOutValue(wait: number) {
    const [value, setValue] = createSignal(false);
    setTimeout(() => setValue(true), wait);

    return value;
}