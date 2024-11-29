import {render} from "solid-js/web"
import {MenuBar} from "./components/menu_bar";
import { Route, Router, RouteSectionProps } from "@solidjs/router";
import AboutRoute from "./routes/about";

import "./index.css";

function Wrapper(props: RouteSectionProps<any>) {
    return <div>
        <MenuBar />
        {props.children}
    </div>
}

function Index() {
    return <Router root={Wrapper}>
        <Route path="/" component={AboutRoute} />
    </Router>
}

render(Index, document.getElementById("app") as HTMLElement);
