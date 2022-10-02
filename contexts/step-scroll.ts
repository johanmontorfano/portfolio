import { createSignal } from 'solid-js';
/** Context data of the step scroll system */
export namespace StepScrollContext {
    /** Reference of the element that can be scrolled */
    export const [scrollableRef, updateScrollableRef] = createSignal<HTMLDivElement>();
    /** Pseudo distance in 100vh from the original element */
    export const [originalElementDistance, updateOriginalElementDistance] = createSignal<number>(0);
    /** Is the step scroll system enabled or not */
    export const [stepScrollEnabled, enableStepScroll] = createSignal(true);
}