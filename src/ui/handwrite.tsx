import { HTMLAttributes } from "react";
import { EditJSONEntries } from "../data/manipulation";
//import style
import "./sass/handwrite.scss";

export const Handwrite = (props: HTMLAttributes<HTMLDivElement>) => (
  <div
    {...EditJSONEntries([["className", "handwrite"]], props)}
  />
);
//editing json entry "className" on the text element to add "handwrite" class