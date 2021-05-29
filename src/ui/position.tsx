import { CSSProperties, HTMLAttributes } from "react";
import { EditJSONEntries } from "../data/manipulation";

export const BuildPositionComponent =
  (position: "static" | "sticky" | "fixed" | "absolute" | "relative") =>
  (props: HTMLAttributes<HTMLDivElement>) =>
    (
      <div
        {...EditJSONEntries(
          [["style", { position: position, ...props.style }]],
          props
        )}
      />
    );

//set position method for element
export const Fixed = BuildPositionComponent("fixed");
export const Absolute = BuildPositionComponent("absolute");
export const Relative = BuildPositionComponent("relative");
export const Static = BuildPositionComponent("static");
export const Sticky = BuildPositionComponent("sticky");
