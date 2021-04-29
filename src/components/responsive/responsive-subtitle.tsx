import { StyleVariables } from "../../app/styles/data/variables";
import { ResponsiveComponent } from "../../modules/responsive/responsive";
import { AnimatedAppear } from "../appear";

export const ResponsiveSubtitle = (props: { children: string }) => (
  <AnimatedAppear>
    <ResponsiveComponent
      style={{
        fontFamily: "Helvetica",
        fontSize: StyleVariables.values.font_size.subtitle.default,
        fontWeight: StyleVariables.values.weight.subtitle,
        textAlign: "justify",
      }}
      mobile_style={{
        fontFamily: "Helvetica",
        fontSize: StyleVariables.values.font_size.subtitle.mobile,
        fontWeight: StyleVariables.values.weight.subtitle,
        textAlign: "center",
      }}
    >
      {props.children}
    </ResponsiveComponent>
  </AnimatedAppear>
);
