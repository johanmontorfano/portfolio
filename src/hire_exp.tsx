import { IoFlash } from "solid-icons/io";
import { Motion } from "solid-motionone";

export function HireExperience() {
    console.log("hey");

    return <Motion.div
        style={{
            "z-index": 10,
            position: "absolute",
            width: "100%",
            display: "flex",
            "justify-content": "center"
        }}
        initial={{
            top: "0px",
            opacity: 0
        }}
        animate={{
            top: "20px",
            opacity: 1
        }}
    >
        <div
            style={{
                "font-size": "1rem",
                background: "#00000088",
                "backdrop-filter": "blur(50px)",
                padding: "12px",
                "border-radius": "12px",
                border: "1px solid #000000AA",
                color: "white",
                display: "flex",
                "align-items": "center",
                cursor: "pointer"
            }}
            onClick={() => {
                window.open(
                    "https://form.typeform.com/to/VAHkuZSx",
                    "_blank"
                )!.focus()
            }}
            class="elevate-on-hover"
        >
            <IoFlash size={24}
                color="white"
                style={{ "margin-right": "8px" }}
            />
            Let's work together!
        </div>
    </Motion.div>
}
