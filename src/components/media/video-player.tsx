import { motion, MotionProps } from "framer-motion";
import { useState } from "react";
import { StyleVariables } from "../../app/styles/data/variables";

//the VideoPlayer can get and apply every props of a motion element (initial, animate, whileHover,...)
export const VideoPlayer = (props: {
  video: string;
  MotionVideoStyle?: MotionProps;
}) => {
  const [IsVideoLoaded, setLoadState] = useState<boolean>(false);

  return (
    <motion.video
      {...(!props.MotionVideoStyle
        ? {
            initial: {
              objectFit: "cover",
              display: "block",
              width: "50%",
              borderRadius: StyleVariables.values.radius.shortRadius,
            },
          }
        : props.MotionVideoStyle)}
      onLoadedData={() => setLoadState(true)}
      autoPlay
      playsInline
      loop
      muted
    >
      <motion.source src={props.video} />
      Your browser doesn't support some features of the site :(
    </motion.video>
  );
};
