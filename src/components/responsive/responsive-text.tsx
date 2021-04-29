import { motion } from "framer-motion";
import { StyleVariables } from "../../app/styles/data/variables";
import { ResponsiveComponent } from "../../modules/responsive/responsive";
import { AnimatedAppear } from "../appear";

export const ResponsiveText = (props: {
  children: string;
  animated?: boolean;
}) => (
  <AnimatedAppear>
    <ResponsiveComponent
      style={{
        fontSize: StyleVariables.values.font_size.text.default,
        fontFamily: "Helvetica",
      }}
      mobile_style={{
        fontSize: StyleVariables.values.font_size.text.mobile,
        fontFamily: "Helvetica",
      }}
    >
      {props.animated ? (
        <ResponsiveComponent
          style={{ userSelect: "none", display: "flex", flexWrap: "wrap" }}
          mobile_style={{
            userSelect: "none",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {props.children.split(" ").map((word) => (
            <div style={{ marginLeft: "1%" }}>
              <motion.div
                animate={{ color: "#000000", scale: 1 }}
                whileHover={{
                  scale: 0.9,
                  color: StyleVariables.colors.text.whileHover2,
                }}
              >
                {word}
              </motion.div>
            </div>
          ))}
        </ResponsiveComponent>
      ) : (
        <ResponsiveComponent
          style={{ userSelect: "none" }}
          mobile_style={{ userSelect: "none", textAlign: "center" }}
        >
          {props.children}
        </ResponsiveComponent>
      )}
    </ResponsiveComponent>
  </AnimatedAppear>
);
