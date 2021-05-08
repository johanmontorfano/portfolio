import { motion, MotionProps } from "framer-motion";
import { LayoutStyles } from "../../app/styles/styled/layouts";

//the VideoPlayer can get and apply every props of a motion element (initial, animate, whileHover,...)
export const VideoPlayer = (props: {
  video: string;
  MotionVideoStyle?: MotionProps;
}) => {
  return (
    <motion.video
      {...(!props.MotionVideoStyle
        ? LayoutStyles.VideoLayout
        : props.MotionVideoStyle)}
      autoPlay
      playsInline
      preload="true"
      loop
      muted
    >
      <motion.source
        src={props.video}
        {...(!props.MotionVideoStyle
          ? LayoutStyles.VideoLayout
          : props.MotionVideoStyle)}
      />
      Your browser doesn't support some features of the site :(
    </motion.video>
  );
};
