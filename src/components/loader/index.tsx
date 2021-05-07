import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { GetClassnameValue } from "../../app/styles/styled";

export const Loader = (props: {
  children: JSX.Element;
  loadState: boolean;
}) => {
  const AnimationControls = useAnimation();
  const [
    fictiveLoadedPercentage,
    setFictiveLoadedPercentage,
  ] = useState<number>(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (props.loadState) {
      for (let i = 0; i <= 100; i++) {
        setTimeout(() => {
          setFictiveLoadedPercentage(i);
          if (i === 100) {
            AnimationControls.start("loaded");
            document.body.style.setProperty("overflow", "auto");
          }
        }, 5 * i);
      }
    } else {
      AnimationControls.start("loads");
      setFictiveLoadedPercentage(0);
    }
  }, [props.loadState]);

  return (
    <div>
      <motion.div
        variants={{
          loads: {
            height: "100vh",
            width: "100%",
            background: "black",
            color: "whitesmoke",
            position: "absolute",
            top: 0,
            opacity: 1,
            zIndex: 1000,
            fontSize: "30vw",
            fontFamily: "Helvetica",
            fontWeight: parseInt(GetClassnameValue("semi-bold-font-weight")),
            display: "flex",
            alignItems: "flex-end",
          },
          loaded: {
            opacity: 0,
            zIndex: 0,
          },
        }}
        initial="loads"
        animate={AnimationControls}
      >
        {fictiveLoadedPercentage} %
      </motion.div>
      {props.children}
    </div>
  );
};
