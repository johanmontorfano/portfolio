import { motion } from "framer-motion";
import { ResponsiveLink } from "../responsive/responsive-link";

export const BottomBar = () => {
  return (
    <motion.div initial={{ width: "98%", backgroundColor: "whitesmoke", color: "white", padding: "1vw"}}>
      <ResponsiveLink redirectTo="https://github.com/franndjoo/portfolio-v3">
        See the code on GitHub
      </ResponsiveLink>
    </motion.div>
  );
};
