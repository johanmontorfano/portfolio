/* @refresh reload */
import { Router, useRoutes } from "solid-app-router";
import { lazy } from "solid-js";
import { useDynamicIcon } from "../hooks/rel-icon";
import emailjs from "@emailjs/browser";

import "../scripts/firebase-init";

import "../sass/shared/button.scss";
import "../sass/shared/fonts.scss";
import "../sass/shared/global.scss";
import "../sass/shared/mixins.scss";
import "../sass/shared/placers.scss";
import "../sass/shared/svg.scss";

emailjs.init("99HG3BGXyFMTd-jj2");

export default function () {
  useDynamicIcon("/johan-montorfano-white.png", "/johan-montorfano-black.png");
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