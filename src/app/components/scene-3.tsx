import { motion, useAnimation } from "framer-motion";
import { ResponsiveDescription } from "../../components/responsive/responsive-description";
import { ResponsiveSubtitle } from "../../components/responsive/responsive-subtitle";
import { ResponsiveComponent } from "../../modules/responsive/responsive";
import { PageData } from "../data/scene-3.ts-data";

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
import { ResponsiveLink } from "../../components/responsive/responsive-link";
import { ResponsiveButton } from "../../components/responsive/responsive-button";
import { InstagramSVG } from "../../svg/instagram-svg";
import { TwitterSVG } from "../../svg/twitter-svg";
import { ResponsiveValue } from "../../modules/responsive/value";

const ImagesElementsSources = [TwitterProfileImage, InstagramProfileImage];

export const PageScript = (): JSX.Element => {
  const [ImageRatioHeight, setImageRatioHeight] = useState<number>(
    ResponsiveValue(
      UseRatio(9 / 16, UsePercentage(50)).height,
      UseRatio(9 / 16, UsePercentage(50)).width
    )
  );

  const VerifiedPageText = UseNonUndefined(PageData.PageTexts);

  useEffect(() => {
    const interval = setInterval(() => {
      setImageRatioHeight(
        ResponsiveValue(
          UseRatio(9 / 16, UsePercentage(50)).height,
          UseRatio(9 / 16, UsePercentage(70)).width
        )
      );
    }, 10);

    return function cleanup() {
      clearInterval(interval);
    };
  }, []);

  return (
    <div {...PageData.PageData}>
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
            <ResponsiveComponent
              style={{
                height: "100%",
                display: "grid",
                gridTemplateColumns: "40% 60%",
              }}
              mobile_style={{
                height: "100%",
                display: "grid",
                gridTemplateRows: "50% 50%",
              }}
            >
              <ResponsiveComponent
                style={{
                  display: "flex",
                  width: "100%",
                  minHeight: "70%",
                  alignItems: "center",
                }}
                mobile_style={{
                  display: "flex",
                  width: "100%",
                  minHeight: "70%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ResponsiveChilds>
                  <>
                    <Parallax x={[-10, 10]}>
                      <ImageElement
                        image={ImagesElementsSources[0]}
                        MotionImageStyle={{
                          initial: EditImageLayoutStyle.initialBlock([
                            { edit: "rotateX", value: "345deg" },
                            { edit: "rotateY", value: "320deg" },
                            { edit: "rotateZ", value: "355deg" },
                            { edit: "height", value: ImageRatioHeight },
                          ]),
                          animate: {
                            height: ImageRatioHeight,
                          },
                        }}
                      />
                    </Parallax>
                    <Parallax x={[-10, 20]}>
                      <ImageElement
                        image={ImagesElementsSources[1]}
                        MotionImageStyle={{
                          initial: EditImageLayoutStyle.initialBlock([
                            { edit: "rotateX", value: "345deg" },
                            { edit: "rotateY", value: "320deg" },
                            { edit: "rotateZ", value: "355deg" },
                            { edit: "translateX", value: "-70%" },
                            { edit: "translateY", value: "5%" },
                            { edit: "height", value: ImageRatioHeight },
                          ]),
                          animate: {
                            height: ImageRatioHeight,
                          },
                        }}
                      />
                    </Parallax>
                  </>
                  <>
                    <Parallax y={[-10, 10]}>
                      <ImageElement
                        image={ImagesElementsSources[0]}
                        MotionImageStyle={{
                          initial: EditImageLayoutStyle.initialBlock([
                            { edit: "rotateX", value: "345deg" },
                            { edit: "rotateY", value: "320deg" },
                            { edit: "rotateZ", value: "355deg" },
                            { edit: "translateX", value: "20%" },
                            { edit: "height", value: ImageRatioHeight },
                          ]),
                          animate: {
                            height: ImageRatioHeight,
                          },
                        }}
                      />
                    </Parallax>
                    <Parallax y={[-10, 20]}>
                      <ImageElement
                        image={ImagesElementsSources[1]}
                        MotionImageStyle={{
                          initial: EditImageLayoutStyle.initialBlock([
                            { edit: "rotateX", value: "345deg" },
                            { edit: "rotateY", value: "320deg" },
                            { edit: "rotateZ", value: "355deg" },
                            { edit: "translateX", value: "-20%" },
                            { edit: "height", value: ImageRatioHeight },
                          ]),
                          animate: {
                            height: ImageRatioHeight,
                          },
                        }}
                      />
                    </Parallax>
                  </>
                </ResponsiveChilds>
              </ResponsiveComponent>
              <div
                style={{ zIndex: 100, display: "flex", alignItems: "center" }}
              >
                <div>
                  <ResponsiveSubtitle>
                    {VerifiedPageText.subtitle2}
                  </ResponsiveSubtitle>
                  <ResponsiveDescription>
                    {VerifiedPageText.description2}
                  </ResponsiveDescription>
                  <div
                    style={{
                      marginTop: "2%",
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "1rem",
                    }}
                  >
                    <ResponsiveButton
                      handleClick={() =>
                        window.location.assign(
                          "https://www.instagram.com/franndjoo"
                        )
                      }
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          width: "100%",
                        }}
                      >
                        <InstagramSVG initial={{ width: "10%" }} />
                      </div>
                    </ResponsiveButton>
                    <ResponsiveButton
                      handleClick={() =>
                        window.location.assign(
                          "https://www.twitter.com/franndjoo"
                        )
                      }
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          width: "100%",
                        }}
                      >
                        <TwitterSVG initial={{ width: "10%" }} />
                      </div>
                    </ResponsiveButton>
                  </div>
                </div>
              </div>
            </ResponsiveComponent>
          </div>
        </div>
      </div>
    </div>
  );
};
