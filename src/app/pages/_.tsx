import { useState } from "react";
import { GenerateMessage, SendMessage } from "../../gcp/scripts/send-message";
import {
  Text,
  Container,
  Appear,
  Title,
  Separe,
  Box,
  Button,
  Input,
  VerifyEntry,
  TextArea,
  ShareIt,
} from "montorfano-utils";
import { TitleScreen } from "../components/title-screen";
import { AboutScreen } from "../components/about-screen";
import { ProjectScreen } from "../components/project-screen";

export const Page = () => {
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
      <AboutScreen />
      <Separe />
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Box
          style={{
            padding: "2%",
            paddingTop: "1%",
            paddingBottom: "1%",
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
          <div
            style={{
              marginLeft: "5%",
              marginRight: "5%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <ProjectScreen />
          </div>
        </Box>
      </Container>
      <Separe />
      <Container
        style={{
          width: "100%",
        }}
      >
        <Box
          style={{
            padding: "2%",
            paddingTop: "2%",
            paddingBottom: "2%",
            position: "sticky",
            top: 0,
            background: "var(--significative-theme-color-opacity)",
            backdropFilter: "blur(5px)",
            zIndex: 2,
          }}
        >
          <Title style={{ margin: 0 }}>Contact me :)</Title>
        </Box>
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            height: "100%",
            marginLeft: "5%",
            marginRight: "5%",
            width: "90%",
          }}
        >
          <Appear>
            <Text style={{ marginBottom: 5 }}>Name</Text>
          </Appear>
          <Appear delay={0.05}>
            <Input
              style={{
                width: "100%",
                fontSize: "calc(var(--regular-font-size) + 8px)",
              }}
              placeholder={"What is your name ?"}
              type="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Appear>
          <Appear delay={0.1}>
            <Text style={{ marginBottom: 5 }}>E-mail</Text>
          </Appear>
          <Appear delay={0.15}>
            <Input
              style={{
                width: "100%",
                fontSize: "calc(var(--regular-font-size) + 8px)",
              }}
              placeholder={"What is your email address ?"}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Appear>
          <Appear delay={0.2}>
            <Text style={{ marginBottom: 5 }}>Your message</Text>
          </Appear>
          <div style={{ width: "100%" }}>
            <Appear delay={0.25}>
              <TextArea
                style={{
                  width: "100%",
                  resize: "none",
                  height: "100%",
                  minHeight: "200px",
                  fontSize: "calc(var(--regular-font-size) + 8px)",
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
            }}
          >
            <Appear delay={0.3}>
              <Button
                className={
                  VerifyEntry(name).byLength(3) &&
                  VerifyEntry(email).byRegex("@") &&
                  VerifyEntry(message).byLength(10) &&
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
                style={{
                  marginTop: "7%",
                }}
              >
                {buttonText}
              </Button>
            </Appear>
          </div>
        </Box>
      </Container>
    </div>
  );
};
