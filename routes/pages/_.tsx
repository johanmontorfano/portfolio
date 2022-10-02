import { useCachePreload } from "../../scripts/cache-preload";
import { WelcomeScreen } from "../../components/screens/welcome";
import BottomBar from "../../components/core/bottom-bar";
import { ProjectScreen } from "../../components/screens/projects";
import TopBar from "../../components/core/top-bar";
import { StepScrollContext } from "../../contexts/step-scroll";
import { $DEVCOMP, createSignal } from "solid-js";
import { GlobalContext } from "../../contexts/global";
import { Motion } from "@motionone/solid";
import { ContactScreen } from "../../components/screens/contact";

/** number of screens that can be navigated, zero-based */
const NAVIGABLE_SCREENS = 2;

export default function () {
  // preload important data on the cache
  // to return them later
  useCachePreload();
  const [previousYProgression, updatePreviousYProgression] = createSignal<number>(0);

  // temporary disable the step scroll system to avoid double scrolls
  function disableStepScroll() {
    StepScrollContext.enableStepScroll(false);
    setTimeout(() => StepScrollContext.enableStepScroll(true), 1000);
  }


  // watch scroll events to make proper
  // scroll step
  window.onwheel = (ev) => {
    if (ev.deltaY < 10 && ev.deltaY > -10) return;
    if (ev.deltaY > 0 && StepScrollContext.originalElementDistance() < NAVIGABLE_SCREENS && StepScrollContext.stepScrollEnabled()) {
      StepScrollContext.updateOriginalElementDistance((prev) => prev + 1);
      disableStepScroll()
    }
    if (ev.deltaY < 0 && StepScrollContext.originalElementDistance() > 0 && StepScrollContext.stepScrollEnabled()) {
      StepScrollContext.updateOriginalElementDistance((prev) => prev - 1);
      disableStepScroll()
    }
  };
  // watch touch screen events to support
  // mobile screens
  if ("ontouchstart" in window) {
    window.ontouchmove = (ev) => {
      // store where the finger started moving
      for (let itemID = 0; itemID <= ev.touches.length; itemID++) {
        const touch = ev.touches.item(itemID);

        // run only if a coordinate is given
        if (touch?.screenY !== undefined && StepScrollContext.stepScrollEnabled()) {
          // always push the last y position
          updatePreviousYProgression(prev => touch.pageY - prev);
        }
      }
    }
    // clean the scroll y progression variable and determines
    // the appropriate action to perform
    window.ontouchend = () => {
      if (previousYProgression() < 0 && StepScrollContext.originalElementDistance() < NAVIGABLE_SCREENS && StepScrollContext.stepScrollEnabled()) {
        StepScrollContext.updateOriginalElementDistance((prev) => prev + 1);
      }
      else if (previousYProgression() > 0 && StepScrollContext.originalElementDistance() > 0 && StepScrollContext.stepScrollEnabled()) {
        StepScrollContext.updateOriginalElementDistance((prev) => prev - 1);
      }
      updatePreviousYProgression(0);
    }
  }

  return (
    <Motion.div
      ref={(ref) => StepScrollContext.updateScrollableRef(ref)}
      style={{
        width: "100%",
        height: "100vh",
        background: "var(--container)",
        "overflow": "hidden"
      }}
    >
      <TopBar />
      <WelcomeScreen />
      <ProjectScreen />
      <ContactScreen />
      <BottomBar />
    </Motion.div>
  );
}
