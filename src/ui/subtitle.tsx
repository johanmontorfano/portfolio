import { HTMLAttributes } from "react";
import { EditJSONEntries } from "../data/manipulation";
//import style
import "./sass/subtitle.scss";

export const Subtitle = (props: HTMLAttributes<HTMLDivElement>) => (
  <div
    {...EditJSONEntries([["className", "subtitle"]], props)}
  />
);
//editing json entry "className" on the subtitle element to add "subtitle" class