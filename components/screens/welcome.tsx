import { Motion } from "@motionone/solid";
import { useTimedOutValue } from "../../hooks/timeout";
import { BottomAppear } from "../core/appear";
import { createSignal, onMount } from "solid-js";
import { GlobalContext } from "../../contexts/global";

import ArrowDown from "../../svg/arrow-down-outline.svg";
import "../../sass/custom/welcome.scss";
import { StepScrollContext } from "../../contexts/step-scroll";

export function WelcomeScreen() {
  const showParagraph1 = useTimedOutValue(1000);
  const observer = new IntersectionObserver(
    (els) => {
      els.forEach((el) => {
        if (el.isIntersecting)
          GlobalContext.updateWelcomeViewState(el.intersectionRatio === 1);
      });
    },
    {
      threshold: [0.95, 1],
      root: null,
    }
  );

  return (
    <Motion.div
      style={{
        display: "flex",
        background: "var(--background)",
        "overflow-x": "hidden",
        position: "absolute",
        width: "100vw",
        "will-change": "transform",
      }}
      ref={(ref) => observer.observe(ref)}
      animate={{
        y: StepScrollContext.originalElementDistance() * -window.innerHeight,
      }}
      transition={{
        y: {
          duration: 0.5,
          allowWebkitAcceleration: true,
          easing: "ease-in-out",
        },
      }}
    >
      <Motion.div
        initial={{
          height: "100vh",
          width: "100%",
          display: "flex",
          "justify-content": "center",
          background: "var(--background)",
          "z-index": 2,
        }}
      >
        <div
          style={{
            height: "100vh",
            display: "flex",
            "flex-direction": "column",
            "max-width": "900px",
            "justify-content": "center",
          }}
        >
          <Motion.div
            style={{
              width: "90%",
              display: "flex",
              "flex-direction": "column",
            }}
            initial={{ scale: 2 }}
            animate={{
              scale: 1,
            }}
            transition={{ delay: 0.15 }}
          >
            <BottomAppear delay={300}>
              <h1
                style={{
                  "text-align": "left",
                  "font-family": "Roboto Condensed",
                  "font-weight": "700",
                  "font-size": "clamp(22px, 8vw, 64px)",
                  "line-height": "clamp(26px, 10vw, 68px)",
                  "user-select": "none",
                  padding: "8%",
                  transition: "all .2s ease",
                  "padding-bottom": "0%",
                  display: "flex",
                }}
              >
                HI, I'M JOHAN
              </h1>
            </BottomAppear>

            <BottomAppear delay={500}>
              <h1
                style={{
                  "text-align": "left",
                  "font-family": "Roboto Condensed",
                  "font-weight": "700",
                  "font-size": "clamp(22px, 8vw, 64px)",
                  "line-height": "clamp(26px, 10vw, 68px)",
                  "user-select": "none",
                  padding: "8%",
                  transition: "all .2s ease",
                  "padding-top": "0%",
                }}
              >
                {" "}
                A FULL-STACK DEVELOPER, TAILORED SOFTWARE CREATOR, BASED IN
                LYON, FRANCE.
              </h1>
            </BottomAppear>
          </Motion.div>

          <Motion.div
            style={{
              position: "relative",
              "padding-left": "8%",
              overflow: "hidden",
              transition: "all .2s ease",
              "max-width": "450px",
              width: "90%",
              display: "flex",
              "align-items": "center",
              "user-select": "none",
              "-webkit-user-select": "none",
              "will-change": "height",
            }}
            initial={{
              "max-height": "0px",
            }}
            animate={{
              "max-height":
                (showParagraph1() ? window.innerHeight * 0.1 : 0) + "px",
            }}
          >
            <p
              style={{
                "font-variant-caps": "all-small-caps",
                color: "var(--disc-text)",
                "font-weight": "400",
              }}
            >
              Scroll down
            </p>
            <Motion.div
              initial={{ y: -3 }}
              animate={{ y: [-3, 8, -3] }}
              transition={{
                y: { offset: [0, 0.5, 1], repeat: Infinity },
                duration: 1.4,
              }}
            >
              <ArrowDown
                class="fill-stroke discreet"
                width="25px"
                style={{ "margin-left": "12px" }}
              />
            </Motion.div>
          </Motion.div>
        </div>
      </Motion.div>
    </Motion.div>
  );
}
