import { motion } from "framer-motion";
import { CSSProperties } from "react";

export const Container = (props: {
  width: string | number;
  height: string | number;
  style?: CSSProperties;
  xalign?: string;
  yalign?: string;
  children?: any;
  className?: string;
}) => (
  <motion.div
    className={props.className}
    style={{
      width: props.width,
      height: props.height,
      display: "flex",
      alignItems: props.yalign,
      justifyContent: props.xalign,
      ...props.style,
    }}
  >
    {props.children}
  </motion.div>
);
