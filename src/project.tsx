import { Accessor, createSignal, Show } from "solid-js";
import { Portal } from "solid-js/web";
import { Motion } from "solid-motionone";
import { DynImage } from "./dyn_image";
import { IoGlobeOutline } from "solid-icons/io";

export const [hoveredID, setHoveredID] = createSignal(-1);
export const [registeredImageSource, setSource] = createSignal("");

export interface Project {
    name: string;
    link: string;
    img: string;
}

export function ProjectContainer(props: Project, id: Accessor<number>) {
    const [hover, setHover] = createSignal(0);
    const [open, setOpen] = createSignal(false);

    return <Motion.div
        style={{
            "transform-origin": "left center"
        }}
        initial={{
            opacity: 0,
            y: 160,
            filter: "blur(8px)"
        }}
        animate={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)"
        }}
        transition={{
            delay: id() * .02,
            duration: .5,
            easing: "ease-in-out"
        }}
        onPointerDown={() => setOpen(true)}
    >
        <Motion.p
            animate={{
                scale: 1 + hover(),
                paddingTop: hover() * 12 + "px", 
                paddingBottom: hover() * 12 + "px"
            }}
            onMouseEnter={() => {
                setHover(1);
                setSource(props.img);
                setHoveredID(id());
            }}
            onMouseLeave={() => {
                setHover(0);
                setHoveredID(-1);
            }}
        >
            {props.name}
        </Motion.p>
        <Show when={open()}>
            <Portal mount={document.body}>
                <Motion.div 
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100vw",
                        height: "100vh",
                        display: "flex",
                        "align-items": "end",
                        "justify-content": "center",
                        "z-index": 10
                    }}
                    initial={{ background: "#00000000" }}
                    animate={{ background: "#000000AA" }}
                    onClick={() => setOpen(false)}
                >
                    <Motion.div 
                        style={{
                            width: "calc(100% - 40px)",
                            "max-width": "600px",
                            padding: "20px",
                            background: "white",
                            "padding-bottom": "10vh",
                            "border-top-left-radius": "10px",
                            "border-top-right-radius": "10px"
                        }}
                        initial={{ y: "100%" }}
                        animate={{ y: "0%" }}
                    >
                        <DynImage src={props.img} timeout={200} />
                        <br />
                        <div style={{
                            display: "flex",
                            "justify-content": "space-between",
                            "align-items": "center"
                        }}>
                            <h1>{props.name.toUpperCase()}</h1>
                            <a 
                                href={props.link} 
                                target="_blank" 
                                onClick={ev => ev.stopPropagation()}
                                style={{
                                    color: "white",
                                    fill: "white",
                                    "text-decoration": "none",
                                    display: "flex",
                                    "align-items": "center",
                                    background: "#0400FF",
                                    "border-radius": "10px",
                                    padding: "10px",
                                    "font-size": "1rem"
                                }}
                            >
                                OPEN
                                <IoGlobeOutline 
                                    height={10} 
                                    style={{ "margin-left": "8px" }} 
                                />
                            </a>
                        </div>
                    </Motion.div>
                </Motion.div>
            </Portal>
        </Show>
    </Motion.div>
}
