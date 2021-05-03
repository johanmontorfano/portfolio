import React, { useEffect, useReducer, useState } from "react";
import { BottomBar } from "../components/bottom-bar";

import { SceneScript as SceneScript1 } from "./components/scene-1";
import { SceneScript as SceneScript2 } from "./components/scene-2";
import { SceneScript as SceneScript3 } from "./components/scene-3";
import { SceneScript as SceneScript4 } from "./components/scene-4";

import { Loader } from "../components/loader";
import { ComputeClassnames } from "./styles/styled";
import { Banner } from "../components/banner";

import {ParallaxProvider} from "react-scroll-parallax"

export let PreloadedData: { [key: string]: any } = {};
const StyledIndexComponent = ComputeClassnames();

export const App = () => {
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);
  window.onload = function () {
    console.info("%s: data-loaded", new Date().getTime());
    setDataLoaded(true);
    document.body.style.setProperty("overflow", "initial");
  };

  return (
    <ParallaxProvider>
      <StyledIndexComponent>
        <Banner />
        {dataLoaded ? null : <Loader />}
        <SceneScript1 />
        <SceneScript2 />
        <SceneScript3 />
        <SceneScript4 />
        <BottomBar />
      </StyledIndexComponent>
    </ParallaxProvider>
  );
};
