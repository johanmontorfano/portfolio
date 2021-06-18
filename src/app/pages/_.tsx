import { Parallax, ParallaxProvider } from "react-scroll-parallax";
import { useEffect, useRef, useState } from "react";
import { GetProjects, ProjectDefinition } from "../../gcp/scripts/get-projects";
import { motion } from "framer-motion";
import { GenerateMessage, SendMessage } from "../../gcp/scripts/send-message";
import {
  Text,
  Image,
  Container,
  Layer,
  VerticalScrollParallaxFollowing,
  Appear,
  Title,
  Subtitle,
  Relative,
  Absolute,
  Separe,
  Box,
  Handwrite,
  Grid,
  Button,
  navigate,
  Input,
  VerifyEntry,
  TextArea,
  JSONToArray
} from "montorfano-utils";

//images
import TheDesktop from "../images/the_desktop.jpg";
import Me1 from "../images/me1.jpg";
import Me2 from "../images/me2.jpg";

export const Page = () => {
  //we uses this ref to make computations about the Box of the texts of the Image which contains the TheDesktop image source,
  //using the ref of a parent span to access to the childrens. the span is used as the parent because it have not effects on the layout
  const TheDesktopRef = useRef<any>();
  //store the BoxComputedWidthValue
  const [boxWidth, setBoxWidth] = useState<string>("100%");
  //store the data of Projects
  const [projectData, setProjectData] = useState<ProjectDefinition[]>([]);

  //here there is the form data
  //including the name, email and message
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  //this value store the data relative to the button processing state
  //if the value is true, the button is clicked and the message is going to be send
  //else it seems that there is nothing going on
  const [isProcessing, setProcessState] = useState<boolean>(false);

  //this value store the data relative to the button inner text
  //the button inner text is relative to the processing result
  //it can be "Sended" or "Failed" or "Send"
  const [buttonText, setButtonText] =
    useState<"Sended 😀" | "Failed 😑" | "Send ✈">("Send ✈");

  //useEffect [] handles:
  //handling TheDesktopRef common using with boxWidth
  //set project data
  useEffect(() => {
    //creating a loop
    const interval = setInterval(() => {
      //accessing the image element
      const ImageElement: HTMLImageElement = TheDesktopRef.current?.children[0];

      //it uses the matchMedia function to know if the ImageElement.width respect the rules of displaying
      //rules of displaying: if the screen size is > at 2 * ImageElementWidth, the BoxElement takes 60% of
      //the screen size; else it takes 100%.
      if (
        window.matchMedia("(max-width: " + 2 * ImageElement.width + "px)")
          .matches
      ) {
        //in this case, the screen width doesn't respect the rules of displaying
        //editing the box element style width attr to 100%
        setBoxWidth("100%");
      } else {
        //in this case, the screen respect the rules of displaying
        //editing the box element style width attr to ImageElement.width - window.innerWidth
        setBoxWidth(window.innerWidth - ImageElement.width + "px");
      }
    }, 150);

    //load project data from firebase
    GetProjects().then((data) => setProjectData(JSONToArray(data)));

    return () => clearInterval(interval);
  }, []);

  return (
    <ParallaxProvider>
      <Container width="100%" height="100vh" xalign="center" yalign="center">
        <Layer layer={1}>
          <Container
            width="100%"
            height="100vh"
            xalign="center"
            yalign="center"
          >
            <VerticalScrollParallaxFollowing>
              <Appear delay={1}>
                <Title style={{ textAlign: "center" }}>Johan Montorfano</Title>
              </Appear>
              <Appear delay={1}>
                <Subtitle style={{ textAlign: "center" }}>
                  Software Engineer
                </Subtitle>
              </Appear>
            </VerticalScrollParallaxFollowing>
          </Container>
        </Layer>
        <Layer layer={2}>
          <Container
            width="100%"
            height="100vh"
            xalign="center"
            yalign="center"
          >
            <Relative style={{ width: "100%", height: "100vh" }}>
              <Absolute style={{ top: "1%", left: "1%" }}>
                <Appear delay={1}>
                  <Image source={Me1} style={{ width: "20vh" }} />
                </Appear>
              </Absolute>
              <Absolute style={{ bottom: "1%", right: "1%" }}>
                <Appear delay={1}>
                  <Image source={Me2} style={{ width: "20vh" }} />
                </Appear>
              </Absolute>
            </Relative>
          </Container>
        </Layer>
      </Container>
      <Separe />
      <Container
        width={"100%"}
        height={"100vh"}
        style={{ position: "relative" }}
      >
        <Layer layer={2}>
          <Appear delay={0.5}>
            <Container width={"100%"} height={"100vh"} xalign="flex-start">
              <Box
                x={boxWidth}
                y="100%"
                style={{
                  background:
                    "linear-gradient(135deg, var(--significative-theme-color) 20%, transparent 100%)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ padding: "5%" }}>
                    <Parallax y={[-5, 20]}>
                      <Title>Hello :)</Title>
                      <Subtitle style={{ textAlign: "justify" }}>
                        Glad to see you here! I'm Johan and I'm a full-stack
                        developer. I'm from Lyon in France.
                      </Subtitle>
                    </Parallax>
                  </div>
                  <div style={{ padding: "5%" }}>
                    <Handwrite style={{ textAlign: "right" }}>
                      This is the desk{" "}
                      {
                        //put an -> if the screen respect display rules
                        boxWidth !== "100%" ? "->" : ""
                      }
                    </Handwrite>
                  </div>
                </div>
                {/*

                <br />
                <Text style={{textAlign: "justify"}}>
                  I'm from Lyon in France. I'm passionnate by coding, it's
                  something that really intrigates me since 10 and now I can't
                  stay without programming more than 1 day.
                </Text>
                <br />
                <Text style={{textAlign: "justify"}}>
                  You can scroll down a little bit more to access to the
                  "professionnal" part of the website. Everything you are going
                  to see is made by myself and I have learned everything to do
                  that by myself.
                </Text>

                */}
              </Box>
            </Container>
          </Appear>
        </Layer>
        <Layer layer={1}>
          <Appear delay={1}>
            <Container width={"100%"} height={"100vh"} xalign="flex-end">
              <Box x="auto" y="100%">
                <span ref={TheDesktopRef}>
                  <Image
                    source={TheDesktop}
                    style={{
                      height: "100%",
                      borderRadius: "0px",
                    }}
                  />
                </span>
              </Box>
            </Container>
          </Appear>
        </Layer>
      </Container>
      <Separe />
      <Container
        width={"90%"}
        height={"auto"}
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          marginLeft: "5%",
          marginRight: "5%",
        }}
      >
        <Box
          x="auto"
          y="auto"
          style={{
            padding: "2%",
            position: "sticky",
            top: 0,
            background: "var(--significative-theme-color-opacity)",
            backdropFilter: "blur(5px)",
            zIndex: 2,
          }}
        >
          <Title>Projects</Title>
        </Box>
        <Subtitle>Explore some of my projects :)</Subtitle>
        <Grid
          style={{
            gridTemplateColumns: "1fr",
            rowGap: "calc(var(--padding) + 20px)",
            width: "100%",
            justifyContent: "center",
            marginTop: "5%",
            alignItems: "stretch",
          }}
        >
          {projectData.map((project) => (
            <motion.div
              style={{
                padding: "var(--padding)",
                borderRadius: "var(--border-radius)",
                border:
                  "2px solid var(--significative-theme-color-relative-to-palette)",
              }}
              whileHover={{ scale: 1.025 }}
              whileTap={{ scale: 1 }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Subtitle>{project.name}</Subtitle>
                  <Button
                    onClick={() => {
                      navigate(
                        'local-subdomain-w/settings{"app": "' +
                          project.url +
                          '"}'
                      );
                    }}
                    style={{
                      background:
                        "var(--significative-theme-color-relative-to-palette)",
                    }}
                    className="enabled"
                  >
                    <Text>Go</Text>
                  </Button>
                </div>
                <br />
                <br />
                <Text>{project.description}</Text>
              </div>
            </motion.div>
          ))}
        </Grid>
      </Container>
      <Separe />
      <Container
        width={"90%"}
        height={"auto"}
        style={{
          display: "flex",
          flexDirection: "column",
          marginLeft: "5%",
          marginRight: "5%",
        }}
      >
        <Box
          x="auto"
          y="auto"
          style={{
            padding: "2%",
            background: "var(--significative-theme-color-opacity)",
            backdropFilter: "blur(5px)",
            zIndex: 2,
          }}
        >
          <Title>Contact me :)</Title>
        </Box>
        <Box
          x="auto"
          y="100%"
          style={{
            padding: "2.5%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ width: "100%", maxWidth: "1150px" }}>
            <Appear delay={0.05}>
              <Input
                style={{ width: "100%" }}
                placeholder={"What is your name ?"}
                type="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Appear>
            <Appear delay={0.1}>
              <Input
                style={{ width: "100%", marginTop: "2%" }}
                placeholder={"What is your email address ?"}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Appear>
            <div style={{ width: "100%", marginTop: "2%" }}>
              <Appear delay={0.15}>
                <TextArea
                  style={{
                    width: "100%",
                    resize: "none",
                    height: "100%",
                    minHeight: "200px",
                  }}
                  placeholder={"What do you want to tell me ?"}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </Appear>
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "2%",
              }}
            >
              <Appear delay={0.2}>
                <Button
                  className={
                    VerifyEntry(name).byLength(3) &&
                    VerifyEntry(email).byRegex("@") &&
                    VerifyEntry(message).byLength(2) &&
                    !isProcessing
                      ? "enabled"
                      : isProcessing
                      ? "process disabled"
                      : "disabled"
                  }
                  onClick={() => {
                    setProcessState(true);
                    SendMessage(GenerateMessage(message, email, name))
                      .finally(() => {
                        setProcessState(false);
                        setTimeout(() => {
                          setButtonText("Send ✈");
                        }, 4000);
                      })
                      .then(() => {
                        setButtonText("Sended 😀");
                        setName("");
                        setEmail("");
                        setMessage("");
                      })
                      .catch(() => setButtonText("Failed 😑"));
                  }}
                >
                  {buttonText}
                </Button>
              </Appear>
            </div>
          </div>
        </Box>
      </Container>
    </ParallaxProvider>
  );
};
