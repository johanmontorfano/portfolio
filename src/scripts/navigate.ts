import { setToken, tokenId } from "../gcp/scripts/authentication";
import { CookieSesion } from "../";
import { AvoidEmpty } from "../data/manipulation";

//this function handles navigation methods designed for johanmontorfano.com tools
//this function is also in to.johanmontorfano.com script to have seamless functions definition

export const navigate = (url: string) => {
  //handle actions designed for johanmontorfano.com if the url correspond to a custom redirection to a johanmontorfano.com url
  //the redirect action can be designed using to.johanmontorfano.com/settings{app: applicationId} from external
  //the redirect action can be designed using local-subdomain-w/settings{"app": "applicationId", "params"?: "param-string"} from internal
  //                         translate it by: local-subdomain with-settings{app-to-go: applicationId}
  //IMPORTANT: CONSIDER USING '' to quote the text on the call function and "" to quote the args

  //statement if navigation is from a domain or a subdomain in johanmontofano.com
  if (url.indexOf("local-subdomain-w/") > -1) {
    //parse the data given on the url
    const settings = JSON.parse(
      url.split("local-subdomain-w/")[1].replace("settings", "")
    );

    //add the token of the current session in cookies
    CookieSesion.set("token", tokenId, { domain: ".johanmontorfano.com" });
    //add a marker to mark that there is a redirect handled by to.johanmontorfano.com
    CookieSesion.set("is-redirected-from-navigate-handler-function", true, {
      domain: ".johanmontorfano.com",
    });

    //redirect to the target app
    window.location.assign(
      "https://" +
        settings.app +
        ".johanmontorfano.com/" +
        AvoidEmpty(settings.params, "")
    );
  }
  //statement if nvaigation is from an external domain
  else if (url.indexOf("to.johanmontorfano.com") > -1) {
    //parse the data given on the url
    const settings = JSON.parse(
      url.split("to.johanmontorfano.com/")[1].replace("settings", "")
    );

    //add the token of the current session in cookies
    //new-session token tells the app to show a login popup
    CookieSesion.set("token", "new-session", {
      domain: ".johanmontorfano.com",
    });

    //add a marker to mark that there is a redirect handled by to.johanmontorfano.com
    CookieSesion.set("is-redirected-from-navigate-handler-function", true, {
      domain: ".johanmontorfano.com",
    });

    //redirect to the target app
    window.location.assign("https://" + settings.app + ".johanmontorfano.com");
  }
  //in case it's not a johanmontorfano's website
  else {
    window.location.assign(url);
  }
};

//handle navigate function is for johanmontorfano' apps, this function should not be showed in to.johanmontorfano.com source code
//handle navigate function should be at the top of the index.tsx file to make handling at the first load of the page (meaning the whole domain)
export const handleNavigation = () => {
  //handle actions if it's a redirection did with a navigate function
  if (CookieSesion.get("is-redirect-from-navigate-handler-function")) {
    //set token provided by cookies
    setToken(CookieSesion.get("token"));
  }
};
