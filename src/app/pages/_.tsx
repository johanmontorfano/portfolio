import { useEffect, useRef, useState } from "react";
import { GetProjects, ProjectDefinition } from "../../gcp/scripts/get-projects";
import { motion } from "framer-motion";
import { GenerateMessage, SendMessage } from "../../gcp/scripts/send-message";
import {
  Text,
  Container,
  Appear,
  Title,
  Subtitle,
  Separe,
  Box,
  Grid,
  Button,
  navigate,
  Input,
  VerifyEntry,
  TextArea,
  JSONToArray,
  ShareIt,
} from "montorfano-utils";
import { TitleScreen } from "../components/title-screen";
import { AboutScreen } from "../components/about-screen";

export const Page = () => {
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
  const [buttonText, setButtonText] = useState<
    "Sent 😀" | "Failed 😑" | "Send ✈"
  >("Send ✈");

  //useEffect [] handles:
  //set project data
  useEffect(() => {
    //load project data from firebase
    GetProjects().then((data) => setProjectData(JSONToArray(data)));
  }, []);

  return (
    <div id="_">
      <ShareIt
        title="Johan's Portfolio"
        url="https://www.johanmontorfano.com"
      />
      <Container
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TitleScreen />
      </Container>
      <Container
        style={{
          width: "100%",
          minHeight: "100vh",
          position: "relative",
          background: "var(--significative-theme-color)",
        }}
      >
        <AboutScreen />
      </Container>
      <Separe />
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          marginLeft: "5%",
          marginRight: "5%",
          width: "90%",
          height: "auto",
        }}
      >
        <Box
          style={{
            padding: "2%",
            position: "sticky",
            top: 0,
            background: "var(--significative-theme-color-opacity)",
            backdropFilter: "blur(5px)",
            zIndex: 2,
            width: "auto",
            height: "auto",
          }}
        >
          <Title>Projects</Title>
        </Box>
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
          {projectData.map((project, i) => (
            <motion.div
              style={{
                borderRadius: "var(--border-radius)",
                border:
                  "2px solid var(--significative-theme-color-relative-to-palette)",
                padding: "1%",
              }}
              whileHover={{ scale: 1.025 }}
              whileTap={{ scale: 1 }}
              key={i}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                  padding: "var(--padding)",
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
                      navigate(project.url);
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
                <Text>{project.description}</Text>
              </div>
            </motion.div>
          ))}
        </Grid>
      </Container>
      <Separe />
      <Container
        style={{
          width: "90%",
          height: "auto",
          display: "flex",
          flexDirection: "column",
          marginLeft: "5%",
          marginRight: "5%",
        }}
      >
        <Box
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
          style={{
            padding: "2.5%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <div style={{ width: "100%", maxWidth: "1150px" }}>
            <Appear>
              <Text>Name</Text>
            </Appear>
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
              <Text>E-mail</Text>
            </Appear>
            <Appear delay={0.15}>
              <Input
                style={{ width: "100%", marginTop: "2%" }}
                placeholder={"What is your email address ?"}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Appear>
            <Appear delay={0.2}>
              <Text>Your message</Text>
            </Appear>
            <div style={{ width: "100%", marginTop: "2%" }}>
              <Appear delay={0.25}>
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
              <Appear delay={0.3}>
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
                        setButtonText("Sent 😀");
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
    </div>
  );
};
