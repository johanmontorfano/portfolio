import { CSSProperties, HTMLAttributes } from "react";
import { EditJSONEntries } from "../data/manipulation";

interface LayerParams {
  layer: number;
}

interface CustomLayerType extends LayerParams, HTMLAttributes<HTMLDivElement> {}

export const Layer = (props: CustomLayerType) => {
  //a layer is to superpose multiple elements

  return (
    <div
      {...EditJSONEntries(
        [
          [
            "style",
            {
              width: "100%",
              height: "100%",
              position: "absolute",
              left: 0,
              top: 0,
              zIndex: props.layer,
              ...props.style,
            },
          ],
        ],
        props
      )}
    >
      {props.children}
    </div>
  );
};
