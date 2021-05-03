import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { Subject } from "rxjs";
import { LayoutStyles } from "../../app/styles/styled/layouts";
import { ResponsiveText } from "../responsive/responsive-text";
import { BannerFlowEntry } from "./types";
import { GetClassnameValue } from "../../app/styles/styled";

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
      initial="noBanner"
      variants={LayoutStyles.BannerLayout.variants}
    >
      <div
        style={{
          marginRight: "2%",
          fontWeight: parseInt(GetClassnameValue("bold-font-weight"))
        }}
      >
        <ResponsiveText tiny>{lastBannerFlowPackage?.title || ""}</ResponsiveText>
      </div>
      <div style={{ color: "white" }}>
        <ResponsiveText tiny>{lastBannerFlowPackage?.content || ""}</ResponsiveText>
      </div>
    </motion.div>
  );
};
