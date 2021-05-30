import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Themed } from "../ui/theme";
import { Error404 } from "./pages/errors/404";
import { Footer } from "../ui/footer";
import { Separe } from "../ui/separe";
import { Loader } from "../ui/loader";

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
        <Footer />
      </Loader>
    </BrowserRouter>
  </Themed>
);
