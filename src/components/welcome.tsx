import {
    IoArrowForward, 
    IoLogoGithub, 
    IoLogoLinkedin, 
    IoMailOutline
} from "solid-icons/io";
import { Motion } from "solid-motionone";

export function Welcome(props: {
    projectsOpen: boolean,
    setProjectsOpen: (state: boolean) => void
}) {
    return <div style={{
        width: "96%", 
        height: "calc(100dvh - 4%)", 
        display: "flex",
        "flex-direction": "column",
        "justify-content": "space-between"
    }}>
        <div id="introduction">
            <h1>Hey,</h1>
            <h1>I'm Johan</h1>
            <br />
            <p>This is a work in progress.</p>
        </div>
        <div id="navigation" 
            style={{display: "flex", "justify-content": "space-between"}}
        >
            <div id="links" 
                style={{
                    width: "140px", 
                    display: "flex", 
                    "justify-content": "space-between"
                }}
            >
                <IoLogoGithub 
                    onClick={() => window.location.assign(
                        "https://github.com/johanmontorfano"
                    )}
                    size={35} 
                />
                <IoLogoLinkedin 
                    onClick={() => window.location.assign(
                        "https://linkedin.com/in/jhnm"
                    )}
                    size={35} 
                />
                <IoMailOutline 
                    onClick={() => window.location.assign(
                        "mailto:me@johanmontorfano.com"
                    )}
                    size={35} 
                />
            </div>
            <Motion.div
                onClick={() => props.setProjectsOpen(!props.projectsOpen)}
                style={{
                    display: "flex", 
                    "align-items": "center",
                    "justify-content": "space-around",
                    background: "var(--text-color)",
                    "border-radius": "25px",
                    width: "100px",
                    cursor: "pointer",
                    "z-index": 10
                }}
                hover={{
                    width: "150px"
                }}
            >
                <p 
                    style={{
                        color: "var(--background)",
                        "user-select": "none",
                        display: props.projectsOpen ? "none" : "inline"
                    }}
                >
                    Projects
                </p>
                <Motion.div 
                    style={{
                        width: "18px",
                        height: "18px"
                    }}
                    animate={{rotate: props.projectsOpen ? "180deg" : "0deg"}}
                >
                    <IoArrowForward color="var(--background)" size={18} />
                </Motion.div>
            </Motion.div>
        </div>
    </div>
}
