import { Motion } from "@motionone/solid";
import { JSX } from "solid-js";
import { useTimedOutValue } from "../../hooks/timeout";

/** bottom appear with a delay
 * @param delay in milliseconds
 */
export function BottomAppear(props: { children: JSX.Element; delay?: number }) {
  const showTimeout = useTimedOutValue(props.delay || 450);

  return (
    <Motion.div
      initial={{ opacity: 0 }}
      animate={{ y: showTimeout() ? 0 : 15, opacity: showTimeout() ? 1 : 0 }}
    >
      {props.children}
    </Motion.div>
  );
}
