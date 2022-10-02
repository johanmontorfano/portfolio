/* @refresh reload */
import { render } from "solid-js/web";
import { Router, useRoutes } from "solid-app-router";
import { lazy } from "solid-js";
import emailjs from "@emailjs/browser";

import "../scripts/firebase-init";

import "../sass/shared/button.scss";
import "../sass/shared/fonts.scss";
import "../sass/shared/global.scss";
import "../sass/shared/mixins.scss";
import "../sass/shared/placers.scss";
import "../sass/shared/svg.scss";

emailjs.init("99HG3BGXyFMTd-jj2");

function Main() {
  const Routes = useRoutes([
    {
      path: "/",
      component: lazy(() => import("./pages/_")),
    },
  ]);

  return (
    <Router>
      <Routes />
    </Router>
  );
}

render(() => <Main />, document.getElementById("root") as HTMLElement);
