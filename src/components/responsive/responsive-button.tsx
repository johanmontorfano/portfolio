import { motion } from "framer-motion";
import { StyleVariables } from "../../app/styles/data/variables";
import { ResponsiveComponent } from "../../modules/responsive/responsive";
import { AnimatedAppear } from "../appear";

export const ResponsiveButton = (props: {
  handleClick?: () => void;
  dark?: boolean;
  activate?: boolean;
  children: any;
}) => (
  <AnimatedAppear>
    <motion.div
      whileHover={{ scale: 1.05, cursor: "pointer" }}
      onClick={
        props.activate && props.handleClick
          ? props.handleClick
          : props.activate === undefined && props.handleClick
          ? props.handleClick
          : () => {}
      }
    >
      <ResponsiveComponent
        style={{
          padding: "1.5vh",
          fontFamily: "Helvetica",
          fontSize: StyleVariables.values.font_size.text.default,
          background: props.dark ? "black" : "whitesmoke",
          boxShadow: "0px 0px 20px 1px rgba(0,0,0,0.6)",
          borderRadius: StyleVariables.values.radius.shortRadius,
          color: props.activate
            ? "black"
            : props.activate !== undefined
            ? "gray"
            : "black",
          transition: "all 0.5s ease",
          textAlign: "center",
          display: "flex",
        }}
        mobile_style={{
          padding: "1.5vh",
          fontFamily: "Helvetica",
          fontSize: StyleVariables.values.font_size.text.mobile,
          background: props.dark ? "black" : "whitesmoke",
          boxShadow: "0px 0px 20px 1px rgba(0,0,0,0.6)",
          borderRadius: StyleVariables.values.radius.shortRadius,
          color: props.activate
            ? "black"
            : props.activate !== undefined
            ? "gray"
            : "black",
          transition: "all 0.5s ease",
          textAlign: "center",
          display: "flex",
        }}
      >
        {props.children}
      </ResponsiveComponent>
    </motion.div>
  </AnimatedAppear>
);
