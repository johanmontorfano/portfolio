import { IoArrowForward } from "solid-icons/io";
import { createSignal } from "solid-js";
import { Motion } from "solid-motionone";

export const [openDatalisExp, setOpenDatalisExp] = createSignal(false);
const [hover, setHover] = createSignal(false);

export function DatalisExperienceToggle() {
    return <Motion.div 
        style={{
            display: "flex",
            background: "#000000",
            "align-items": "center",
            cursor: "pointer",
            "border-radius": "4px"
        }}
        animate={{
            outline: hover() ? "8px solid black" : "0px solid black"
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => setOpenDatalisExp(true)}
    >
        <img src="https://datalis.johanmontorfano.com/favicon.svg"
            width={40}
            height={40}
            style={{
                filter: "invert(var(--dts-filter-invert))",
                "margin-left": "10px"
            }}
        />
        <p style={{
            color: "white",
            "margin-left": "10px",
            "font-size": "1rem" 
        }}>
            Be a part of the future of data
        </p>
    </Motion.div>
}

export function DatalisExp() {
    const [hover, setHover] = createSignal(false);

    return <Motion.div
        style={{
            width: "100%",
            height: "100vh",
            position: "absolute",
            top: 0,
            left: 0,
            "z-index": openDatalisExp() ? 10 : 0,
            display: openDatalisExp() ? "flex" : "none",
            background: "black",
            "justify-content": "center",
            "align-items": "center"
        }}
        animate={{
            transform: openDatalisExp() ? "scale(1)" : "scale(1.02)",
            filter: openDatalisExp() ? "blur(0px)" : "blur(50px)"
        }}
    >
        <div style={{
            width: "calc(100% - 40px)",
            "max-width": "760px",
            padding: "20px",
            "font-family": "Atkinson",
            color: "white"
        }}>
            <img src="https://datalis.johanmontorfano.com/favicon.svg"
                width={60}
                height={60}
                style={{filter: "invert(var(--dts-filter-invert))"}}
            />
            <h1 style={{
                "text-transform": "uppercase",
                "font-weight": "bolder",
                "font-size": "xx-large"
            }}>Be part of the future of data.</h1>
            <div>
                <p>
                    For years, I've specialized in full-stack development,
                    building scalable web applications, cloud solutions, and
                    decentralized systems. My work has always been driven by
                    a passion for clean code, performance, and user-centric
                    solutions—but now, I’m taking it further.
                </p>
                <p>
                    With Datalis, I’m pioneering a new approach to data
                    valuation and ethical ownership using blockchain
                    technology. We believe in giving users control over their
                    digital assets, ensuring transparency, security, and fair
                    monetization of their data.
                </p>
                <p>
                    My past work showcases my ability to architect robust
                    platforms, solve complex problems, and push technological
                    boundaries. Now, with Datalis, I’m focused on creating a
                    future where data is not just collected—it’s valued, owned,
                    and protected.
                </p>
                <strong>Join the movement. Explore Datalis.</strong>
                <br />
                <br />
                <Motion.div
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                    style={{
                        background: "black",
                        border: "1px solid white",
                        color: "white",
                        display: "flex",
                        "justify-content": "space-between",
                        "align-items": "center",
                        padding: "6px",
                        cursor: "pointer",
                        "font-variant": "all-small-caps",
                        "font-weight": "600"
                    }}
                    animate={{width: hover() ? "52%" : "48%"}}
                    onClick={() => window.location.assign(
                        "https://datalis.johanmontorfano.com/about"
                    )}
                >
                    <span>Check out Datalis' portfolio</span>
                    <IoArrowForward style={{"margin-left": "15px"}} />
                </Motion.div>
            </div>
        </div>
    </Motion.div>
}
