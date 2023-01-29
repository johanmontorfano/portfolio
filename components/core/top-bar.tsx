import { createEffect, createSignal, Show } from "solid-js";
import { Motion } from "@motionone/solid";
import { GlobalContext } from "../../contexts/global";
import { useScreenType } from "../../hooks/screen";
import { StepScrollContext } from "../../contexts/step-scroll";

export default function TopBar() {
  const screenType = useScreenType();
  const [showStepInterface, updateStepInterfaceVisibility] =
    createSignal(false);
  let timeoutCleaner: NodeJS.Timeout;

  createEffect(() => {
    clearTimeout(timeoutCleaner);
    updateStepInterfaceVisibility(true);
    timeoutCleaner = setTimeout(
      () => updateStepInterfaceVisibility(false),
      1500
    );
    return StepScrollContext.originalElementDistance();
  });

  return (
    <Motion.div
      initial={{
        width: "98%",
        height: "5vh",
        top: 0,
        background:
          "linear-gradient(180deg, var(--background) 0%, transparent 100%)",
        "z-index": 10,
        padding: "1%",
        position: "fixed",
        opacity: 0,
        y: -50,
      }}
      animate={
        GlobalContext.barVisible()
          ? {
              opacity: 1,
              y: 0,
            }
          : {}
      }
    >
      <Motion.p
        style={{ "text-align": "center", "font-variant": "all-small-caps" }}
        initial={{ top: 0, opacity: 0 }}
        animate={
          StepScrollContext.originalElementDistance() > 0
            ? { y: -50, opacity: 0 }
            : { y: 0, opacity: 1 }
        }
        class="tiny"
      >
        Copyright © 2023, Johan Montorfano
      </Motion.p>
      <Motion.div
        style={{
          position: "absolute",
          top: 0,
          height: "2px",
          background: "var(--text)",
          left: "0",
        }}
        animate={{
          width:
            (window.innerWidth / 2) *
              StepScrollContext.originalElementDistance() +
            "px",
        }}
      />
    </Motion.div>
  );
}
