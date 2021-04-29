import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { Subject } from "rxjs";
import { StyleVariables } from "../../app/styles/data/variables";
import { ResponsiveDescription } from "../responsive/responsive-description";
import { ResponsiveText } from "../responsive/responsive-text";
import { BannerFlowEntry } from "./types";

export const BannerFlow = new Subject<BannerFlowEntry>();

export const Banner = () => {
  const motionControls = useAnimation();
  const [
    lastBannerFlowPackage,
    setBannerFlowPackage,
  ] = useState<BannerFlowEntry>();

  useEffect(() => {
    BannerFlow.subscribe((pushedBannerContent) => {
      motionControls.start("noBanner")
      setBannerFlowPackage(pushedBannerContent);
      motionControls.start("banner");

      setTimeout(() => {
        setBannerFlowPackage(undefined);
        motionControls.start("noBanner");
      }, pushedBannerContent.duration);
    });
  }, []);

  return (
    <motion.div
      animate={motionControls}
      variants={{
        noBanner: {
          width: "100%",
          height: "0vh",
          background: "black",
          color: "white",
          zIndex: 100,
          position: "fixed",
          padding: "0vh",
          opacity: 0,
          top: 0,
        },
        banner: {
          width: "100%",
          display: "flex",
          alignItems: "center",
          background: lastBannerFlowPackage
            ? lastBannerFlowPackage.color
            : "black",
          color: "white",
          height: "5vh",
          zIndex: 100,
          position: "fixed",
          opacity: 1,
          padding: "1vh",
          top: 0,
        },
      }}
    >
      <div
        style={{
          marginRight: "2%",
          fontWeight: StyleVariables.values.weight.subtitle,
        }}
      >
        <ResponsiveText>{lastBannerFlowPackage?.title || ""}</ResponsiveText>
      </div>
      <div style={{ color: "white" }}>
        <ResponsiveText>{lastBannerFlowPackage?.content || ""}</ResponsiveText>
      </div>
    </motion.div>
  );
};
