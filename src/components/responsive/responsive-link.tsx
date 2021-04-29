import { motion } from "framer-motion";
import { StyleVariables } from "../../app/styles/data/variables";
import { ResponsiveComponent } from "../../modules/responsive/responsive";
import { AnimatedAppear } from "../appear";

export const ResponsiveLink = (props: {
  children: string;
  redirectTo: string;
  animated?: boolean;
}) => (
  <AnimatedAppear>
    <div onClick={() => window.location.assign(props.redirectTo)}>
      <ResponsiveComponent
        style={{
          fontFamily: "Helvetica",
          color: StyleVariables.colors.link.default,
        }}
        mobile_style={{
          fontFamily: "Helvetica",
          color: StyleVariables.colors.link.default,
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
            <motion.div
              whileHover={{ cursor: "pointer", textDecoration: "underline" }}
            >
              {props.children}
            </motion.div>
          </ResponsiveComponent>
        )}
      </ResponsiveComponent>
    </div>
  </AnimatedAppear>
);
