import { Accessor, createSignal, Show } from "solid-js";
import { Portal } from "solid-js/web";
import { Motion } from "solid-motionone";
import { DynImage } from "./dyn_image";
import { IoGlobeOutline } from "solid-icons/io";
import { Tags } from "./tags";

export const [hoveredID, setHoveredID] = createSignal(-1);
export const [registeredImageSource, setSource] = createSignal("");

export interface Project {
    name: string;
    link: string;
    img: string;
    skills: string[];
    description: string[];
}

export function ProjectContainer(props: Project, id: Accessor<number>) {
    const [hover, setHover] = createSignal(0);
    const [open, setOpen] = createSignal(false);

    return <Motion.div
        style={{
            "transform-origin": "left center",
            width: "min-content",
            "white-space": "nowrap"
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
                paddingBottom: hover() * 12 + "px",
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
                        "z-index": 10,
                        "backdrop-filter": "blur(12px)"
                    }}
                    initial={{ background: "#00000000" }}
                    animate={{ background: "#000000AA" }}
                    onClick={() => setOpen(false)}
                >
                    <Motion.div 
                        style={{
                            width: "calc(100% - clamp(16px, 4vw, 40px))",
                            "max-width": "800px",
                            "max-height": "80vh",
                            padding: "clamp(8px, 2vw, 20px)",
                            background: "white",
                            "border-top-left-radius": "28px",
                            "border-top-right-radius": "28px",
                            overflow: "auto",
                            left: "50%",
                            position: "absolute"
                        }}
                        initial={{
                            opacity: 0,
                            filter: "blur(8px)",
                            x: "-50%",
                            y: "-100%",
                            top: "110%"
                        }}
                        animate={{
                            opacity: 1,
                            filter: "blur(0px)",
                            x: "-50%",
                            y: "-100%",
                            top: "100%"
                        }}
                    >
                        <div style={{
                            display: "grid",
                            gap: "12px"
                        }}>
                            <div style={{
                                order: 2,
                                padding: "8px"
                            }}>
                                <h2>ABOUT</h2>
                                {props.description.slice(1).map(text =>
                                    <p style={{
                                        "text-align": "justify",
                                        "font-size": "1.1rem"
                                    }}>
                                        {text}
                                    </p>
                                )}
                            </div>
                            <div>
                                <h1 style={{
                                    "font-size": "2rem",
                                    background: "#FFFFFF88",
                                    "backdrop-filter": "blur(8px)"
                                }}>
                                    {props.name.toUpperCase()}
                                </h1>
                                <div style={{
                                    display: "flex",
                                    "flex-wrap": "wrap",
                                    gap: "10px"
                                }}>
                                    {props.skills.map(s => <Tags skill={s} />)}
                                </div>
                                <p style={{ 
                                    "font-weight": "400",
                                    "font-size": ".9rem",
                                    "text-align": "justify",
                                    color: "gray"
                                }}>
                                    {props.description.length > 0 ?
                                        props.description[0] :
                                        null
                                    }
                                </p>
                                <a 
                                    href={props.link} 
                                    target="_blank" 
                                    onClick={ev => ev.stopPropagation()}
                                    style={{
                                        color: "black",
                                        "font-size": ".8rem",
                                        display: "flex",
                                        "align-items": "center"
                                    }}
                                >
                                    VISIT
                                    <IoGlobeOutline color="black" size={18} />
                                </a>
                                <br />
                                <DynImage src={props.img} timeout={200} />
                            </div>
                        </div>
                    </Motion.div>
                </Motion.div>
            </Portal>
        </Show>
    </Motion.div>
}
