import {A} from "@solidjs/router";
import "./menu_bar.scss";

export function MenuBar() {
    return <div id="menu_bar">
        <img src="/assets/logo-white.svg" width={75} height={75} />
        <div class="url_list">
            <A activeClass="current" href="/" end>About</A>
            <A activeClass="current" href="/resume">Resume</A>
            <A activeClass="current" href="/projects">Projects</A>
            <A activeClass="current" href="/contact">Contact</A>
        </div>
        <div />
    </div>
}
