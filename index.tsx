import "./src/three";
import {render} from "solid-js/web";
import { Bouncer } from "./src/components/bounce";
import { createSignal } from "solid-js";
import { Motion } from "solid-motionone";
import { Welcome } from "./src/components/welcome";
import { Projects } from "./src/components/projects";

function Index() {
    const [began, setBegin] = createSignal(false);
    const [showProjects, setShowProjects] = createSignal(false);
    /** We keep a reference to the three parent to perform updates depending on
     * the progression of the user on the page. */
    const three_ref = document.getElementById("three_main") as HTMLElement;

    return <div style={{
        width: "100vw", 
        height: "100dvh",
        background: began() ? "var(--t-background)" : "rgba(0, 0, 0, 0)",
        "transition-duration": "0.5s"
    }}>
        <Motion.div 
            style={{
                position: "absolute", 
                left: "50%", 
                top: "80%",
                transform: "translateX(-50%)"
            }}
            animate={{
                opacity: began() ? 0 : 1,
                visibility: began() ? "hidden": "visible"
            }}
        >
            <Bouncer onClick={() => {
                 three_ref.style.setProperty("transition-duration", "0.5s");
                 three_ref.style.setProperty("transform", "scale(0.5)");
                 setBegin(true);
            }} />
        </Motion.div>
        <Motion.div
            style={{
                position: "absolute",
                width: "100%",
                height: "100dvh",
                display: "flex",
                "align-items": "center",
                "justify-content": "center",
                "overflow-x": "hidden"
            }}
            initial={{
                visibility: "hidden"
            }}
            animate={{
                visibility: began() ? "visible" : "hidden",
            }}
            transition={{
                visibility: {duration: 0}
            }}
        >
            <Welcome
                projectsOpen={showProjects()}
                setProjectsOpen={setShowProjects} 
            />
            <Projects 
                show={showProjects} 
                onRequestHide={() => setShowProjects(false)} 
            />
        </Motion.div>
    </div>
}

render(Index, document.getElementById("solid_main") as HTMLElement);
