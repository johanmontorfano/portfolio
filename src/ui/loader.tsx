import { useState } from "react";
import { Title } from "./title";
import { Fixed, Static, Sticky } from "./position";

import "./sass/loader.scss";

export const Loader = (props: { children: any }) => {
  //set the loading state, boolean
  const [loadingState, setLoadingState] = useState<boolean>(false);

  //fire event when the page is loaded and ready
  window.onload = () => {
    //update the loading state
    setLoadingState(true);
  };

  //renders the loader and the page
  return (
    <div>
    <div>{props.children}</div>
      <Fixed
        className={
          "background-depending-on-theme loader-interface " + loadingState
        }
      >
        <Title style={{ fontStyle: "italic" }} className="loader-title">Johan Montorfano</Title>
      </Fixed>
    </div>
  );
};
