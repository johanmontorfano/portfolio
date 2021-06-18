import { Themed, Separe, Footer, Loader } from "montorfano-utils";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Error404 } from "./pages/errors/404";

//rename importations because each component in pages should export a FC named Page
import { Page as Home } from "./pages/_";

export const App = () => (
  <Themed>
    <BrowserRouter>
      <Loader>
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
        <Footer linkLists={[]}/>
      </Loader>
    </BrowserRouter>
  </Themed>
);
