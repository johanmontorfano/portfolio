import { HTMLAttributes } from "react";
import { EditJSONEntries } from "../data/manipulation";
//import style
import "./sass/text.scss";

export const Text = (props: HTMLAttributes<HTMLDivElement>) => (
  <div
    {...EditJSONEntries([["className", "text"]], props)}
  />
);
//editing json entry "className" on the text element to add "text" class