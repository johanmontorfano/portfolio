import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useIsVisible } from "react-is-visible";

//make appear animation
export const Appear = ({
  //thing to animate on appear
  children,
  //delay of appear, not required
  delay,
}: {
  children: any | any[];
  delay?: number;
}) => {
  //ref of the appear element
  const ref = useRef<any>();
  //store if the element is visible or not
  const isVisible = useIsVisible(ref);
  //store the appear delay
  //the appear delays update to 0 the first time the element is visible and if delay is defined
  //it prevents reappearing to long printing times
  const [transitionDelay, setDelay] = useState<number>(delay || 0);

  useEffect(() => {
    //update the delay to 0 if there is a props.delay defined and it's not 0
    if (delay !== undefined && transitionDelay !== 0 && isVisible)
      setTimeout(() => {
        setDelay(0);
      }, delay * 1000);
  }, [isVisible]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.9 }}
      transition={{
        duration: 0.4,
        delay: transitionDelay,
      }}
      ref={ref}
    >
      {children}
    </motion.div>
  );
};
