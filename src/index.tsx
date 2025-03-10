import { For, Portal, render } from "solid-js/web";
import { hoveredID, ProjectContainer, registeredImageSource } from "./project";
import { createEffect, createSignal, onMount, Show } from "solid-js";
import { AppLink, AppLinkPresets } from "./app_link";
import { Motion } from "solid-motionone";
import { Oval } from "solid-spinner";
import { useProjectsLoader } from "./use_projects_loader";
import "./index.css";

function Wrapper() {
    const [isLoaded, projects, loadingError] = useProjectsLoader();
    const [projectsHovered, setProjectsHovered] = createSignal(false);
    const [imageX, setImageX] = createSignal(0);
    const [imageY, setImageY] = createSignal(0);
    let timeout: number | null = null;
    let ref: HTMLElement;

    onMount(() => {
        let prevt: TouchEvent;

        window.addEventListener("mousemove", ev => {
            setImageX(ev.x);
            setImageY(ev.y);
        });
        document.body.addEventListener("touchmove", ev => {
            if (prevt !== undefined) {
                const up = ev.touches[0].clientY < prevt.touches[0].clientY;
                setProjectsHovered(up);
            }
            prevt = ev;
        });
        document.body.addEventListener("wheel", ev => {
            setProjectsHovered(ev.deltaY > 0);
        });
    });

    createEffect(() => {
        if (timeout !== null) {
            clearTimeout(timeout);
            timeout = null;
        }
        if (hoveredID() === -1) 
            timeout = setTimeout(() => setProjectsHovered(false), 1000);
    });
    
    return <div ref={r => ref = r} class="column" style={{"z-index": 3}}>
        <Motion.div
            class="section about"
            initial={{
                height: "300px"
            }}
            animate={{
                scale: projectsHovered() ?  0.8 : 1,
                height: projectsHovered() ? "0px" : "300px",
                filter: projectsHovered() ? "blur(8px)" : "blur(0px)",
                opacity: projectsHovered() ? 0 : 1
            }}
        >
            <p>
                Hi, my name is{" "}
                <span class="display">Johan.</span>
            </p>
            <p>
                I'm a full-stack developer based in{" "}
                <span class="display">Lyon, France.</span>
            </p>
            <br />
            <div style={{ display: "flex" }}>
                <AppLink {...AppLinkPresets.gh} />
                <AppLink {...AppLinkPresets.li} />
            </div>
        </Motion.div>
        <Motion.div 
            class="section links"
            style={{
                "z-index": 5
            }}
            animate={{
                paddingTop: projectsHovered() ? "0px" : "20px",
                y: -(hoveredID() + 1) * 8 + "px"
            }}
            onMouseEnter={() => setProjectsHovered(true)}
        >
            <Show when={isLoaded()} fallback={<Oval width={24} />}>
                {
                    loadingError() !== null ?
                    <p>{loadingError()}</p> :
                    <For children={ProjectContainer} each={projects()} />
                }
            </Show>
        </Motion.div>
        <Portal mount={document.body}>
            <p style={{
                position: "absolute",
                bottom: 0,
                opacity: .5,
                "font-size": ".7rem",
                "z-index": 5,
                left: "50%",
                transform: "translateX(-50%)",
                "font-variant": "all-small-caps"
            }}>
                Made with ❤️ by Johan Delhomme
            </p>
            <div style={{
                position: "absolute",
                overflow: "hidden",
                left: "50%",
                bottom: "-50%",
                transform: "translateX(-50%)",
                width: "80vw", 
                height: "600px", 
                "border-radius": "400px",
                background: "#0100FF",
                "z-index": 0
            }} />
            <div style={{
                "z-index": 1,
                width: "100%",
                height: "100vh",
                position: "absolute",
                top: 0,
                left: 0,
                "backdrop-filter": "blur(200px)"
            }} />
            <Motion.img 
                src={registeredImageSource()} 
                style={{
                    overflow: "hidden",
                    position: "absolute",
                    "transform-origin": "top left",
                    height: "400px",
                    "z-index": 2,
                    transform: 
                        `translateX(${imageX()}px) translateY(${imageY()}px)`
                }}
                animate={{
                    filter: hoveredID() === -1 ? "blur(8px)" : "blur(0px)",
                    opacity: hoveredID() === -1 ? 0 : 1
                }} 
            />
        </Portal>
    </div>
}

render(Wrapper, document.getElementById("app") as HTMLElement);
