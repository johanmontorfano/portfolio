import { motion } from "framer-motion";
import { ResponsiveComponent } from "../../modules/responsive/responsive";
import { AnimatedAppear } from "../appear";

export const ResponsiveText = (props: {
  children: string | JSX.Element;
  tiny?: boolean;
  disableWrap?: boolean;
}) => (
  <AnimatedAppear>
    <motion.div
      className={
        props.tiny ? "tiny-font-size-current" : "normal-font-size-current"
      }
      style={{
        fontFamily: "Helvetica",
        whiteSpace: props.disableWrap ? "nowrap" : "normal",
      }}
    >
      <ResponsiveComponent
        style={{ userSelect: "none" }}
        mobile_style={{ userSelect: "none", textAlign: "center" }}
      >
        {props.children}
      </ResponsiveComponent>
    </motion.div>
  </AnimatedAppear>
);
