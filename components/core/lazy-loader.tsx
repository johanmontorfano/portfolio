import { Motion } from "@motionone/solid";
import { createSignal, lazy, onMount, Show } from "solid-js";
import { render } from "solid-js/web";
import JohanMontorfano from "../../svg/johan-montorfano.svg";

/** This component efficiently loads the page, it results on a reduced loading time */
function LazyLoader() {
  /** Contains data about the loading state, etc... */
  const [itemLoaded, updateItemLoadingState] = createSignal(false);
  const [Item, updateItem] = createSignal(<div />);

  /** Start loading the page */
  onMount(() => {
    import("../../routes/router").then((item) => {
      updateItem(item.default);
      updateItemLoadingState(true);
    });
  });

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        "justify-content": "center",
        "align-items": "center",
      }}
    >
      <Motion.div
        initial={{
          opacity: 1,
          position: "absolute",
          "z-index": 50,
          width: "100vw",
          height: "100vh",
          background: "var(--background)",
          display: "flex",
          "justify-content": "center",
          "align-items": "center"
        }}
        animate={{
          opacity: itemLoaded() ? 0 : 1,
          visibility: itemLoaded() ? "hidden" : "visible",
        }}
        transition={{
          visibility: {
            delay: 1,
          },
          opacity: {
            duration: 1,
          },
        }}
      >
        <JohanMontorfano
          class="fill-stroke"
          width="50vw"
          height="50vw"
          style={{ "max-width": "350px" }}
        />
      </Motion.div>
      <Show when={itemLoaded()}>
        <Item />
      </Show>
    </div>
  );
}
render(() => <LazyLoader />, document.getElementById("root") as HTMLElement);
