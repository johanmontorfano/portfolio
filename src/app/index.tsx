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
        <Footer
          columns={[
            {
              name: "Social networks",
              entries: [
                {
                  name: "Instagram",
                  path: "instagram.com/franndjoo",
                },
                {
                  name: "Snapchat",
                  path: "snapchat.com/add/snaapdjoo",
                },
                {
                  name: "Twitter",
                  path: "twitter.com/franndjoo",
                },
              ],
            },
            {
              name: "Deeper about this website :)",
              entries: [
                {
                  name: "The code",
                  path: "github.com/franndjoo/portfolio",
                },
                {
                  name: "The blog page",
                  path: 'local-subdomain-w/settings{"app": "blog", "params": "/about-this-website"}',
                },
              ],
            },
            {
              name: "Subdomains",
              entries: [
                {
                  name: "Blog",
                  path: 'local-subdomain-w/settings{"app":"blog"}',
                },
                {
                  name: "Todos",
                  path: 'local-subdomain-w/settings{"app":"todo-cards"}',
                },
                {
                  name: "Article Editor",
                  path: 'local-subdomain-w/settings{"app": "article-editor"}',
                },
                {
                  name: "Accounting",
                  path: 'local-subdomain-w/settings{"app": "accounting"}',
                },
              ],
            },
          ]}
        />
      </Loader>
    </BrowserRouter>
  </Themed>
);
