import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { LayoutStyles } from "../../app/styles/styled/layouts";

export const ResponsiveButton = (props: {
  handleClick?: () => void;
  dark?: boolean;
  activate?: boolean;
  children: any;
}) => {
  const ButtonControls = useAnimation();

  useEffect(() => {
    if (props.activate !== undefined) {
      if (props.activate) ButtonControls.start("active");
      else if (!props.activate) ButtonControls.start("initial");
    } else ButtonControls.start("active");
  }, [props.activate]);

  return (
    <motion.div
      {...LayoutStyles.ButtonLayout}
      className="normal-font-size-current"
      animate={ButtonControls}
      onClick={
        props.activate && props.handleClick
          ? props.handleClick
          : props.activate === undefined && props.handleClick
          ? props.handleClick
          : () => {}
      }
    >
      {props.children}
    </motion.div>
  );
};
