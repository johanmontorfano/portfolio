import React from "react";
import { StyleVariables } from "../../app/styles/data/variables";
import { ResponsiveChilds } from "../../modules/responsive/childrens";
import { AnimatedAppear } from "../appear";

export const ResponsiveInput = (props: {
  value: string;
  dispatcher: React.Dispatch<React.SetStateAction<string>>;
  dark?: boolean;
  placeholder?: string;
}) => (
  <ResponsiveChilds>
    <input
      placeholder={props.placeholder || "Write here..."}
      value={props.value}
      onChange={(e) => props.dispatcher(e.target.value)}
      style={{
        outline: "none",
        width: "87.5%",
        resize: "none",
        height: "1vh",
        padding: "2.5%",
        fontFamily: "Helvetica",
        fontSize: StyleVariables.values.font_size.text.default,
        borderRadius: StyleVariables.values.radius.shortRadius,
        background: props.dark ? "black" : "whitesmoke",
        border: "none",
        boxShadow: "0px 0px 20px 1px rgba(0,0,0,0.6)",
        color: props.dark ? "white" : "black",
      }}
    />
    <input
      placeholder={props.placeholder || "Write here..."}
      value={props.value}
      onChange={(e) => props.dispatcher(e.target.value)}
      style={{
        outline: "none",
        width: "90%",
        height: "1vh",
        resize: "none",
        fontFamily: "Helvetica",
        fontSize: StyleVariables.values.font_size.text.mobile,
        borderRadius: StyleVariables.values.radius.shortRadius,
        padding: "3vh",
        background: props.dark ? "black" : "whitesmoke",
        border: "none",
        boxShadow: "0px 0px 20px 1px rgba(0,0,0,0.6)",
        color: props.dark ? "white" : "black",
      }}
    />
  </ResponsiveChilds>
);
