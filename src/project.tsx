import { Accessor, createSignal, Show } from "solid-js";
import { Portal } from "solid-js/web";
import { Motion } from "solid-motionone";
import { DynImage } from "./dyn_image";
import { IoOpenOutline } from "solid-icons/io";
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
    const [hoverLink, setHoverLink] = createSignal(false);
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
                    initial={{ background: "#CCCCCC00" }}
                    animate={{ background: "#CCCCCCAA" }}
                    onClick={() => setOpen(false)}
                >
                    <Motion.div 
                        style={{
                            width: "100%",
                            "max-width": "800px",
                            "max-height": "80vh",
                            background: "white",
                            "border-top-left-radius": "18px",
                            "border-top-right-radius": "18px",
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
                        <div style={{display: "grid", padding: "8px"}}>
                            <div>
                                <div style={{
                                    display: "flex",
                                    "justify-content": "space-between",
                                    "align-items": "center",
                                    position: "sticky",
                                    top: 0,
                                    "z-index": 10,
                                    "backdrop-filter": "blur(24px)",
                                    background: "#FFFFFFAA"
                                }}>
                                   <h1 style={{
                                       "font-size": "2rem",
                                       "font-style": "italic"
                                   }}>
                                        {props.name.toUpperCase()}
                                    </h1>
                                    <Motion.a 
                                        href={props.link} 
                                        target="_blank" 
                                        onClick={ev => ev.stopPropagation()}
                                        onMouseEnter={() => setHoverLink(true)}
                                        onMouseLeave={() => setHoverLink(false)}
                                        style={{
                                            background: "#EEEEEE",
                                            border: "2px solid #CCCCCC", 
                                            "font-size": ".8rem",
                                            display: "flex",
                                            "align-items": "center",
                                            "justify-content": "space-around",
                                            color: "black",
                                            "text-decoration": "none",
                                            "min-width": "80px",
                                            padding: "18px",
                                            "padding-top": "10px",
                                            "padding-bottom": "10px",
                                            "border-radius": "8px"
                                        }}
                                        initial={{
                                            scale: 1
                                        }}
                                        animate={{
                                            scale: hoverLink() ? 1.1 : 1
                                        }}
                                    >
                                        VISIT
                                        <IoOpenOutline color="black" size={18} />
                                    </Motion.a>
                                </div>
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
                                <DynImage src={props.img} timeout={200} />
                                <Show when={props.description.length > 1}>
                                    <div>
                                        <h2>ABOUT</h2>
                                        {props.description.slice(1).map(text =>
                                            <p style={{
                                                "font-size": "1.1rem"
                                            }}>
                                                {text}
                                            </p>
                                        )}
                                    </div>
                                </Show>
                            </div>
                        </div>
                    </Motion.div>
                </Motion.div>
            </Portal>
        </Show>
    </Motion.div>
}
