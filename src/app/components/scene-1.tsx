import { VideoPlayer } from "../../components/media/video-player";
import { ResponsiveDescription } from "../../components/responsive/responsive-description";
import { ResponsiveTitle } from "../../components/responsive/responsive-title";
import { UseRatio } from "../../modules/sizing/ratio";
import { ResponsiveComponent } from "../../modules/responsive/responsive";
import { UseNonUndefined } from "../../modules/var/non-undefined-content";

import { SceneData } from "../data/scene-1.ts-data";
import { EditVideoLayoutStyle, LayoutStyles } from "../styles/styled/layouts";

import "../styles/sass/scene.sass";
import { UsePercentage } from "../../modules/sizing/percentage";
import { ResponsiveChilds } from "../../modules/responsive/childrens";
import { useEffect, useState } from "react";

export const SceneScript = (): JSX.Element => {
  const [VideoRatioHeight, setVideoRatioHeight] = useState<number>(
    UseRatio(9 / 16, UsePercentage(25)).height
  );

  const VerifiedSceneText = UseNonUndefined(SceneData.SceneTexts);
  const VerifiedSceneVideos = UseNonUndefined(SceneData.SceneVideos);

  useEffect(() => {
    const interval = setInterval(() => {
      setVideoRatioHeight(UseRatio(16 / 9, UsePercentage(25)).height);
    }, 10);

    return function cleanup() {
      clearInterval(interval);
    };
  }, []);

  return (
    <div {...SceneData.SceneData}>
      <div
        style={{
          height: "100vh",
          background: "whitesmoke",
        }}
      >
        <ResponsiveComponent
          style={{
            display: "grid",
            height: "100vh",
            gridTemplateColumns: "50% 50%",
            gridTemplateRows: "100vh",
          }}
          mobile_style={{
            display: "grid",
            height: "100vh",
            gridTemplateColumns: "1fr",
            gridTemplateRows: "35% 65%",
          }}
        >
          <ResponsiveComponent
            style={{
              width: "100%",
              height: "100vh",
              display: "flex",
              alignItems: "center",
            }}
            mobile_style={{ width: "100%", height: "100%" }}
          >
            <ResponsiveComponent
              style={{ marginLeft: "5%" }}
              mobile_style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <div>
                <ResponsiveTitle>{VerifiedSceneText.title}</ResponsiveTitle>
                <ResponsiveComponent
                  style={{ width: "40vw", marginTop: "2%" }}
                  mobile_style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ width: "80%" }}>
                    <ResponsiveDescription>
                      {VerifiedSceneText.subtitle}
                    </ResponsiveDescription>
                  </div>
                </ResponsiveComponent>
              </div>
            </ResponsiveComponent>
          </ResponsiveComponent>
          <ResponsiveComponent
            style={{
              width: "100%",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            mobile_style={{
              width: "80%",
              marginLeft: "10%",
              marginRight: "10%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <VideoPlayer
              video={VerifiedSceneVideos[1]}
              MotionVideoStyle={{
                initial: LayoutStyles.VideoLayout.initial,
                animate: { height: VideoRatioHeight, x: "10%", y: "-2.5%" },
              }}
            />
            <VideoPlayer
              video={VerifiedSceneVideos[2]}
              MotionVideoStyle={{
                initial: LayoutStyles.VideoLayout.initial,
                animate: { height: VideoRatioHeight, x: "-10%", y: "2.5%" },
              }}
            />
          </ResponsiveComponent>
        </ResponsiveComponent>
      </div>
    </div>
  );
};
