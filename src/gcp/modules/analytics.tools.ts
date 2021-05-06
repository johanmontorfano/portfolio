import { BannerFlow } from "../../components/banner";
import { FirebaseAnalytics } from "./../firebase";

export const Analytics = {
  disableAnalytics: () => {
    FirebaseAnalytics.setAnalyticsCollectionEnabled(false);

    BannerFlow.next({
      title: "analytics",
      content: "Analytics disabled for the current session.",
      color: "black",
      duration: 5000,
    });

    AnalyticsData.isAnalyticsEnabled = false;
  },
};

export const AnalyticsData = {
  isAnalyticsEnabled: true,
};
