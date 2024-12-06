import {render} from "solid-js/web"
import {MenuBar} from "./components/menu_bar";
import {ScrollCtxProvider, ScrollStyle} from "./components/scroll";
import "./index.css";

function Wrapper() {
    return <ScrollCtxProvider>
        <MenuBar />
        <div style={{display: "flex", "justify-content": "center", height: "3000px"}}>
        </div>
        <ScrollStyle from={{position: "absolute", top: "50%", left: "0%", from: 0}} to={{left: "80%", goBy: .5}}>
            <p>Text</p>
        </ScrollStyle>
    </ScrollCtxProvider>
}

render(Wrapper, document.getElementById("app") as HTMLElement);
