import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { LayoutStyles } from "../../app/styles/styled/layouts";

export const ResponsiveButton = (props: {
  handleClick?: () => void;
  children: any;
  dark?: boolean;
  tiny?: boolean;
  activate?: boolean;
}) => {
  const [hoverStatus, setHoverStatus] = useState<boolean>(false);
  const ButtonControls = useAnimation();

  useEffect(() => {
    if (props.activate !== undefined) {
      if (props.activate) ButtonControls.start("active");
      else if (!props.activate)
        ButtonControls.start(props.tiny ? "initialTiny" : "initial");
    } else ButtonControls.start(props.tiny ? "initialTiny" : "initial");
  }, [props.activate]);

  const handleHoverEvent = () => {
    setHoverStatus(!hoverStatus);

    if (props.activate === undefined)
      ButtonControls.start(
        hoverStatus ? (props.tiny ? "initialTiny" : "initial") : "active"
      );
  };
  const handleClickEvent = () => {
    ButtonControls.start("clicked");

    setTimeout(() => ButtonControls.start(props.tiny ? "initialTiny" : "initial"), 250)
    
  };

  return (
    <motion.div
      {...LayoutStyles.ButtonLayout}
      initial={props.tiny ? "initialTiny" : "initial"}
      className={
        props.tiny ? "tiny-font-size-current" : "normal-font-size-current"
      }
      animate={ButtonControls}
      onTap={() => {
        handleClickEvent();
        (props.activate && props.handleClick
          ? props.handleClick
          : props.activate === undefined && props.handleClick
          ? props.handleClick
          : () => {})();
      }}
      onHoverEnd={handleHoverEvent}
      onHoverStart={handleHoverEvent}
    >
      {props.children}
    </motion.div>
  );
};
