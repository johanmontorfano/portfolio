import { IoLogoGithub, IoLogoMedium } from "solid-icons/io";
import { IconTypes } from "solid-icons";
import GithubPP from "../public/assets/pps/github_profile.png";
import UpworkPP from "../public/assets/pps/upwork_profile.jpg";
import MediumPP from "../public/assets/pps/medium_profile.jpg";
import Linkedin from "../public/assets/svg/linkedin.svg";
import ResearchGate from "../public/assets/svg/researchgate.svg";
import Medium from "../public/assets/pps/medium.jpeg";
import { Motion } from "solid-motionone";
import { createSignal } from "solid-js";

interface AppLinkData {
    url: string;
    appPicture: IconTypes | string;
    profilePicture: string;
}

export const AppLinkPresets: { [app: string]: AppLinkData } = {
    gh: {
        url: "https://github.com/johanmontorfano",
        appPicture: IoLogoGithub,
        profilePicture: GithubPP
    },
    li: {
        url: "https://www.linkedin.com/in/jhnm",
        appPicture: Linkedin,
        profilePicture: UpworkPP
    },
    md: {
        url: "https://www.medium.com/@johandelhomme",
        appPicture: Medium,
        profilePicture: MediumPP
    },
    rg: {
        url: "https://www.researchgate.net/profile/Johan-Delhomme-Montorfano",
        appPicture: ResearchGate,
        profilePicture: UpworkPP
    }
}

export function AppLink(kind: AppLinkData) {
    const [hover, setHover] = createSignal(false);

    return <Motion.div
        onClick={() => window.location.href = kind.url}
        style={{
            position: "relative",
            width: "60px",
            height: "60px",
            margin: "8px"
        }}
        animate={{
            scale: hover() ? 1.3 : 1
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
    >
        <img
            style={{
                position: "absolute",
                "border-radius": "100%",
                cursor: "pointer",
                border: "2px solid lightgray"
            }} 
            src={kind.profilePicture} 
            width={63} 
            height={63} 
        />
        {typeof kind.appPicture === "string" ? 
            <img style={{
                    position: "absolute",
                    bottom: "2px",
                    right: "2px"
                }}
                src={kind.appPicture}
                width={20} 
                height={20} 
            /> :
            <kind.appPicture style={{
                    position: "absolute",
                    bottom: "2px",
                    right: "2px"
                }}
                fill="black"
                width={20} 
                height={20} 
            />
        }
    </Motion.div>
}

