import { motion } from "framer-motion";
import React from "react";
import { LayoutStyles } from "../../app/styles/styled/layouts";

export const ResponsiveInput = (props: {
  value: string;
  dispatcher: React.Dispatch<React.SetStateAction<string>>;
  dark?: boolean;
  placeholder?: string;
}) => (
  <motion.input
    className="normal-font-size-current"
    placeholder={props.placeholder || "Write here..."}
    value={props.value}
    onChange={(e) => props.dispatcher(e.target.value)}
    initial={LayoutStyles.InputLayout.initial}
  />
);
