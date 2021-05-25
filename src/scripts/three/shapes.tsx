import { BoxGeometry, TorusGeometry } from "three";
import { JSONToArray } from "../../data/manipulation";

export const Box = (args: {
  width: number;
  height: number;
  depth: number;
  widthSegments?: number;
  heightSegments?: number;
  depthSegments?: number;
}) => {
  //geometry is stored here
  const geometry = new BoxGeometry(...JSONToArray(args));

  return geometry;
};

export const Torus = (args: {
  radius: number;
  tube: number;
  radialSegments: number;
  tubularSegments?: number;
  arc?: number;
}) => {
  //geometry is stored here
  return new TorusGeometry(...JSONToArray(args));
};
