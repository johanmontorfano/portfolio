import { render } from "solid-js/web";
import MailIcon from "./svg/mail-outline.svg";
import GHLogo from "./svg/logo-github.svg";
import LKLogo from "./svg/logo-linkedin.svg";
import JMLogo from "./svg/johan-montorfano.svg";

import "./sass/shared/global.scss";
import "./sass/shared/fonts.scss";
import "./sass/shared/svg.scss";
import {GroupBottomAppear} from "./components/appear";

function Root() {
    const icon_links = [
        {icon: GHLogo, link: "https://github.com/franndjoo"},
        {icon: LKLogo, link: "https://linkedin.com/in/johanmontorfano"},
        {icon: MailIcon, link: "mailto:hello@johanmontorfano.com"}
    ];

    return (
        <div style={{
            width: "100%",
            height: "100dvh",
            display: "flex",
            "justify-content": "center",
            "align-items": "center"
        }}>
            <div style={{
                "max-width": "600px",
                display: "flex",
                "flex-direction": "column",
                "align-items": "center"
            }}>
                <JMLogo {...({ 
                    width: "clamp(250px, 40vw, 400px)",
                    height: "clamp(250px, 40vw, 400px)"
                } as any)} />

                <GroupBottomAppear delay={1500}>
                    <h1 style={{
                        "text-align": "center"
                    }}>JOHAN MONTORFANO PORTFOLIO</h1>
                    <br />
                    <p>This website is being upgraded.</p>
                    <br />
                    <p>Stay tuned for the next release.</p>
                    <br />
                    <div>
                        {icon_links.map(i => (
                            <i.icon {...({
                                width: "40px",
                                height: "40px",
                                class: "fill",
                                onclick: () => window.location.assign(i.link)
                            } as any)}/>
                        ))}
                    </div>
                </GroupBottomAppear>
            </div>
        </div>
    );
}

render(Root, document.getElementById("root") as HTMLElement);
