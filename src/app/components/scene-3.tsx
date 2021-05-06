import { motion, useAnimation } from "framer-motion";
import { ResponsiveDescription } from "../../components/responsive/responsive-description";
import { ResponsiveSubtitle } from "../../components/responsive/responsive-subtitle";
import { ResponsiveComponent } from "../../modules/responsive/responsive";
import { SceneData } from "../data/scene-3.ts-data";

import TwitterProfileImage from "../../images/twitter_profile.jpeg";
import InstagramProfileImage from "../../images/insta_profile.jpeg";
import { UseNonUndefined } from "../../modules/var/non-undefined-content";
import "../styles/sass/scene.sass";
import { ResponsiveChilds } from "../../modules/responsive/childrens";
import { ImageElement } from "../../components/media/image";
import { EditImageLayoutStyle, LayoutStyles } from "../styles/styled/layouts";
import { UseRatio } from "../../modules/sizing/ratio";
import { UsePercentage } from "../../modules/sizing/percentage";
import { useEffect, useState } from "react";
import { ResponsiveText } from "../../components/responsive/responsive-text";
import { GetClassnameValue } from "../styles/styled";
import { BannerFlow } from "../../components/banner";
import { Parallax } from "react-scroll-parallax";

const PlaylistPreviewLoadableIconsURL = [
  "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/2c/cf/29/2ccf2974-c994-621f-cc25-e5c08f9d7150/00602577027888.rgb.jpg/80x80bb-50.jpg",
  "https://is1-ssl.mzstatic.com/image/thumb/Music123/v4/96/91/be/9691be37-534c-6921-721d-a465f7e9e947/5060766761534_cover.jpg/80x80bb-50.jpg",
  "https://is4-ssl.mzstatic.com/image/thumb/Music114/v4/84/a8/01/84a801e2-b710-120a-b347-8f39d0afa6b0/artwork.jpg/80x80bb-50.jpg",
  "https://is5-ssl.mzstatic.com/image/thumb/Music114/v4/1c/3a/63/1c3a633d-db8d-5f22-47cf-b69c54ed5e3d/194690492266_cover.jpg/80x80bb-50.jpg",
  "https://is2-ssl.mzstatic.com/image/thumb/Music124/v4/54/5d/94/545d94f1-ad96-fc6e-46a0-ad4ee3934c86/054391925381.jpg/80x80bb-50.jpg",
  "https://is2-ssl.mzstatic.com/image/thumb/Music124/v4/7e/4f/33/7e4f3371-62be-6c16-c9ef-c3ab00bdb009/00602567888550.rgb.jpg/80x80bb-50.jpg",
  "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/54/e1/fc/54e1fc78-0cd6-c266-5fda-cfb661186b05/artwork.jpg/80x80bb-50.jpg",
  "https://is4-ssl.mzstatic.com/image/thumb/Music114/v4/db/b5/63/dbb563b9-9eec-8c42-4c1b-3ead330cdbf7/00602527276434.rgb.jpg/80x80bb-50.jpg",
  "https://is5-ssl.mzstatic.com/image/thumb/Music114/v4/89/63/f6/8963f657-eb1a-7830-b73d-946a964100cb/artwork.jpg/80x80bb-50.jpg",
];
const PlaylistPreviewLoadableIconsURLMobile = [
  "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/2c/cf/29/2ccf2974-c994-621f-cc25-e5c08f9d7150/00602577027888.rgb.jpg/80x80bb-50.jpg",
  "https://is1-ssl.mzstatic.com/image/thumb/Music123/v4/96/91/be/9691be37-534c-6921-721d-a465f7e9e947/5060766761534_cover.jpg/80x80bb-50.jpg",
  "https://is4-ssl.mzstatic.com/image/thumb/Music114/v4/84/a8/01/84a801e2-b710-120a-b347-8f39d0afa6b0/artwork.jpg/80x80bb-50.jpg",
  "https://is5-ssl.mzstatic.com/image/thumb/Music114/v4/1c/3a/63/1c3a633d-db8d-5f22-47cf-b69c54ed5e3d/194690492266_cover.jpg/80x80bb-50.jpg",
  "https://is2-ssl.mzstatic.com/image/thumb/Music124/v4/54/5d/94/545d94f1-ad96-fc6e-46a0-ad4ee3934c86/054391925381.jpg/80x80bb-50.jpg",
  "https://is2-ssl.mzstatic.com/image/thumb/Music124/v4/7e/4f/33/7e4f3371-62be-6c16-c9ef-c3ab00bdb009/00602567888550.rgb.jpg/80x80bb-50.jpg",
];
const ImagesElementsSources = [TwitterProfileImage, InstagramProfileImage];

