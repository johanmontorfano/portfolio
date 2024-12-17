import { createSignal, onMount } from "solid-js";
import { Motion } from "solid-motionone";

/** Image loader with 16/9 placeholder */
export function DynImage(props: {src: string, timeout: number}) {
    const [loaded, setLoaded] = createSignal(false);
    let ref: HTMLImageElement | null = null;

    function checkIfLoaded() {
        if (ref?.complete) setLoaded(true);
        else setTimeout(checkIfLoaded, 1000);
    }

    onMount(() => {
        if (ref !== null) setTimeout(checkIfLoaded, props.timeout);
    })

    return <div style={{
        width: "100%", 
        "aspect-ratio": "16/9", 
        position: "relative"
    }}>
        <Motion.img
            ref={ref as any}
            src={props.src} 
            style={{
                width: "100%", 
                position: "absolute",
                border: "2px solid lightgray",
                "border-radius": "6px"
            }} 
        />
        <Motion.div 
            style={{
                width: "100%",
                "aspect-ratio": "16/9",
                background: "lightgray",
                position: "absolute"
            }} 
            initial={{ opacity: 1 }}
            animate={{ opacity: loaded() ? 0 : 1 }}
        />
    </div>
}
