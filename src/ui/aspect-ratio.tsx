import { MotionProps } from "framer-motion";
import { CSSProperties, useState } from "react";
import { compressUnit, computeRatio } from "../scripts/aspect-ratio";
import { Box } from "./box";

export const AspectRatio = (props: {
  ratio: number;
  x?: string | number;
  y?: string | number;
  style?: CSSProperties;
  className?: string;
  motionProps?: MotionProps;
  children?: any;
}) => {
  //x dimension size
  const [dimX, setDimX] = useState<string | number>(
    props.x || compressUnit(computeRatio(props.ratio, props.x, props.y))
  );
  //y dimension size
  const [dimY, setDimY] = useState<string | number>(
    props.y || compressUnit(computeRatio(props.ratio, props.x, props.y))
  );

  return (
    <Box x={dimX} y={dimY} style={props.style} motionProps={props.motionProps} className={props.className}>
      {props.children}
    </Box>
  );
};
