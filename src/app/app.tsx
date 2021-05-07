import { BottomBar } from "../components/bar";

import { SceneScript as SceneScript1 } from "./components/scene-1";
import { SceneScript as SceneScript2 } from "./components/scene-2";
import { SceneScript as SceneScript3 } from "./components/scene-3";
import { SceneScript as SceneScript4 } from "./components/scene-4";

import { ComputeClassnames } from "./styles/styled";
import { Banner, BannerFlow } from "../components/banner";

import { Console } from "./pages/console";

import { ParallaxProvider } from "react-scroll-parallax";
import { UseLang } from "../modules/doc/lang";
import {
  BrowserRouter,
  NavLink,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { PrivacyPage } from "./pages/privacy";
import { CV } from "./pages/cv";
import React, { useEffect, useRef, useState } from "react";
import { Loader } from "../components/loader";

export let PreloadedData: { [key: string]: any } = {};
const StyledIndexComponent = ComputeClassnames();

const PrivacyBannerTranslation = UseLang({
  FR: `Ce site utilise des technologies pouvant porter atteinte à votre vie privée pour fonctionner, $link pour en savoir plus.`,
  US: `This website use technologies which may hurt your private life to work correctly, $link to learn more.`,
});
const PrivacyRedirectTitle = UseLang({
  FR: "cliquez ici",
  US: "click here",
});

export let pageLoaded = false;

export const App = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  window.onload = function () {
    setIsLoaded(true);
    console.info("%s: data-loaded", new Date().getTime());

    if (!pageLoaded) {
      BannerFlow.next({
        title: "analytics",
        content: (
          <div>
            {PrivacyBannerTranslation.split("$link")[0]}{" "}
            <NavLink to="/privacy" style={{ color: "whitesmoke" }}>
              {PrivacyRedirectTitle}
            </NavLink>{" "}
            {PrivacyBannerTranslation.split("$link")[1]}
          </div>
        ),
        color: "black",
        duration: 5000,
      });
      pageLoaded = true;
    }
  };

  useEffect(() => {
    let lastLocation = window.location.href;

    const interval = setInterval(() => {
      if (window.location.href !== lastLocation) {
        lastLocation = window.location.href;
        window.scrollTo(0, 0);
      }
    }, 10);

    return function cleanup() {
      clearInterval(interval);
    };
  }, []);

  return (
    <ParallaxProvider>
      <Loader loadState={isLoaded}>
        <BrowserRouter>
          <StyledIndexComponent>
            <Banner />
            <Switch>
              <Route exact path={["/"]}>
                <SceneScript1 />
                <SceneScript2 />
                <SceneScript3 />
                <SceneScript4 />
              </Route>
              <Route exact path={["/privacy"]}>
                <PrivacyPage />
              </Route>
              <Route path="/console">
                <Console />
              </Route>
              <Route path="/cv">
                <CV />
              </Route>
              <Route>
                <Redirect to="/" />
              </Route>
            </Switch>
            <BottomBar />
          </StyledIndexComponent>
        </BrowserRouter>
      </Loader>
    </ParallaxProvider>
  );
};
