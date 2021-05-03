import { motion, MotionProps } from "framer-motion";
import { useState } from "react";
import { LayoutStyles } from "../../app/styles/styled/layouts";
import { Parallax } from "react-scroll-parallax";

//the VideoPlayer can get and apply every props of a motion element (initial, animate, whileHover,...)

export const ImageElement = (props: {
  image: string;
  MotionImageStyle?: MotionProps;
}) => {
  const [IsVideoLoaded, setLoadState] = useState<boolean>(false);

  return (
      <motion.img
        {...(!props.MotionImageStyle
          ? LayoutStyles.ImageLayout
          : props.MotionImageStyle)}
        onLoadedData={() => setLoadState(true)}
        src={props.image}
      />
  );
};
