import { motion } from "framer-motion";
import { useEffect } from "react";
import { ImageElement } from "../../components/media/image";
import { ResponsiveSubtitle } from "../../components/responsive/responsive-subtitle";
import { UsePercentage } from "../../modules/sizing/percentage";
import { UseRatio } from "../../modules/sizing/ratio";
import { GetClassnameValue } from "../styles/styled";
import { ResponsiveText } from "../../components/responsive/responsive-text";
import { Parallax } from "react-scroll-parallax";
import Memoji from "../../images/memoji.png";
import { ResponsiveComponent } from "../../modules/responsive/responsive";
import { ResponsiveChilds } from "../../modules/responsive/childrens";

export const MiniCardList = (props: {
  title: string;
  listElements: string[];
}) => (
  <Parallax y={[20, 10]}>
    <motion.div
      initial={{
        borderRadius: GetClassnameValue("element-border-radius-size"),
        backgroundColor: "white",
        padding: "5%",
        boxShadow: "0px 0px 30px 1px rgba(0,0,0,0.1)",
        rotateX: "345deg",
        rotateY: "330deg",
        rotateZ: "355deg",
        marginBottom: "5vh",
      }}
      whileHover={{
        rotateX: "360deg",
        rotateY: "360deg",
        rotateZ: "360deg",
      }}
    >
      <ResponsiveText>{props.title}</ResponsiveText>
      <ul>
        {props.listElements.map((listElement) => (
          <li>
            <ResponsiveText tiny>{listElement}</ResponsiveText>
          </li>
        ))}
      </ul>
    </motion.div>
  </Parallax>
);

export const CV = () => {
  return (
    <div
      style={{
        background: "white",
        display: "flex",
        justifyContent: "center",
        marginTop: "5%",
        marginBottom: "5%",
      }}
    >
      <ResponsiveComponent
        style={{
          width: UseRatio(29.7 / 21, UsePercentage(40)).height,
          height: UseRatio(29.7 / 21, UsePercentage(40)).width,
          backgroundColor: "#fcfcfc",
          borderRadius: GetClassnameValue("element-border-radius-size"),
          border: "1px solid gray",
        }}
        mobile_style={{
          width: UseRatio(29.7 / 21, UsePercentage(40)).height,
          backgroundColor: "#fcfcfc",
          borderRadius: GetClassnameValue("element-border-radius-size"),
          border: "1px solid gray",
        }}
      >
        <ResponsiveComponent
          style={{
            display: "grid",
            gridTemplateRows: "20% 80%",
            padding: "2%",
          }}
          mobile_style={{
            padding: "2%"
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <ImageElement
              image={Memoji}
              MotionImageStyle={{ initial: { width: "30%" } }}
            />
            <ResponsiveSubtitle>Johan Montorfano</ResponsiveSubtitle>
          </div>
          <ResponsiveComponent
            style={{ display: "grid", gridTemplateColumns: "30% 70%" }}
            mobile_style={{ display: "grid", gridTemplateColumns: "0% 100%", gridTemplateRows: "0% auto" }}
          >
            <ResponsiveChilds>
              <div>
                <MiniCardList
                  title={"Skills"}
                  listElements={[
                    "Firebase Integration",
                    "UI/UX Creation",
                    "Framer Integration",
                    "React, Vue Integration",
                    "WASM Integration",
                    "Express Integration",
                  ]}
                />
                <MiniCardList
                  title={"Languages skills"}
                  listElements={[
                    "Javascript/Typescript",
                    "SASS",
                    "PHP",
                    "WASM",
                    "Java",
                    "MySQL",
                    "C",
                  ]}
                />
                <MiniCardList
                  title={"Speaks"}
                  listElements={[
                    "French - Bilingual",
                    "English - Bilingual",
                    "Mandarin - Frequently",
                  ]}
                />
                <MiniCardList
                  title={"Portoflio"}
                  listElements={["No projects yet."]}
                />
              </div>
              <div />
            </ResponsiveChilds>
            <div style={{ marginLeft: "10%", marginRight: "10%" }}>
              <ResponsiveSubtitle>Who I am ?</ResponsiveSubtitle>
              <ResponsiveText>
                I'm Johan. I live in France, around Lyon.
              </ResponsiveText>
              <br />
              <br />
              <ResponsiveSubtitle>What I do ?</ResponsiveSubtitle>
              <ResponsiveText>
                <div style={{ textAlign: "justify" }}>
                  I'm a freelancer programmer. I do especially websites and
                  prepare backends. I'm specialized in building responsives and
                  animated interfaces which responds to gestures by animations
                  and micro-interactions.
                </div>
              </ResponsiveText>
              <br />
              <br />
              <ResponsiveSubtitle>What motivates me ?</ResponsiveSubtitle>
              <ResponsiveText>
                <div style={{ textAlign: "justify" }}>
                  Programming is something that passionates me. I love
                  programming and I like good job, I build websites quickly with
                  both front-end and back-end ended by myself.
                </div>
              </ResponsiveText>
            </div>
          </ResponsiveComponent>
        </ResponsiveComponent>
      </ResponsiveComponent>
    </div>
  );
};
