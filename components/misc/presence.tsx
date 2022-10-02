import { JSX } from "solid-js";

/** Makes a callback when it gets visible on screen */
export function Presence(
  props: {
    callback: (visible: boolean) => void;
  } & JSX.HTMLAttributes<HTMLDivElement>
) {
  const intersectionObserver = new IntersectionObserver(
    (elements) => {
      elements.forEach((el) => {
        if (el.isIntersecting) props.callback(el.intersectionRatio === 1);
      });
    },
    {
      threshold: [.8, 1],
      root: null,
    }
  );
  return <div ref={(ref) => intersectionObserver.observe(ref)} {...props} />;
}
