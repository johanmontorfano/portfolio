import { render } from "react-dom";
import Cookies from "universal-cookie";
import { App } from "./app/";

export const CookieSesion = new Cookies();

render(<App />, document.getElementById("app"));
