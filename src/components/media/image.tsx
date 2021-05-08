import { motion, MotionProps } from "framer-motion";
import { useState } from "react";
import { LayoutStyles } from "../../app/styles/styled/layouts";
import { Parallax } from "react-scroll-parallax";

//the VideoPlayer can get and apply every props of a motion element (initial, animate, whileHover,...)

export const ImageElement = (props: {
  image: string;
  MotionImageStyle?: MotionProps;
}) => {

  return (
      <motion.img
        {...(!props.MotionImageStyle
          ? LayoutStyles.ImageLayout
          : props.MotionImageStyle)}
        src={props.image}
      />
  );
};
