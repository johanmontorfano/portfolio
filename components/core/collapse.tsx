import { Motion } from "@motionone/solid";
import { createEffect, createSignal } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";

import ChevronDownOutline from "../../svg/chevron-down-outline.svg";

/** create a collapsable element */
export function Collapsable(props: {
  children: JSX.Element;
  title: string;
  openedByDefault?: boolean;
  /** value used to overwrite the current opening value */
  overridingValue?: boolean;
  onChange?: (value: boolean) => void;
  targetHeight?: number
}) {
  const [opened, setOpen] = createSignal(props.openedByDefault === true);

  createEffect(() => {
    setOpen(props.overridingValue || props.openedByDefault === true);
    return props.overridingValue;
  });

  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          display: "flex",
          "justify-content": "space-between",
          "align-items": "center",
        }}
      >
        <h3>{props.title}</h3>
        <ChevronDownOutline
          onClick={() => {
            setOpen(!opened());
            if (props.onChange !== undefined) props.onChange(opened());
          }}
          class="fill-stroke"
          width={35}
          height={35}
          style={{
            transform: `rotate(${opened() ? 180 : 0}deg)`,
            transition: "all .2s ease",
            cursor: "pointer",
          }}
        />
      </div>
      <Motion.div
        class={`collapse-container${opened() ? "" : "--collapsed"}`}
        animate={{
            scaleY: opened() ? 1 : 0,
            height: opened() ? (props.targetHeight + "px") || "100%" : "0px"
        }}
      >
        {props.children}
      </Motion.div>
    </div>
  );
}
