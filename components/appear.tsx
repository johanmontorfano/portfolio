import {JSXElement, createSignal, onMount} from "solid-js";
import { Motion } from "@motionone/solid";

/** Hook that switches state to `true` when timeout ends. */
function useTimeout(ms_duration: number) {
    const [ended, setEnd] = createSignal(false);

    onMount(() => setTimeout(() => setEnd(true), ms_duration));

    return ended;
}

/** Makes a component appear from the bottom of the screen. */
export function BottomAppear(
    props: { children: JSXElement, delay: number }
) {
    const show = useTimeout(props.delay);

    return (
        <Motion.div
            initial={{ 
                opacity: 0,
                y: 15
            }}
            animate={{ 
                y: show() ? 0 : 15,
                opacity: show() ? 1 : 0
            }}
        >
            {props.children}
        </Motion.div>
    );
}

/** Apply the `BottomAppear` effect to a bunch of childs. */
export function GroupBottomAppear(
    props: { children: JSXElement[], delay: number }
) {
    return (
        <>
            {props.children.map((c, i) => (
                <BottomAppear delay={props.delay + i * 250}>
                    {c}
                </BottomAppear>
            ))}
        </>
    );
}
