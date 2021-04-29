import { motion } from "framer-motion";
import { Timeline, Tween } from "react-gsap";
import { Controller, Scene } from "react-scrollmagic";
import { ResponsiveDescription } from "../../components/responsive/responsive-description";
import { ResponsiveGrid } from "../../components/responsive/responsive-grid";
import { ResponsiveText } from "../../components/responsive/responsive-text";
import { ResponsiveSubtitle } from "../../components/responsive/responsive-subtitle";
import { UseHorizontalRatio } from "../../modules/ratio";
import { ResponsiveComponent } from "../../modules/responsive/responsive";
import { SceneData } from "../data/scene-2.ts-data";
import { StyleVariables } from "../styles/data/variables";

import "../styles/sass/scene.sass";
import { UseNonUndefined } from "../../modules/var/non-undefined-content";

export const SceneScript = (): JSX.Element => {
  const VerifiedSceneTexts = UseNonUndefined(SceneData.SceneTexts);
  const VerifiedSceneTables = UseNonUndefined(SceneData.SceneTables);

  return (
    <div {...SceneData.SceneData}>
      <div
        style={{
          width: "100%",
          height: "100%",
          background: StyleVariables.colors.radius.multi,
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            background: "rgba(255,255,255,0.4)",
            backdropFilter: "blur(5px)",
            borderTop: "5px solid rgba(255,255,255,0.5)",
            borderBottom: "5px solid rgba(255,255,255,0.5)",
          }}
        >
          <ResponsiveComponent
            style={{
              width: "75%",
            }}
            mobile_style={{
              marginTop: "5vh",
              marginBottom: "5vh",
            }}
          >
            <div>
              <ResponsiveComponent style={{ padding: "3vh" }} mobile_style={{}}>
                <ResponsiveComponent
                  style={{ marginBottom: "5%" }}
                  mobile_style={{ marginBottom: "10%" }}
                >
                  <div>
                    <ResponsiveSubtitle>
                      {VerifiedSceneTexts.subtitle1}
                    </ResponsiveSubtitle>
                  </div>
                  <div>
                    <ResponsiveDescription>
                      {VerifiedSceneTexts.description1}
                    </ResponsiveDescription>
                  </div>
                </ResponsiveComponent>
                <div>
                  <ResponsiveGrid
                    gridLeftContent={VerifiedSceneTables[1].text}
                    gridRightContent={VerifiedSceneTables[1].comps}
                    gridLeftContentTemplate={(props: { children?: any }) => (
                      <div
                        style={{
                          width: "90%",
                          textAlign: "left",
                          marginLeft: "5%",
                        }}
                      >
                        <ResponsiveText animated>
                          {props.children}
                        </ResponsiveText>
                      </div>
                    )}
                    gridRightContentTemplate={(props: { children?: any }) => (
                      <motion.div
                        initial={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          width: UseHorizontalRatio(16 / 9, 150).width,
                          height: UseHorizontalRatio(16 / 9, 150).height,
                          boxShadow:
                            "0px 0px 35px 2px " +
                            StyleVariables.values.shadows.light.default,
                          borderRadius:
                            StyleVariables.values.radius.shortRadius,
                          backgroundColor: "white",
                        }}
                        whileHover={{
                          boxShadow:
                            "0px 0px 45px 2px " +
                            StyleVariables.values.shadows.light.active,
                        }}
                      >
                        {props.children}
                      </motion.div>
                    )}
                    allowedDimensions={{
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </div>
              </ResponsiveComponent>
              <ResponsiveComponent
                style={{ padding: "3vh" }}
                mobile_style={{ marginTop: "10%" }}
              >
                <div>
                  <ResponsiveComponent
                    style={{ marginBottom: "5%" }}
                    mobile_style={{ marginBottom: "10%" }}
                  >
                    <div>
                      <ResponsiveSubtitle>
                        {VerifiedSceneTexts.subtitle2}
                      </ResponsiveSubtitle>
                    </div>
                    <div>
                      <ResponsiveDescription>
                        {VerifiedSceneTexts.description2}
                      </ResponsiveDescription>
                    </div>
                  </ResponsiveComponent>
                  <div>
                    <ResponsiveGrid
                      gridLeftContent={VerifiedSceneTables[2].text}
                      gridRightContent={VerifiedSceneTables[2].comps}
                      gridLeftContentTemplate={(props: { children?: any }) => (
                        <div
                          style={{
                            width: "90%",
                            textAlign: "left",
                            marginLeft: "5%",
                          }}
                        >
                          <ResponsiveText animated>
                            {props.children}
                          </ResponsiveText>
                        </div>
                      )}
                      gridRightContentTemplate={(props: { children?: any }) => (
                        <motion.div
                          initial={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: UseHorizontalRatio(16 / 9, 150).width,
                            height: UseHorizontalRatio(16 / 9, 150).height,
                            boxShadow:
                              "0px 0px 35px 2px " +
                              StyleVariables.values.shadows.light.default,
                            borderRadius:
                              StyleVariables.values.radius.shortRadius,
                            backgroundColor: "white",
                          }}
                          whileHover={{
                            boxShadow:
                              "0px 0px 45px 2px " +
                              StyleVariables.values.shadows.light.active,
                          }}
                        >
                          {props.children}
                        </motion.div>
                      )}
                      allowedDimensions={{
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </div>
                </div>
              </ResponsiveComponent>
            </div>
          </ResponsiveComponent>
        </div>
      </div>
    </div>
  );
};
