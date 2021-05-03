import {
  EditDescriptionLayoutStyle,
  LayoutStyles,
} from "../../app/styles/styled/layouts";
import { ResponsiveComponent } from "../../modules/responsive/responsive";
import { AnimatedAppear } from "../appear";

export const ResponsiveDescription = (props: {
  children: string;
  dark?: boolean;
}) => (
  <AnimatedAppear>
    <ResponsiveComponent
      style={LayoutStyles.DescriptionLayout.initial}
      mobile_style={EditDescriptionLayoutStyle.initialBlock([
        { edit: "textAlign", value: "center" },
      ])}
    >
      <div className="middle-font-size-current">{props.children}</div>
    </ResponsiveComponent>
  </AnimatedAppear>
);
