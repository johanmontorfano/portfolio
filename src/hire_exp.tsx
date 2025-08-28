import { IoArrowForward, IoFlash } from "solid-icons/io";
import { createSignal } from "solid-js";
import { Motion } from "solid-motionone";

export function HireExperience() {
    const [hover, setHover] = createSignal(false);

    return <Motion.div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
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
                "font-size": "14px",
                padding: "8px",
                color: "white",
                display: "flex",
                "align-items": "center",
                cursor: "pointer",
                "font-weight": "bold"
            }}
            onClick={() => {
                window.open(
                    "https://form.typeform.com/to/VAHkuZSx",
                    "_blank"
                )!.focus()
            }}
        >
            LET'S WORK TOGETHER
            <div style={{
                "transform": `translateX(${hover() ? "10px" : "0px"}) translateY(-2px)`,
                transition: "all .5s ease"
            }}>
                <IoArrowForward size={14} />
            </div>
        </div>
    </Motion.div>
}
