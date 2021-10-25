import {
  Container,
  Box,
  Title,
  Text,
  Input,
  TextArea,
  Button,
  VerifyEntry,
} from "montorfano-utils";
import { useState } from "react";
import {
  SendMessage,
  GenerateMessage,
} from "../../../gcp/scripts/send-message";

// screen to send a message
export const MessageScreen = () => {
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
  const [buttonText, setButtonText] = useState<"Sent" | "Failed" | "Send">(
    "Send"
  );

  return (
    <Container
      style={{
        width: "100%",
      }}
    >
      <Title style={{ margin: 0, textAlign: "center" }}>Contact me</Title>
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
        <Container
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr)",
          }}
        >
          <div>
            <Text style={{ marginBottom: 5 }}>Name</Text>
            <Input
              style={{
                width: "95%",
                fontSize: "calc(var(--regular-font-size) + 8px)",
              }}
              placeholder={"What is your name ?"}
              type="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <Text style={{ marginBottom: 5 }}>E-mail</Text>

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
          </div>
        </Container>
        <Text style={{ marginBottom: 5 }}>Your message</Text>

        <div style={{ width: "100%" }}>
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
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
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
                    setButtonText("Send");
                  }, 4000);
                })
                .then(() => {
                  setButtonText("Sent");
                  setName("");
                  setEmail("");
                  setMessage("");
                })
                .catch(() => setButtonText("Failed"));
            }}
            style={{
              marginTop: "7%",
            }}
          >
            {buttonText}
          </Button>
        </div>
      </Box>
    </Container>
  );
};
