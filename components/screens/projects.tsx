import { Motion } from "@motionone/solid";
import { createSignal, For } from "solid-js";
import { StepScrollContext } from "../../contexts/step-scroll";
import { usePredefinedRequest } from "../../hooks/request";
import ArrowForward from "../../svg/arrow-forward-outline.svg";
import { ProjectData } from "../../types/projects";
import { ExpandableCard } from "../misc/expandable-card";
import * as _DOMPurify from "dompurify";
import { Collapsable } from "../core/collapse";

const DOMPurify = _DOMPurify.default;

export function ProjectScreen() {
  const projects = usePredefinedRequest<ProjectData>("projects");
  /** is the repositories collapsable element opened, if it is opened
   * it prevents the skills collapsable element to be opened
   */
  const [repoCollapserOpened, updateRepoCollapserOpeningState] =
    createSignal(false);

  return (
    <Motion.div
      style={{
        "min-height": "100vh",
        display: "flex",
        "flex-direction": "column",
        width: "100%",
        position: "absolute",
        background: "var(--background)",
        "will-change": "transform",
      }}
      animate={{
        y:
          (-StepScrollContext.originalElementDistance() + 1) *
          window.innerHeight,
      }}
      transition={{
        y: {
          duration: 0.5,
          allowWebkitAcceleration: true,
          easing: "ease-in-out",
        },
      }}
    >
      <div
        style={{ padding: "4%", "padding-top": "5vh", "padding-bottom": "1%" }}
      >
        <h2>PROJECTS</h2>
        <div
          style={{ "max-width": "900px", gap: "12px" }}
          class="dynamic-2col-grid"
        >
          <For
            each={projects().filter((v) =>
              v.type === "project" ? v : undefined
            )}
          >
            {(item, i) => {
              return (
                <div
                  style={{
                    height: "50px",
                  }}
                >
                  <ExpandableCard
                    initialBoundaries={{ width: "350px", height: "50px" }}
                    onExpanded={DOMPurify.sanitize(item.description, {
                      USE_PROFILES: { html: true },
                    })}
                    title={item.name}
                  >
                    <Motion.div
                      style={{
                        display: "flex",
                        "align-items": "center",
                        width: "100%",
                        "max-width": "350px",
                        "justify-content": "space-between",
                      }}
                      initial={{
                        opacity: 0,
                        x: -50,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay: 1 + i() * 0.1,
                      }}
                      class="category--container"
                    >
                      <p
                        style={{
                          "font-variant-caps": "all-small-caps",
                          "font-weight": "500",
                        }}
                      >
                        {item.name}
                      </p>{" "}
                      <ArrowForward
                        class="fill-stroke"
                        height={"clamp(21px, 6vw, 25px)"}
                      />
                    </Motion.div>
                  </ExpandableCard>
                </div>
              );
            }}
          </For>
        </div>
      </div>
      <div style={{ padding: "4%", "padding-bottom": "1%" }}>
        <Collapsable
          title="REPOSITORIES"
          overridingValue={repoCollapserOpened()}
          targetHeight={315}
          onChange={(v) => updateRepoCollapserOpeningState(v)}
        >
          <div
            style={{
              display: "grid",
              height: "310px",
              "grid-template-columns": `repeat(${
                projects().filter((v) =>
                  v.type === "repository" ? v : undefined
                ).length
              }, 235px)`,
              "overflow-x": "auto",
            }}
            class="prevent-styling"
            onTouchStart={() => StepScrollContext.enableStepScroll(false)}
            onTouchEnd={() => StepScrollContext.enableStepScroll(true)}
          >
            <For
              each={projects().filter((v) =>
                v.type === "repository" ? v : undefined
              )}
            >
              {(item, i) => {
                return (
                  <div style={{ height: "300px" }}
                  onClick={() => window.location.assign(item.description)}>
                    <Motion.div
                      style={{
                        display: "flex",
                        "align-items": "center",
                        width: "175px",
                        "margin-right": "25px",
                        padding: "12px",
                        height: "274px",
                        background: "var(--container)",
                        "justify-content": "space-between",
                        "border-radius": "12px",
                      }}
                      initial={{
                        opacity: 0,
                        x: -50,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay: 1 + i() * 0.1,
                      }}
                      class="category--container"
                    >
                      <p
                        style={{
                          "font-variant-caps": "all-small-caps",
                          "font-weight": "500",
                        }}
                      >
                        {item.name}
                      </p>{" "}
                      <ArrowForward
                        class="fill-stroke"
                        height={"clamp(21px, 6vw, 25px)"}
                      />
                    </Motion.div>
                  </div>
                );
              }}
            </For>
          </div>
        </Collapsable>
      </div>
      <div style={{ padding: "4%", "padding-bottom": "1%" }}>
        <Collapsable
          title="SKILLS"
          targetHeight={window.innerHeight * .5}
          overridingValue={!repoCollapserOpened()}
          onChange={(v) => updateRepoCollapserOpeningState(!v)}
        >
          <div
            class="dynamic-2col-grid"
            style={{ "max-width": "900px", gap: "12px" }}
          >
            <For
              each={projects().filter((v) =>
                v.type === "skill" ? v : undefined
              )}
            >
              {(item, i) => {
                return (
                  <div>
                    {" "}
                    <Motion.div
                      style={{
                        display: "flex",
                        "align-items": "center",
                        width: "100%",
                        "max-width": "250px",
                        "justify-content": "space-between",
                      }}
                      initial={{
                        opacity: 0,
                        x: -50,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay: 2 + i() * 0.1,
                      }}
                      class="category--container"
                    >
                      <p
                        style={{
                          "font-variant-caps": "all-small-caps",
                          "font-weight": "500",
                        }}
                      >
                        {item.name}
                      </p>{" "}
                    </Motion.div>
                    <Motion.div
                      style={{
                        display: "flex",
                        "align-items": "center",
                        width: "100%",
                        "max-width": "250px",
                        "justify-content": "space-between",
                      }}
                      initial={{
                        opacity: 0,
                        x: -50,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay: 2 + i() * 0.1,
                      }}
                    >
                      <p class="tiny">{item.description}</p>
                    </Motion.div>
                  </div>
                );
              }}
            </For>
          </div>
        </Collapsable>
      </div>
    </Motion.div>
  );
}
