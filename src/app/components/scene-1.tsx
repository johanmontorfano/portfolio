import { VideoPlayer } from "../../components/media/video-player";
import { ResponsiveDescription } from "../../components/responsive/responsive-description";
import { ResponsiveTitle } from "../../components/responsive/responsive-title";
import { ResponsiveComponent } from "../../modules/responsive/responsive";
import { UseNonUndefined } from "../../modules/var/non-undefined-content";

import { SceneData } from "../data/scene-1.ts-data";
import { StyleVariables } from "../styles/data/variables";

import "../styles/sass/scene.sass";

export const SceneScript = (): JSX.Element => {
  const VerifiedSceneText = UseNonUndefined(SceneData.SceneTexts);
  const VerifiedSceneVideos = UseNonUndefined(SceneData.SceneVideos);

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
            gridTemplateColumns: "60% 40%",
            gridTemplateRows: "100vh",
          }}
          mobile_style={{
            display: "grid",
            height: "100vh",
            gridTemplateColumns: "1fr",
            gridTemplateRows: "50% 50%",
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
              alignItems: "center",
              pointerEvents: "none",
              transform: "translateX(-10%)",
            }}
            mobile_style={{
              width: "80%",
              marginLeft: "10%",
              marginRight: "10%",
              marginTop: "10%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              pointerEvents: "none",
            }}
          >
            <VideoPlayer
              video={VerifiedSceneVideos[1]}
              MotionVideoStyle={{
                initial: {
                  objectFit: "cover",
                  display: "block",
                  width: "50%",
                  borderRadius: StyleVariables.values.radius.shortRadius,
                  translateX: "20%",
                  translateY: "20%",
                  rotate: "-2.5deg",
                  scale: 0.9,
                  boxShadow: "0px 0px 0px 0px gray",
                },
                animate: {
                  translateX: "0%",
                  translateY: "0%",
                  scale: 1,
                },
                transition: {
                  delay: 1,
                },
              }}
            />
            <VideoPlayer
              video={VerifiedSceneVideos[2]}
              MotionVideoStyle={{
                initial: {
                  objectFit: "cover",
                  display: "block",
                  width: "50%",
                  borderRadius: StyleVariables.values.radius.shortRadius,
                  translateX: "-20%",
                  translateY: "20%",
                  rotate: "2.5deg",
                  scale: 0.9,
                },
                animate: {
                  translateX: "0%",
                  translateY: "0%",
                  scale: 1,
                },
                transition: {
                  delay: 1,
                },
              }}
            />
          </ResponsiveComponent>
        </ResponsiveComponent>
      </div>
    </div>
  );
};
