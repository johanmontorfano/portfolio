import React, { useEffect, useReducer, useState } from "react";
import { BottomBar } from "../components/bar";

import { SceneScript as SceneScript1 } from "./components/scene-1";
import { SceneScript as SceneScript2 } from "./components/scene-2";
import { SceneScript as SceneScript3 } from "./components/scene-3";
import { SceneScript as SceneScript4 } from "./components/scene-4";

import { Loader } from "../components/loader";
import { ComputeClassnames } from "./styles/styled";
import { Banner, BannerFlow } from "../components/banner";

import { ParallaxProvider } from "react-scroll-parallax";
import { UseLang } from "../modules/doc/lang";
import {
  BrowserRouter,
  NavLink,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { ResponsiveLink } from "../components/responsive/responsive-link";
import { CookiesPage } from "./pages/cookies";

export let PreloadedData: { [key: string]: any } = {};
const StyledIndexComponent = ComputeClassnames();

const CookiesBannerTranslation = UseLang({
  FR: `Ce site utilise des technologies pouvant porter atteinte à votre vie privée pour fonctionner, $link pour en savoir plus.`,
  US: `This website use technologies which may hurt your private life to work correctly, $link to learn more.`,
});
const CookiesRedirectTitle = UseLang({
  FR: "cliquez ici",
  US: "click here",
});

let cookieInfoDisplayed = false;

export const App = () => {
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);
  window.onload = function () {
    console.info("%s: data-loaded", new Date().getTime());
    setDataLoaded(true);
    document.body.style.setProperty("overflow", "initial");
  };

  useEffect(() => {
    if (!cookieInfoDisplayed) {
      BannerFlow.next({
        title: "analytics",
        content: (
          <div>
            {CookiesBannerTranslation.split("$link")[0]}{" "}
            <NavLink to="/cookies" style={{ color: "whitesmoke" }}>
              {CookiesRedirectTitle}
            </NavLink>{" "}
            {CookiesBannerTranslation.split("$link")[1]}
          </div>
        ),
        color: "black",
        duration: 5000,
      });
      cookieInfoDisplayed = true;
    }
  }, []);

  return (
    <BrowserRouter>
      <ParallaxProvider>
        {dataLoaded ? null : <Loader />}
        <StyledIndexComponent>
          <Banner />
          <Switch>
            <Route exact path={["/"]}>
              <SceneScript1 />
              <SceneScript2 />
              <SceneScript3 />
              <SceneScript4 />
            </Route>
            <Route exact path={["/cookies"]}>
              <CookiesPage />
            </Route>
            <Route>
              <Redirect to="/" />
            </Route>
          </Switch>
          <BottomBar />
        </StyledIndexComponent>
      </ParallaxProvider>
    </BrowserRouter>
  );
};
