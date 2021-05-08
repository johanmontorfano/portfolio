import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { GetClassnameValue } from "../../app/styles/styled";
import { UseLang } from "../../modules/doc/lang";
import { BannerFlow } from "../banner";
import { NavLink } from "react-router-dom";

const PrivacyBannerTranslation = UseLang({
  FR: `Ce site utilise des technologies pouvant porter atteinte à votre vie privée pour fonctionner, $link pour en savoir plus.`,
  US: `This website use technologies which may hurt your private life to work correctly, $link to learn more.`,
});
const PrivacyRedirectTitle = UseLang({
  FR: "cliquez ici",
  US: "click here",
});

export const Loader = (props: {
  children: JSX.Element;
  loadState: boolean;
}) => {
  const LoaderControls = useAnimation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (props.loadState) {
      LoaderControls.start("done").then(() => {
        document.body.style.setProperty("overflow", "auto");
        BannerFlow.next({
          title: "privacy",
          content: (
            <div>
              {PrivacyBannerTranslation.split("$link")[0]}{" "}
              <NavLink to="/privacy" style={{ color: "whitesmoke" }}>
                {PrivacyRedirectTitle}
              </NavLink>{" "}
              {PrivacyBannerTranslation.split("$link")[1]}
            </div>
          ),
          color: "black",
          duration: 7500,
        });
      });
    } else {
      LoaderControls.start("default");
    }
  }, [props.loadState]);

  return (
    <div>
      <motion.div
        variants={{
          default: {
            height: "100vh",
            width: "100%",
            background: "black",
            color: "whitesmoke",
            position: "fixed",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            top: "0vh",
            opacity: 1,
            zIndex: 1000,
            fontSize: "5vw",
            fontFamily: "Helvetica",
            fontStyle: "italic",
            fontWeight: parseInt(GetClassnameValue("semi-bold-font-weight")),
          },
          done: {
            top: "-100vh",
          },
        }}
        initial="default"
        animate={LoaderControls}
        transition={{
          duration: 0.5,
        }}
      >
        <motion.div
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{
            repeat: Infinity,
            repeatDelay: 0.1,
            easings: [0, 0.5, 1],
          }}
        >
          www.johanmontorfano.com
        </motion.div>
      </motion.div>
      {props.children}
    </div>
  );
};
