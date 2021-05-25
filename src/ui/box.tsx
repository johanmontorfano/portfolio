import { motion, MotionProps } from "framer-motion";
import { CSSProperties } from "react";

//for 2d box
export const Box = ({
  x,
  y,
  motionProps,
  className,
  style,
  children,
  events
}: {
  x: number | string;
  y: number | string;
  motionProps?: MotionProps;   
  className?: string;
  style?: CSSProperties;
  children?: any;
  events?: {
    onClick: () => void
  }
}) => {
  return (
    <motion.div
      className={className !== undefined? className + " box" : "box"}
      style={{
        width: x,
        height: y,
        ...style,
      }}
      {...motionProps}
      {...events}
    >
      {children}
    </motion.div>
  );
};
