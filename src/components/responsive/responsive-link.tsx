import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { GetClassnameValue } from "../../app/styles/styled";
import { ConditionnalComponent } from "../../modules/conditionnal/conditionnal-component";
import { AnimatedAppear } from "../appear";

export const ResponsiveLink = (props: {
  children: string;
  redirectTo: string;
  tiny?: boolean;
}) => (
  <AnimatedAppear>
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
      onClick={() => {
        if (props.redirectTo[0] === "/") window.scrollTo(0, 0);
      }}
    >
      <ConditionnalComponent
        condition={props.redirectTo[0] === "/"}
        True={NavLink}
        TrueProps={{
          to: props.redirectTo,
          style: { color: "black", textDecoration: "none" },
        }}
        False={motion.div}
        FalseProps={{ onClick: () => window.location.assign(props.redirectTo) }}
      >
        <>{props.children}</>
      </ConditionnalComponent>
    </motion.div>
  </AnimatedAppear>
);
