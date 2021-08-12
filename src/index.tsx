import { render } from "react-dom";
import Cookies from "universal-cookie";
import { App } from "./app/";
import { RewardsSubject } from "./app/components/rewards";

export const CookieSesion = new Cookies();

// declaration for the reward "5minutesonthesite"
setTimeout(() => RewardsSubject.next("5minutesonthesite"), 300000);

render(<App />, document.getElementById("app"));
