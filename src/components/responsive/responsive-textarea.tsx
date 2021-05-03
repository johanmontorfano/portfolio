import { motion } from "framer-motion";
import React from "react";
import {
  EditTextareaLayoutStyle,
  LayoutStyles,
} from "../../app/styles/styled/layouts";
import { ResponsiveChilds } from "../../modules/responsive/childrens";

export const ResponsiveTextArea = (props: {
  value: string;
  dispatcher: React.Dispatch<React.SetStateAction<string>>;
  dark?: boolean;
  placeholder?: string;
}) => (
  <ResponsiveChilds>
    <motion.textarea
      className="normal-font-size-current"
      placeholder={props.placeholder || "Write here..."}
      value={props.value}
      onChange={(e) => props.dispatcher(e.target.value)}
      rows={12}
      initial={LayoutStyles.TextareaLayout.initial}
    />
    <motion.textarea
      className="normal-font-size-current"
      placeholder={props.placeholder || "Write here..."}
      value={props.value}
      onChange={(e) => props.dispatcher(e.target.value)}
      rows={5}
      initial={LayoutStyles.TextareaLayout.initial}
    />
  </ResponsiveChilds>
);

// width, padding
