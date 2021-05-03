import { motion } from "framer-motion";
import { GithubSVG } from "../../svg/github-svg";
import { ResponsiveLink } from "../responsive/responsive-link";
import { ResponsiveText } from "../responsive/responsive-text";

export const BottomBar = () => {
  return (
    <motion.div
      initial={{
        width: "98%",
        backgroundColor: "whitesmoke",
        padding: "1vw",
      }}
    >
      <ul>
        <li>
          <ResponsiveLink redirectTo="https://github.com/franndjoo/portfolio-v3">
            See the code on GitHub.
          </ResponsiveLink>
        </li>
        <li>
          <ResponsiveLink redirectTo="mailto:johaaan.m@icloud.com">
            Report a problem.
          </ResponsiveLink>
        </li>
      </ul>
    </motion.div>
  );
};
