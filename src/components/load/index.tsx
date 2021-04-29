import { motion } from "framer-motion";
import { useState } from "react";
import { StyleVariables } from "../../app/styles/data/variables";
import { ResponsiveChilds } from "../../modules/responsive/childrens";
import { ResponsiveComponent } from "../../modules/responsive/responsive";
import { ResponsiveSubtitle } from "../responsive/responsive-subtitle";
import { ResponsiveTitle } from "../responsive/responsive-title";

export const LoadInterface = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        top: 0,
        zIndex: 101,
        background: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex" }}>
        {"The page is loading.".split(" ").map((word, i, arr) => {
          const delay = 0.2 * arr.length + 0.2 * i;

          return (
            <motion.div
              initial={{
                scale: 1,
                opacity: 1,
                marginLeft: i > 0? "2%": "0%",
                userSelect: "none"
              }}
              animate={{
                scale: [1, 1.1, 0.9, 1],
                opacity: 1,
                translateY: "0%",
              }}
              transition={{
                repeat: Infinity,
                duration: 0.5,
                easings: ["easeInOut"],
                times: [0, 0.33, 0.66, 1],
                delay: 0.25 * i,
                repeatDelay: 0.25 * i + (arr.length - i) * 0.25,
              }}
            >
              <ResponsiveSubtitle>{word}</ResponsiveSubtitle>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
