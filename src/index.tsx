import { render } from "react-dom";
import Cookies from "universal-cookie";
import { App } from "./app/";
import { handleNavigation } from "./scripts/navigate";

//import the global sass file
import "./ui/sass/global.sass";

export const CookieSesion = new Cookies();

//handling function to know if it's a redirect did with a navigate function
handleNavigation();

render(<App />, document.getElementById("app"));
