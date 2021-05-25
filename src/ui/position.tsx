import { CSSProperties } from "react";

export const BuildPositionComponent =
  (position: "static" | "sticky" | "fixed" | "absolute" | "relative") =>
  ({
    children,
    style
  }: {
    children: any;
    style?: CSSProperties
  }) =>
    <div style={{ position: position, ...style }}>{children}</div>;

//set position method for element
export const Fixed = BuildPositionComponent("fixed");
export const Absolute = BuildPositionComponent("absolute");
export const Relative = BuildPositionComponent("relative");
export const Static = BuildPositionComponent("static");
export const Sticky = BuildPositionComponent("sticky");
