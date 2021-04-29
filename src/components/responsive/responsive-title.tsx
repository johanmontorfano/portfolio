import { motion } from "framer-motion";
import React from "react";
import { Tween } from "react-gsap";
import { StyleVariables } from "../../app/styles/data/variables";
import { ResponsiveComponent } from "../../modules/responsive/responsive";
import { AnimatedAppear } from "../appear";

export const ResponsiveTitle = (props: { children: string }) => (
  <AnimatedAppear>
    <ResponsiveComponent
      style={{
        fontSize: StyleVariables.values.font_size.title.default,
        fontFamily: "Helvetica",
        fontWeight: StyleVariables.values.weight.title,
        lineHeight: 1,
        whiteSpace: "pre-line",
        cursor: "default",
        userSelect: "none",
        background: "webkit-linear-gradient(#eee, #333)",
        WebkitBackgroundClip: "text",
        WebkitBackdropFilter: "transparent",
      }}
      mobile_style={{
        fontSize: StyleVariables.values.font_size.title.mobile,
        fontFamily: "Helvetica",
        fontWeight: StyleVariables.values.weight.title,
        lineHeight: 1,
        textAlign: "center",
        whiteSpace: "pre-line",
        cursor: "default",
        userSelect: "none",
      }}
    >
      {props.children.split(" ").map((word) => (
        <ResponsiveComponent
          style={{ display: "flex" }}
          mobile_style={{ display: "flex", justifyContent: "center" }}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{
              scale: 1,
            }}
          >
            <div
              style={{
                backgroundImage:
                  "linear-gradient(45deg, rgba(255,106,0,1) 0%, rgba(255,235,0,1) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {word}
            </div>
          </motion.div>
        </ResponsiveComponent>
      ))}
    </ResponsiveComponent>
  </AnimatedAppear>
);
