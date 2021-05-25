import { CSSProperties } from "react";
import { EditJSONEntries } from "../data/manipulation";

//numbers of columns and rows
//columns and rows sizes are auto computed relative of the availanle space by css using fr size
export const Grid = (props: {
  rows?: number;
  columns?: number;
  style?: CSSProperties;
  children?: any[];
}) => {
  //make css grid style
  const ComputeGrid = () => {
    //store the style variables
    let newCSS = EditJSONEntries([["display", "grid"]], props.style || {});

    if (props.columns !== undefined) {
      newCSS = EditJSONEntries(
        [["gridTemplateColumns", "repeat(" + props.columns + ", 1fr)"]],
        newCSS
      );
    }

    if (props.rows !== undefined) {
      newCSS = EditJSONEntries(
        [["gridTemplateRows", "repeat(" + props.rows + ", 1fr)"]],
        newCSS
      );
    }

    return newCSS;
  };

  return <div style={ComputeGrid()}>{props.children}</div>;
};
