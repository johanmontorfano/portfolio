import { For, Portal, render } from "solid-js/web";
import { hoveredID, Project, ProjectContainer, registeredImageSource } from "./project";
import { createEffect, createRoot, createSignal, onMount, untrack } from "solid-js";
import { Motion } from "solid-motionone";
import AfterSalesImage from "../public/assets/projects/afs.png";
import MandelbrotImage from "../public/assets/projects/mandelbrot.png";
import TictactoeImage from "../public/assets/projects/tictactoe.png";
import FileSharingImage from "../public/assets/projects/p2p.png";
import HexRealmImage from "../public/assets/projects/hexrealm.png";
import JoogleImage from "../public/assets/projects/joogle.png";
import MaggalyImage from "../public/assets/projects/maggaly.png";
import BrainfImage from "../public/assets/projects/brainf.png";
import Logo from "../public/assets/logo.svg";
import Face from "../public/assets/face.png";
import "./index.css";


export const HARDCODED_PROJECTS: Project[] = [
    {
        name: "AfterSales",
        link: "https://aftersales.johanmontorfano.com/",
        img: AfterSalesImage
    },
    {
        name: "Mandelbrot",
        link: "https://github.com/johanmontorfano/mandelbrot-rs",
        img: MandelbrotImage
    },
    {
        name: "Tic-Tac-Toe",
        link: "https://jmticp2p.vercel.app/",
        img: TictactoeImage
    },
    {
        name: "File sharing",
        link: "https://jmp2p.vercel.app/",
        img: FileSharingImage
    },
    {
        name: "Hex Realm",
        link: "https://hexrealm2.vercel.app/",
        img: HexRealmImage
    },
    {
        name: "Joogle Search",
        link: "https://github.com/johanmontorfano/joogle",
        img: JoogleImage
    },
    {
        name: "MAGGALY",
        link: "https://github.com/johanmontorfano/maggaly",
        img: MaggalyImage
    },
    {
        name: "THE F_CK",
        link: "https://github.com/johanmontorfano/thef-ck",
        img: BrainfImage
    }
];

function Wrapper() {
    const [projectsHovered, setProjectsHovered] = createSignal(false);
    const [imageX, setImageX] = createSignal(0);
    const [imageY, setImageY] = createSignal(0);
    let ref: HTMLElement;
    let timeout: number | null = null;

    onMount(() => {
        let prevt: TouchEvent;
        let prevm: WheelEvent;

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
                filter: projectsHovered() ? "blur(8px)" : "blur(0px)",
                opacity: projectsHovered() ? 0 : 1,
                scale: projectsHovered() ?  0.8 : 1,
                height: projectsHovered() ? "0px" : "300px"
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
            <div style={{
                display: "flex"
            }}>
                <div 
                    style={{
                        "border-radius": "50rem",
                        width: "70px",
                        height: "70px",
                        padding: "4px",
                        display: "flex",
                        "justify-content": "center",
                        "align-items": "center",
                        border: "2px solid gray",
                        background: "white",
                        "margin-right": "10px"
                    }}
                >
                    <img src={Logo} width={61} height={61} />
                </div>
                <div 
                    onClick={() => {
                        window.location.href = 
                            "https://github.com/johanmontorfano";
                    }}
                    style={{
                        "border-radius": "50rem",
                        width: "70px",
                        height: "70px",
                        padding: "4px",
                        display: "flex",
                        "justify-content": "center",
                        "align-items": "center",
                        border: "2px solid gray",
                        background: "white",
                        overflow: "hidden",
                        cursor: "pointer"
                    }}
                >
                    <img src={Face} width={61} height={61} />
                </div>
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
            <For children={ProjectContainer} each={HARDCODED_PROJECTS} />
        </Motion.div>
        <Portal mount={document.body}>
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
            <div style={{
                "z-index": 1,
                width: "100%",
                height: "100vh",
                position: "absolute",
                top: 0,
                left: 0,
                "backdrop-filter": "blur(200px)"
            }} />
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
        </Portal>
    </div>
}

render(Wrapper, document.getElementById("app") as HTMLElement);
