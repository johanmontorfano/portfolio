import { useEffect } from "react";
import { Mesh, Scene } from "three";
import { JSONToArray } from "../../data/manipulation";
import { ThreeContext, ThreeMaterial, ThreeShape } from "./context";

export const ThreeMesh = (props: {
  geometry: ThreeShape;
  material: ThreeMaterial;
}) => {
  const mesh = new Mesh(...JSONToArray(props));

  return (
    <ThreeContext.Consumer>
      {(value) => {
        value.scene.add(mesh);

        return <div />;
      }}
    </ThreeContext.Consumer>
  );
};
