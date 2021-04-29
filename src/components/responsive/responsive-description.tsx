import { StyleVariables } from "../../app/styles/data/variables";
import { ResponsiveComponent } from "../../modules/responsive/responsive";
import { AnimatedAppear } from "../appear";

export const ResponsiveDescription = (props: {
  children: string;
  dark?: boolean;
}) => (
  <AnimatedAppear>
  <ResponsiveComponent
    style={{
      fontFamily: "Helvetica",
      fontSize: StyleVariables.values.font_size.description.default,
      fontWeight: 600,
      color: props.dark ? "white" : StyleVariables.colors["text@description"],
      textAlign: "justify",
    }}
    mobile_style={{
      fontFamily: "Helvetica",
      fontSize: StyleVariables.values.font_size.description.mobile,
      fontWeight: 600,
      color: props.dark ? "white" : StyleVariables.colors["text@description"],
      textAlign: "center",
    }}
  >
    {props.children}
  </ResponsiveComponent></AnimatedAppear>
);
