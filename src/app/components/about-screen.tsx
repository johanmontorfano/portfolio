import { Box, Container, Separe, Subtitle, Text } from "montorfano-utils";
import { useEffect, useRef, useState } from "react";
import { resolveImage } from "../../gcp/scripts/storage";
import "./about-screen.scss";

export const AboutScreen = () => {
  //const ref = useRef<any>();
  const [activeScreen, setActiveScreen] = useState<0 | 1 | 2>(0);

  const [me2URL, setme2URL] = useState<string>("");

  useEffect(() => {
    //resolve the me2 url from storage
    resolveImage("me2").then((url) => setme2URL(url));
  }, []);

  /**
   * compute my age
   */
  function ageCompute() {
    const date = new Date();

    let yearsOld = date.getFullYear() - 2006;

    //affine age with month, if month is lower than feb minus 1 the age
    if (date.getMonth() < 2) yearsOld--;
    else if (date.getMonth() === 2) {
      //if we are in feb, check if the day is lower than the 18th
      if (date.getDay() < 18) yearsOld--;
    }

    return yearsOld;
  }

  /**
   * returns a custom intention relative to my age
   */
  function intentionRelativeToAge() {
    const intentions = {
      18: "I use this portfolio to put all the informations about the stuff I've created, I'm gonna improve my portfolio until I doesn't have anymore improves ideas.",
      24: 'this portfolio is kinda a "vitrine" of what I can do. You may visit it for work purposes.',
    };

    return intentions[ageCompute() <= 18 ? 18 : 24];
  }

  return (
    <>
      <Container className="horizontal-navigation">
        <div>
          <Text
            onClick={() => setActiveScreen(0)}
            className={activeScreen === 0 ? "active" : ""}
          >
            Hello
          </Text>
          <Text
            onClick={() => setActiveScreen(1)}
            className={activeScreen === 1 ? "active" : ""}
          >
            Passions
          </Text>
          <Text
            onClick={() => setActiveScreen(2)}
            className={activeScreen === 2 ? "active" : ""}
          >
            Skills
          </Text>
        </div>
      </Container>
      <Container className="horizontal-wrapper" style={{
        height: document.getElementsByClassName("horizontal-presentation " + (activeScreen + 1))[0]?.getBoundingClientRect().height
      }}>
        <Container
          className={
            (activeScreen === 0 ? "active" : "") + " horizontal-presentation 1"
          }
        >
          <Separe />
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              alignItems: "stretch",
            }}
          >
            <img
              src={me2URL}
              style={{
                width: "15vw",
                height: "15vw",
                borderRadius: "50em",
                objectFit: "cover",
              }}
            />
          </div>
          <Separe />
          <div>
            <Subtitle style={{ marginBottom: "3%" }}>
              Hello there, I'm Johan. I'm glad to see you here.
            </Subtitle>
            <Text style={{ marginBottom: "3%" }}>
              I'm {ageCompute()} years old and {intentionRelativeToAge()}
            </Text>
            <Text style={{ marginBottom: "3%" }}>
              I'm from Lyon. It's a pretty city near the south of France.
            </Text>
            <Text
              style={{
                marginBottom: "3%",
                fontSize: "var(--s-tiny-font-size)",
              }}
            >
              Click on the other buttons to learn more about me !
            </Text>
          </div>
        </Container>
        <Container
          className={
            (activeScreen === 1 ? "active" : "") + " horizontal-presentation 2"
          }
        >
          <Subtitle style={{ marginBottom: "3%" }}>About my passions,</Subtitle>
          <Text style={{ marginBottom: "3%" }}>
            I've always been interested by programming. I really like to write
            lines and lines of codes, test and improves them.
          </Text>
          <Text style={{ marginBottom: "3%" }}>
            But I also likes a lot of other things, especially art and fashion.
            I can stay an hour facing a painting to try to find out what does
            the painting means.
          </Text>
          <Text>
            In art, there is 1 thing I love: <strong>Minimalism</strong>. And I
            believe an UI following minimalism rules cannot be bad.
          </Text>
        </Container>
        <Container
          className={
            (activeScreen === 2 ? "active" : "") + " horizontal-presentation 3"
          }
        >
          <Subtitle style={{ marginBottom: "3%" }}>
            Let's see what I can do,
          </Subtitle>
          <Text style={{ marginBottom: "3%" }}>
            Since my first programming experiences, I've learned some basic
            stuff like <strong>C++</strong> and <strong>Java</strong>. I'm good
            at that but it's not my main skill.
          </Text>
          <Text style={{ marginBottom: "3%" }}>
            My main skill is <strong>javascript frameworks</strong>. I work
            using <strong>React</strong> since I've tried it. I can do anything
            using React, from creating a responsive website to develop a social
            network application for mobiles.
          </Text>
          <Text style={{ marginBottom: "3%" }}>
            I'm also really good at using <strong>NodeJS</strong> to create
            back-end. I know how to use and manage <strong>Firebase</strong> and{" "}
            <strong>AWS</strong> if you need it in your project.
          </Text>
          <Text style={{ fontSize: "var(--s-tiny-font-size)" }}>
            In the page below, you will see an overview of all the projects I've
            worked on.
          </Text>
        </Container>
      </Container>
    </>
  );
};
