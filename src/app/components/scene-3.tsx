import { motion, useAnimation } from "framer-motion";
import { Timeline } from "react-gsap";
import { Controller, Scene } from "react-scrollmagic";
import { ResponsiveDescription } from "../../components/responsive/responsive-description";
import { ResponsiveSubtitle } from "../../components/responsive/responsive-subtitle";
import { ResponsiveComponent } from "../../modules/responsive/responsive";
import { SceneData } from "../data/scene-3.ts-data";
import { StyleVariables } from "../styles/data/variables";

import TwitterProfileImage from "../../images/twitter_profile.jpeg";
import InstagramProfileImage from "../../images/insta_profile.jpeg";
import { UseNonUndefined } from "../../modules/var/non-undefined-content";
import "../styles/sass/scene.sass";
import { ResponsiveButton } from "../../components/responsive/responsive-button";
import { ResponsiveText } from "../../components/responsive/responsive-text";
import { ResponsiveChilds } from "../../modules/responsive/childrens";

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
  const VerifiedSceneText = UseNonUndefined(SceneData.SceneTexts);
  const VerififedScenesSVGs = UseNonUndefined(SceneData.SceneSVGs);
  const playbuttonControls = useAnimation();

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
            }}
          >
            <ResponsiveComponent
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                columnGap: "1%",
                height: "100vh",
              }}
              mobile_style={{
                display: "grid",
                gridTemplateRows: "50% 50%",
                gridTemplateColumns: "1fr",
                height: "100vh",
              }}
            >
              <div style={{ height: "100%" }}>
                <ResponsiveSubtitle>
                  {VerifiedSceneText.subtitle2}
                </ResponsiveSubtitle>
                <ResponsiveDescription>
                  {VerifiedSceneText.description2}
                </ResponsiveDescription>
                <div>
                  <ResponsiveComponent
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                      height: "100%",
                    }}
                    mobile_style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                    }}
                  >
                    {ImagesElementsSources.map((source, i) => (
                      <ResponsiveChilds>
                        <motion.img
                          src={source}
                          onClick={() =>
                            window.location.assign(
                              i > 0
                                ? "https://www.twitter.com/franndjoo"
                                : "https://www.instagram.com/franndjoo"
                            )
                          }
                          initial={{
                            zIndex: 1,
                            width: "20vw",
                            x: i > 0 ? "-50%" : "0%",
                            y: i > 0 ? "25%" : "0%",
                            borderRadius:
                              StyleVariables.values.radius.shortRadius,
                            boxShadow:
                              "0px 0px 15px 1px " +
                              StyleVariables.values.shadows.dark.default,
                          }}
                          whileHover={{
                            zIndex: 100,
                            scale: 1.1,
                          }}
                        />
                        <motion.img
                          src={source}
                          onClick={() =>
                            window.location.assign(
                              i > 0
                                ? "https://www.twitter.com/franndjoo"
                                : "https://www.instagram.com/franndjoo"
                            )
                          }
                          initial={{
                            zIndex: 1,
                            width: "30vw",
                            x: i > 0 ? "0%" : "0%",
                            y: i > 0 ? "0%" : "0%",
                            borderRadius:
                              StyleVariables.values.radius.shortRadius,
                            boxShadow:
                              "0px 0px 15px 1px " +
                              StyleVariables.values.shadows.dark.default,
                          }}
                          whileHover={{
                            zIndex: 100,
                            scale: 1.1,
                          }}
                        />
                      </ResponsiveChilds>
                    ))}
                  </ResponsiveComponent>
                </div>
              </div>

              <div>
                <ResponsiveSubtitle>
                  {VerifiedSceneText.subtitle1}
                </ResponsiveSubtitle>
                <ResponsiveDescription>
                  {VerifiedSceneText.description1}
                </ResponsiveDescription>
                <ResponsiveComponent
                  style={{
                    display: "flex",
                    transform: "translateY(50%)",
                    justifyContent: "center",
                  }}
                  mobile_style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <motion.div
                    initial={{
                      boxShadow:
                        "0px 0px 15px 2px " +
                        StyleVariables.values.shadows.dark.default,
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: StyleVariables.values.radius.shortRadius,
                      padding: "1%",
                    }}
                    whileHover={{
                      boxShadow:
                        "0px 0px 45px 4px " +
                        StyleVariables.values.shadows.dark.active,
                      cursor: "pointer",
                    }}
                    onHoverStart={() => playbuttonControls.start("animate")}
                    onHoverEnd={() => playbuttonControls.start("initial")}
                    onClick={() =>
                      window.location.assign(
                        "https://music.apple.com/library/playlist/p.6xZa376sYA4oA3P"
                      )
                    }
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ width: "3vw" }}>
                        <VerififedScenesSVGs.AppleMusic
                          style={{ fill: "#fa2d48" }}
                        />
                      </div>
                      <div style={{ display: "flex" }}>
                        <motion.div
                          initial="initial"
                          variants={{
                            initial: {
                              width: "2vw",
                              translateX: "20%",
                              opacity: 0,
                            },
                            animate: { translateX: "80%", opacity: 1 },
                          }}
                          animate={playbuttonControls}
                        >
                          <VerififedScenesSVGs.PlayButton
                            style={{ fill: "#ff6375", opacity: 1 }}
                          />
                        </motion.div>
                        <motion.div
                          initial="initial"
                          variants={{
                            initial: {
                              width: "2vw",
                              translateX: "20%",
                              opacity: 1,
                            },
                            animate: { translateX: "40%" },
                          }}
                          animate={playbuttonControls}
                        >
                          <VerififedScenesSVGs.PlayButton
                            style={{ fill: "#fa2d48", opacity: 1 }}
                          />
                        </motion.div>
                        <motion.div
                          initial="initial"
                          variants={{
                            initial: {
                              width: "2vw",
                              translateX: "-20%",
                              opacity: 1,
                            },
                            animate: { translateX: "20%", opacity: 0 },
                          }}
                          animate={playbuttonControls}
                        >
                          <VerififedScenesSVGs.PlayButton
                            style={{ fill: "#ff6375", opacity: 1 }}
                          />
                        </motion.div>
                      </div>
                    </div>
                    <div style={{ alignItems: "center", display: "flex"}}>
                      <motion.div
                        initial={{
                          display: "grid",
                          gridTemplateRows: "1fr 1fr",
                          gridTemplateColumns: "1fr 1fr 1fr",
                          gap: "0.5vw",
                          rowGap: "0.5vw",
                        }}
                      >
                        <ResponsiveChilds>
                          {PlaylistPreviewLoadableIconsURL.map((url) => (
                            <motion.img
                              src={url}
                              initial={{
                                borderRadius:
                                  StyleVariables.values.radius.shortRadius,
                                scale: 1
                              }}
                              whileHover={{ scale: 0.9 }}
                            />
                          ))}
                          {PlaylistPreviewLoadableIconsURLMobile.map((url) => (
                            <motion.img
                              src={url}
                              initial={{
                                borderRadius:
                                  StyleVariables.values.radius.shortRadius,
                                scale: 1,
                              }}
                              whileHover={{ scale: 0.9 }}
                            />
                          ))}
                        </ResponsiveChilds>
                      </motion.div>
                    </div>
                  </motion.div>
                </ResponsiveComponent>
              </div>
            </ResponsiveComponent>
          </div>
        </div>
      </div>
    </div>
  );
};
