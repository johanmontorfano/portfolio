import { motion } from "framer-motion";
import {
  EditTitleLayoutStyle,
  LayoutStyles,
} from "../../app/styles/styled/layouts";
import { ResponsiveComponent } from "../../modules/responsive/responsive";
import { AnimatedAppear } from "../appear";

export const ResponsiveTitle = (props: { children: string }) => (
  <AnimatedAppear>
    <ResponsiveComponent
      style={LayoutStyles.TitleLayout.initial}
      mobile_style={EditTitleLayoutStyle.initialBlock([
        { edit: "textAlign", value: "center" },
      ])}
    >
      {props.children.split(" ").map((word, index) => (
        <ResponsiveComponent
          style={{ display: "flex" }}
          mobile_style={{ display: "flex", justifyContent: "center" }}
          key={index}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{
              scale: 1,
            }}
            className="big-font-size-current"
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
