import { useNetworkPresence } from "../../hooks/online";
import { Show } from "solid-js";
import { Motion } from "@motionone/solid";
import { GlobalContext } from "../../contexts/global";
import { useScreenType } from "../../hooks/screen";

import InstaSVG from "../../svg/logo-instagram.svg";
import GithubSVG from "../../svg/logo-github.svg";
import MailSVG from "../../svg/mail-outline.svg";
import PhoneSVG from "../../svg/call-outline.svg";
import { StepScrollContext } from "../../contexts/step-scroll";

export default function BottomBar() {
  const online = useNetworkPresence();
  const screenType = useScreenType();

  return (
    <Show when={online()} fallback={<div />}>
      <Motion.div
        initial={{
          width: "98%",
          height: "10vh",
          bottom: 0,
          display: "flex",
          "flex-direction": "row",
          "justify-content": "space-between",
          "align-items": "center",
          background:
            "linear-gradient(0deg, var(--background) 0%, transparent 100%)",
          "z-index": 10,
          padding: "1%",
          position: "fixed",
          opacity: 0,
          y: 50,
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
        <Show when={screenType() !== "tiny"}>
          <Motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={
              StepScrollContext.originalElementDistance() === 0
                ? {}
                : { y: 0, opacity: 1 }
            }
          >
            JOHAN MONTORFANO
          </Motion.h1>
        </Show>
        <div
          style={{
            display: "flex",
          }}
        >
          {[
            [InstaSVG, "https://www.instagram.com/johanmnto", "fill"],
            [GithubSVG, "https://github.com/franndjoo/", "fill"],
            [MailSVG, () => StepScrollContext.updateOriginalElementDistance(2), "stroke"],
            [PhoneSVG, "tel:+33763427433", "stroke"],
          ].map((coordData) => {
            /** create a true component variable */
            const Component = coordData[0] as any;
            return (
              <Component
                class={`clickable fill-${coordData[2]}`}
                width="4vh"
                height="4vh"
                style={{
                  "margin-left": "12px",
                  "user-select": GlobalContext.userSelectEnabled()
                    ? "none"
                    : "all",
                }}
                onClick={() => typeof coordData[1] === "function" ? coordData[1]() : window.location.assign(coordData[1])}
              />
            );
          })}
        </div>
      </Motion.div>
    </Show>
  );
}
