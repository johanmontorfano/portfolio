import { render } from "solid-js/web";
import { renderer as ThreeScene } from "./src/three";

function App() {
    return <div style={{
        width: "100%",
        height: "100dvh",
        background: "var(--background)",
    }}>
        <div style={{
            position: "absolute", 
            bottom: "0%",
            padding: "30px"
        }}>
            <div>
                {ThreeScene.domElement} 
            </div>
            <div>
                <a href="https://linkedin.com/in/jhnm">LinkedIn</a>
                <a href="https://github.com/johanmontorfano">Github</a>
                <a href="mailto:me@johanmontorfano.com">Contact</a>
            </div>
        </div>
    </div>
}

render(App, document.getElementById("main") as HTMLElement);
