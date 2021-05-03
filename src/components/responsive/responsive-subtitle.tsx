import {
  EditSubtitleLayoutStyle,
  LayoutStyles,
} from "../../app/styles/styled/layouts";
import { ResponsiveComponent } from "../../modules/responsive/responsive";
import { AnimatedAppear } from "../appear";

export const ResponsiveSubtitle = (props: { children: string }) => (
  <AnimatedAppear>
    <ResponsiveComponent
      style={LayoutStyles.SubtitleLayout.initial}
      mobile_style={EditSubtitleLayoutStyle.initialBlock([
        { edit: "textAlign", value: "center" },
      ])}
    >
      <div className="semi-big-font-size-current">{props.children}</div>
    </ResponsiveComponent>
  </AnimatedAppear>
);
