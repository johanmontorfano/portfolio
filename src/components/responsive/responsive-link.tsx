import { motion } from "framer-motion";
import { GetClassnameValue } from "../../app/styles/styled";
import { AnimatedAppear } from "../appear";

export const ResponsiveLink = (props: {
  children: string;
  redirectTo: string;
  tiny?: boolean;
}) => (
  <AnimatedAppear>
    <div onClick={() => window.location.assign(props.redirectTo)}>
      <motion.div
        className={
          props.tiny ? "tiny-font-size-current" : "normal-font-size-current"
        }
        initial={{
          fontFamily: "Helvetica",
          color: GetClassnameValue("link-color"),
          userSelect: "none",
        }}
        whileHover={{ cursor: "pointer", textDecoration: "underline" }}
      >
        {props.children}
      </motion.div>
    </div>
  </AnimatedAppear>
);
