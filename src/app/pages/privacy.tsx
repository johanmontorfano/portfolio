import { useEffect, useState } from "react";
import { Banner, BannerFlow } from "../../components/banner";
import { ResponsiveDescription } from "../../components/responsive/responsive-description";
import { ResponsiveSubtitle } from "../../components/responsive/responsive-subtitle";
import { ResponsiveTitle } from "../../components/responsive/responsive-title";
import { ResponsiveText } from "../../components/responsive/responsive-text";
import { ResponsiveComponent } from "../../modules/responsive/responsive";
import { CookieSVG } from "../../svg/cookie-svg";

import {PageData} from "../data/pages.privacy.ts-data";
import "../styles/sass/scene.sass";
import { ResponsiveButton } from "../../components/responsive/responsive-button";
import { Analytics, AnalyticsData } from "../../gcp/modules/analytics.tools";
import { UseNonUndefined } from "../../modules/var/non-undefined-content";
import { UseLang } from "../../modules/doc/lang";

const Translates = {
  title: UseLang({
    FR: "Confidentialité",
    US: "Privacy"
  })
}

export const PrivacyPage = () => {
  const VerifiedText = UseNonUndefined(PageData.PageTexts);
  const VerifiedTables = UseNonUndefined(PageData.PageTables);

  const [isAnalyticsDisabled, setDisablingState] = useState<boolean>(!AnalyticsData.isAnalyticsEnabled);

  const [dataCollectedList] = useState<string[]>(VerifiedTables.list);

  useEffect(() => {
    BannerFlow.next({
      title: "",
      content: "",
      color: "",
      duration: 1,
    });
  }, []);

  return (
    <div className="scene">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "2%",
          backgroundColor: "whitesmoke",
          alignItems: "center",
        }}
      >
        <ResponsiveTitle>{Translates.title}</ResponsiveTitle>
        <CookieSVG style={{ width: "10%", display: "block" }} />
      </div>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "2%" }}>
        <ResponsiveComponent
          style={{ width: "75%" }}
          mobile_style={{ width: "90%" }}
        >
          <br />
          <br />
          <ResponsiveDescription>
            {VerifiedText.intro}
          </ResponsiveDescription>
          <br />
          <br />
          <ResponsiveSubtitle>
            {VerifiedText.subtitle}
          </ResponsiveSubtitle>
          <br />
          <ul style={{ fontFamily: "Helvetica" }}>
            {dataCollectedList.map((data) => (
              <li>
                <ResponsiveText>{data}</ResponsiveText>
              </li>
            ))}
          </ul>

          <div>
            <ResponsiveButton handleClick={() => {
              Analytics.disableAnalytics();

              setDisablingState(true)
            }} activate={!isAnalyticsDisabled}>
              {isAnalyticsDisabled? VerifiedText.disabledButton : VerifiedText.disableButton}
            </ResponsiveButton>
          </div>
        </ResponsiveComponent>
      </div>
    </div>
  );
};
