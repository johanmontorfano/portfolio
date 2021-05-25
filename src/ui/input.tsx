import { motion } from "framer-motion";
import { CSSProperties, useRef } from "react";
import { visitFunctionBody } from "typescript";
import { EditJSONEntries } from "../data/manipulation";

import "./sass/textarea.scss";

export const Input = (props: {
  style?: CSSProperties;
  onChange?: (entry: any) => void;
  placeholder?: string;
  value?: any;
  type?: string;
}) => (
  <motion.input className="textarea background-depending-on-theme" {...props} />
);

export const TextArea = (props: {
  style?: CSSProperties;
  onChange?: (entry: any) => void;
  placeholder?: string;
  value?: any;
  type?: string;
  rows?: number;
  columns?: number;
}) => {
  return (
    <motion.textarea
      className="textarea background-depending-on-theme"
      {...EditJSONEntries([["shouldUseAutoGrow", undefined]], props)}
    />
  );
};
