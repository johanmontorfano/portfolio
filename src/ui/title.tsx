import { HTMLAttributes } from "react";
import { EditJSONEntries } from "../data/manipulation";
//import style
import "./sass/title.scss";

export const Title = (props: HTMLAttributes<HTMLDivElement>) => (
  <div
    {...EditJSONEntries([["className", "title"]], props)}
  />
);
//editing json entry "className" on the title element to add "title" class