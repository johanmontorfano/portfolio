import { IoLogoGithub } from "solid-icons/io";
import { IconTypes } from "solid-icons";
import GithubPP from "../public/assets/pps/github_profile.png";
import UpworkPP from "../public/assets/pps/upwork_profile.jpg";
import Linkedin from "../public/assets/svg/linkedin.svg";

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
    }
}

export function AppLink(kind: AppLinkData) {
    return <div
        onClick={() => window.location.href = kind.url}
        style={{
            position: "relative",
            width: "60px",
            height: "60px",
            margin: "8px"
        }}
    >
        <img
            style={{
                position: "absolute",
                "border-radius": "100%",
                cursor: "pointer",
                border: "2px solid lightgray"
            }} 
            src={kind.profilePicture} 
            width={60} 
            height={60} 
        />
        {typeof kind.appPicture === "string" ? 
            <img style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0
                }}
                src={kind.appPicture}
                width={20} 
                height={20} 
            /> :
            <kind.appPicture style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0
                }}
                width={20} 
                height={20} 
            />
        }
    </div>
}

