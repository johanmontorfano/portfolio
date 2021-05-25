import { motion } from "framer-motion";
import { MutableRefObject } from "react";
import { CSSProperties } from "react";
//import style
import "./sass/media.scss";

export const Image = ({
  source,
  style,
  ref
}: {
  source: string;
  style?: CSSProperties;
  ref?: MutableRefObject<any>
}) => {
  return (
    <motion.img
      drag
      dragElastic={0.2}
      dragConstraints={{ left: 1, top: 1, bottom: 1, right: 1 }}
      className="image"
      src={source}
      style={style}
      ref={ref}
    />
  );
};
