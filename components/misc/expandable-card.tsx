import { Motion } from "@motionone/solid";
import { createSignal, JSX } from "solid-js";
import { GlobalContext } from "../../contexts/global";
import { StepScrollContext } from "../../contexts/step-scroll";
import { useScreenType } from "../../hooks/screen";

import CloseOutline from "../../svg/close-outline.svg";
import "../../sass/custom/article.scss";

/** distance from the top on the Y axis for the expanded card */
const TOP_MARGIN_PERCENTAGE = 10;

/** An expendable card element is an element made to be expanded later */
export function ExpandableCard(props: {
  children: JSX.Element;
  onExpanded: JSX.Element;
  initialBoundaries: { width: string; height: string };
  title: string;
}) {
  const screenType = useScreenType();
  /** is the card is expanded or not */
  const [isExpanded, updateExpandability] = createSignal(false);
  /** computed distance from the center of the element to the middle of the screen */
  const [xDistance, updateXDistance] = createSignal(0);
  /** computed distance from the center of the element to the X distance from the top of the screen */
  const [yDistance, updateYDistance] = createSignal(0);

  /** recompute X distance to center the element on the screen*/
  function computeXDistance(element: HTMLElement) {
    /** get boundings of the element */
    const boundings = element.getBoundingClientRect();
    /** half of the screen size on the X axis */
    const halfScreenSizeX = window.innerWidth / 2;
    /** width size that is gonna be computed by CSS */
    const cssWidth = window.innerWidth > 800 ? 800 : window.innerWidth;

    /** compute the distance to travel to the center of the element */
    if (window.innerWidth > 800)
      updateXDistance(halfScreenSizeX - (boundings?.left || 0) - cssWidth / 2);
    else updateXDistance(-boundings.left);
  }
  /** recompute Y distance to place the top of the element at P px of the top of the screen */
  function computeYDistance(element: HTMLElement) {
    /** get boundings of the element */
    const boundings = element.getBoundingClientRect();
    /** get pixel value of the margin defined by `TOP_MARGIN_PERCENTAGE` */
    const topMarginPx = (window.innerHeight / 100) * TOP_MARGIN_PERCENTAGE;

    /** compute the distance to travel to be at the `topMarginPx` distance of
     * the top of the screen
     */
    updateYDistance(topMarginPx - boundings.top);
  }

  return (
    <Motion.div
      style={{
        "z-index": isExpanded() ? 15 : 0,
        position: "absolute",
        cursor: "pointer",
        "box-shadow":
          isExpanded()
            ? `0px 0px 1000px 1000px rgba(0, 0, 0, .8)`
            : "0px 0px 0px 0px rgba(0, 0, 0, .8)",
        transition: "box-shadow .2s ease",
      }}
      initial={{
        "border-radius": "28px",
      }}
      animate={{
        "border-radius": isExpanded() ? "12px" : "28px",
        width: isExpanded() ? "100vw" : props.initialBoundaries.width,
        "max-width": "800px",
        background: "var(--container)",
        height: isExpanded() ? "90vh" : props.initialBoundaries.height,
        x: isExpanded() ? xDistance() : 0,
        y: isExpanded() ? yDistance() : 0,
        "border-bottom-left-radius": isExpanded() ? "0px" : "28px",
        "border-bottom-right-radius": isExpanded() ? "0px" : "28px",
        display: "flex",
      }}
      onMouseEnter={(ev) => {
        if (!isExpanded()) {
          computeXDistance(ev.target as HTMLElement);
          computeYDistance(ev.target as HTMLElement);
        }
      }}
      onClick={() => {
        if (GlobalContext.userSelectEnabled() || isExpanded()) {
          updateExpandability((prev) => !prev);
          GlobalContext.updateBarVisibility(!isExpanded());
          GlobalContext.enableUserSelect(!isExpanded());
          StepScrollContext.enableStepScroll(!isExpanded());
        }
      }}
    >
      <Motion.div
        initial={{
          opacity: 1,
          width: "calc(100% - 24px)",
          height: props.initialBoundaries.height,
          display: "flex",
          "align-items": "center",
          "margin-left": "12px",
          "margin-right": "12px",
          "z-index": 10,
        }}
        animate={{
          opacity: isExpanded() ? 0 : 1,
        }}
      >
        {props.children}
      </Motion.div>
      <Motion.div
        initial={{ opacity: 0, position: "absolute", "max-height": "90vh", "overflow-y": "visible" }}
        animate={{ opacity: isExpanded() ? 1 : 0 }}
        id="article--container"
      >
        <div id="article--header">
          <h1>{props.title}</h1>
          <CloseOutline width={40} height={40} class="fill-fill" />
        </div>
        <div
          id="article--content"
          ref={(ref) =>
            (ref.innerHTML = props.onExpanded?.toString() || "ERROR")
          }
        />
      </Motion.div>
    </Motion.div>
  );
}
