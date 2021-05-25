import { Container } from "./container";
import { useEffect, useState } from "react";
import { MoveScroller, ScrollFeature } from "../scripts/features";

import "./sass/loader.scss";

export const Loader = (props: { children: any }) => {
  const [boxClassnames, setBoxClassnames] = useState<string>("loading");

  useEffect(() => {
    MoveScroller(0,0);
    //disable scrolling during loading
    ScrollFeature(false);
  }, []);

  window.onload = () => {
    setBoxClassnames("loaded");
    setTimeout(() => {
      ScrollFeature(true);
      MoveScroller(0, 0);
    }, 2255);
  };

  return (
    <Container
      width={"100%"}
      height={"100vh"}
      style={{
        background: "var(--significative-theme-color)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      className={boxClassnames + "-container"}
    >
      <div className={boxClassnames}>{props.children}</div>
    </Container>
  );
};