export const SceneScript = (): JSX.Element => {
  const [ImageRatioHeight, setImageRatioHeight] = useState<number>(
    UseRatio(9 / 16, UsePercentage(50)).height
  );

  const VerifiedSceneText = UseNonUndefined(SceneData.SceneTexts);

  const AnimationControllers = [useAnimation(), useAnimation()];

  useEffect(() => {
    const interval = setInterval(() => {
      setImageRatioHeight(UseRatio(9 / 16, UsePercentage(50)).height);
    }, 10);

    return function cleanup() {
      clearInterval(interval);
    };
  }, []);

  return (
    <div {...SceneData.SceneData}>
      <div style={{ height: "100vh", width: "100%" }}>
        <div
          style={{
            background: "whitesmoke",
            width: "100%",
            height: "100%",
            color: "black",
          }}
        >
          <div
            style={{
              padding: "2vw",
              height: "100%",
            }}
          >
            <div style={{ height: "100%" }}>
              <ResponsiveSubtitle>
                {VerifiedSceneText.subtitle2}
              </ResponsiveSubtitle>
              <ResponsiveDescription>
                {VerifiedSceneText.description2}
              </ResponsiveDescription>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                  width: "100%",
                  minHeight: "70%",
                }}
              >
                {ImagesElementsSources.map((source, i) => {
                  return (
                    <Parallax y={[-5, 5]}>
                      <div style={{ position: "relative" }}>
                        <motion.div
                          initial={"initial"}
                          animate={AnimationControllers[i]}
                          onClick={() =>
                            AnimationControllers[i].start("active")
                          }
                          onTapStart={() => {
                            BannerFlow.next({
                              color: "black",
                              content: VerifiedSceneText.bannerRedirectText,
                              title: "Social",
                              duration: 1500,
                            });

                            window.location.assign(
                              i > 0
                                ? "https://www.twitter.com/franndjoo"
                                : "https://www.instagram.com/franndjoo"
                            );
                          }}
                          whileHover={{
                            height: "90%",
                            marginBottom: "10%",
                          }}
                          variants={{
                            initial: {
                              position: "absolute",
                              zIndex: 101,
                              color: "black",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: "100%",
                              height: "100%",
                              borderRadius: GetClassnameValue(
                                "element-border-radius-size"
                              ),
                              background: "white",
                              scale: 1,
                            },
                            active: {
                              height: "0%",
                              marginBottom: "100%",
                              opacity: 0,
                            },
                          }}
                        >
                          <ResponsiveText>
                            {i > 0 ? "Instagram" : "Twitter"}
                          </ResponsiveText>
                        </motion.div>
                        <ImageElement
                          image={source}
                          MotionImageStyle={{
                            whileHover: EditImageLayoutStyle.whileHoverBlock([
                              { edit: "zIndex", value: 100 },
                            ]),
                            initial: LayoutStyles.ImageLayout.initial,
                            animate: {
                              height: UseRatio(9 / 16, UsePercentage(50))
                                .height,
                            },
                          }}
                        />
                      </div>
                    </Parallax>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
