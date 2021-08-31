import {
  Separe,
  Footer,
  Loader,
  MontorfanoUtilsProvider,
} from "montorfano-utils";
import { useEffect } from "react";
import { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Error404 } from "./pages/errors/404";
import { GetFooterLinks, LinkListProp } from "../gcp/scripts/get-footer-links";

//rename importations because each component in pages should export a FC named Page
import { Page as Home } from "./pages/_";
import { RewardInterface } from "./components/rewards";

export const App = () => {
  //this hook saves the linklist
  const [linkLists, setLinkLists] = useState<LinkListProp>([]);

  //this init the load from firebase
  useEffect(() => {
    GetFooterLinks().then((links) => setLinkLists(links));
  }, []);

  return (
    <MontorfanoUtilsProvider>
        <BrowserRouter>
          <Loader>
            <RewardInterface />
            <Switch>
              <Route exact path={["/"]}>
                <Home />
              </Route>
              <Route>
                <Error404 />
              </Route>
            </Switch>
            <Separe />
            <Separe />
            <Footer linkLists={linkLists} />
          </Loader>
        </BrowserRouter>
    </MontorfanoUtilsProvider>
  );
};
