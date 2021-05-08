import { BottomBar } from "../components/bar";
import { ComputeClassnames } from "./styles/styled";
import { Banner } from "../components/banner";
import { Console } from "./pages/console";
import { ParallaxProvider } from "react-scroll-parallax";
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import { PrivacyPage } from "./pages/privacy";
import { CV } from "./pages/cv";
import { useEffect, useState } from "react";
import { Loader } from "../components/loader";
import { _ } from "./pages/_";
import { useHistory } from "react-router-dom";

export let PreloadedData: { [key: string]: any } = {};
const StyledIndexComponent = ComputeClassnames();


export const App = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  window.onload = function () {
    //change load state to tell the Loader that the content is loaded.
    setIsLoaded(true);
    console.info("%s: data-loaded", new Date().getTime());
  };

  useEffect(() => {
    //disable scroll bar until load is finished if the load is not finished yet
    if (!isLoaded) document.body.style.setProperty("overflow", "hidden");
  }, []);

  return (
    <div style={{ maxWidth: "100vw" }}>
      <Loader loadState={isLoaded}>
        <ParallaxProvider>
          <BrowserRouter>
            <Banner />
            <StyledIndexComponent>
              <Switch>
                <Route exact path={["/"]}>
                  <_ />
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
        </ParallaxProvider>
      </Loader>
    </div>
  );
};
