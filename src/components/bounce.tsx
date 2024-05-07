import {Motion} from "solid-motionone";

export function Bouncer(props: {onClick: () => void}) {
    return <div onClick={props.onClick}
        style={{
            position: "relative",
            display: "flex",
            "align-items": "center",
            "justify-content": "center",
            color: "var(--text-color)",
            "font-family": "Roboto",
            cursor: "pointer"
        }}
    >
        Begin
        <Motion.div 
            style={{
                position: "absolute", 
                width: "180%", 
                height: "100%", 
                background: "white",
                "border-radius": "15px"
            }} 
            animate={{scale: [1, 1.2, 2], opacity: [0, 1, 0]}}
            transition={{repeat: Infinity, duration: 1.5}}
        />
    </div>
}
