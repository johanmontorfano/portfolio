import { HTMLAttributes } from "react";
import { EditJSONEntries } from "../data/manipulation";
//import style
import "./sass/button.scss";

//the "enabled" or "disabled" class can be passed to the Button props to simulate active or passive state
//the "process" class will make the button unavailable and make a style which organically means that is something is going on
export const Button = (props: HTMLAttributes<HTMLDivElement>) => (
  <div
    {...EditJSONEntries(
      [
        ["className", "button " + props.className],
        [
          "onClick",
          (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            //the component doesn't have a class which significates that the component is disabled
            if (
              props.className?.indexOf("disabled") === -1 &&
              props.className?.indexOf("process") === -1 &&
              props.onClick !== undefined
            )
              props.onClick(e);
          },
        ],
      ],
      props
    )}
  />
);
//editing json entry "className" on the button element to add "button" class
