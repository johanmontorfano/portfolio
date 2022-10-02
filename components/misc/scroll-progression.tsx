import { createSignal, JSX, onMount } from "solid-js";
import { useScroll } from "../../hooks/scroll";

/** This component gives the scroll progression of itself to it's childs */
export function ScrollProgression(props: {
  children: (props: { progression: number }) => JSX.Element;
  axis?: "x" | "y";
  /** progression will not be bounded between 0 and 1 */
  preventBoundariesUse?: boolean;
}) {
  let scrollElementRef: HTMLDivElement | null = null;
  const [scrollProgression, updateScrollProgression] = createSignal(0);

  onMount(() => {
    useScroll(scrollElementRef as HTMLElement, (top, height) => {
      if(props.axis === "y") updateScrollProgression(top > 0 && !props.preventBoundariesUse ? 0 : -(top + 1) > height && !props.preventBoundariesUse ? 1 : -(top + 1) / height);
      else updateScrollProgression(top / height > 1 && !props.preventBoundariesUse ? 1 : top / height < -1 && !props.preventBoundariesUse ? -1 : top / height * -1)
    }, props.axis);
  });

  return (
    <div ref={(ref) => (scrollElementRef = ref)}>
      <props.children progression={scrollProgression()} />
    </div>
  );
}
