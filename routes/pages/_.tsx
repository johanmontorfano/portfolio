import { useCachePreload } from "../../scripts/cache-preload";
import { WelcomeScreen } from "../../components/screens/welcome";
import BottomBar from "../../components/core/bottom-bar";
import { ProjectScreen } from "../../components/screens/projects";
import TopBar from "../../components/core/top-bar";
import { StepScrollContext } from "../../contexts/step-scroll";
import { createSignal, onMount } from "solid-js";
import { Motion } from "@motionone/solid";
import { ContactScreen } from "../../components/screens/contact";

/** number of screens that can be navigated, zero-based */
const NAVIGABLE_SCREENS = 2;

export default function () {
  // preload important data on the cache
  // to return them later
  useCachePreload();
  // stores data about [previous point, tendency]
  const [previousYProgression, updatePreviousYProgression] = createSignal<
    [number, number]
  >([0, 0]);

  // temporary disable the step scroll system to avoid double scrolls
  function disableStepScroll() {
    StepScrollContext.enableStepScroll(false);
    setTimeout(() => StepScrollContext.enableStepScroll(true), 500);
  }

  onMount(() => {
    // watch scroll events to make proper
    // scroll step
    window.onwheel = (ev) => {
      if (ev.deltaY < 10 && ev.deltaY > -10) return;
      if (
        ev.deltaY > 0 &&
        StepScrollContext.originalElementDistance() < NAVIGABLE_SCREENS &&
        StepScrollContext.stepScrollEnabled()
      ) {
        StepScrollContext.updateOriginalElementDistance((prev) => prev + 1);
        disableStepScroll();
      }
      if (
        ev.deltaY < 0 &&
        StepScrollContext.originalElementDistance() > 0 &&
        StepScrollContext.stepScrollEnabled()
      ) {
        StepScrollContext.updateOriginalElementDistance((prev) => prev - 1);
        disableStepScroll();
      }
    };
    // watch touch screen events to support
    // mobile screens
    if ("ontouchstart" in window) {
      window.ontouchmove = (ev) => {
        // console.log(ev.changedTouches);
        // store where the finger started moving
        for (let itemID = 0; itemID <= ev.changedTouches.length; itemID++) {
          const touch = ev.changedTouches.item(itemID);

          // run only if a coordinate is given
          if (
            touch?.screenY !== undefined &&
            StepScrollContext.stepScrollEnabled()
          ) {
            // always push the last y position
            updatePreviousYProgression((prev) => [
              touch.screenY,
              touch.screenY - prev[0],
            ]);
          }
        }
      };
      // clean the scroll y progression variable and determines
      // the appropriate action to perform
      window.ontouchend = () => {
        if (
          previousYProgression()[1] < 0 &&
          StepScrollContext.originalElementDistance() < NAVIGABLE_SCREENS &&
          StepScrollContext.stepScrollEnabled()
        ) {
          StepScrollContext.updateOriginalElementDistance((prev) => prev + 1);
        } else if (
          previousYProgression()[1] > 0 &&
          StepScrollContext.originalElementDistance() > 0 &&
          StepScrollContext.stepScrollEnabled()
        ) {
          StepScrollContext.updateOriginalElementDistance((prev) => prev - 1);
        }
        updatePreviousYProgression([0, 0]);
      };
    }
  });

  return (
    <Motion.div
      ref={(ref) => StepScrollContext.updateScrollableRef(ref)}
      style={{
        width: "100%",
        height: "100vh",
        background: "var(--container)",
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
