import {
  Container,
  Subtitle,
  Title,
  Progressive,
  Box,
  Text,
  Button,
  Handwrite,
  ShareIt,
  Input,
  Separe,
} from "montorfano-utils";
import { GithubSVG } from "../../sources/github.svg";
// for svg-content
import "../screens/title-screen.scss";

// montorfano-utils project screen
export const MontorfanoUtils_ProjectScreen = () => {
  return (
    <Container>
      <Progressive>
        {(data) => {
          return (
            <Container>
              <Box
                style={{
                  height: "100vh",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Title
                  style={{
                    fontWeight: "bolder",
                    transform: `scale(${
                      data.progress > 1
                        ? 1
                        : data.progress < 0
                        ? 0
                        : data.progress
                    })`,
                    willChange: "transform",
                    transitionDuration: "0ms",
                  }}
                >
                  MONTORFANO-UTILS
                </Title>
              </Box>
              <Container style={{ height: "10vh" }}>
                {[
                  [
                    "Button",
                    <Button style={{ background: "var(--azure)" }}>
                      Hello !
                    </Button>,
                    "flex-start",
                    38,
                  ],
                  [
                    "Handwrite",
                    <Handwrite style={{ margin: 0 }}>Bonjour !</Handwrite>,
                    "flex-end",
                    38,
                  ],
                  [
                    "Input",
                    <Input
                      placeholder="Holà..."
                      style={{
                        fontSize: "calc(var(--regular-font-size) + 8px)",
                      }}
                    />,
                    "center",
                    20,
                  ],
                ].map((statement: any, i) => {
                  return (
                    <ComponentExample
                      key={i}
                      name={statement[0]}
                      component={statement[1]}
                      align={statement[2]}
                      progress={data.progress}
                      progress_speed={statement[3]}
                    />
                  );
                })}
                <Box
                  style={{
                    zIndex: 0,
                    position: "absolute",
                    background:
                      "linear-gradient(180deg, " +
                      (window.matchMedia("(prefers-color-scheme: dark)").matches
                        ? "rgba(0, 0, 0, 0)"
                        : "rgba(255, 255, 255, 0)") +
                      " 0%, var(--significative-theme-color) 70%)",
                    height: "100vh",
                    marginTop: -(data.progress * 100) + 30 + "vh",
                    width: "100%",
                    transitionDuration: "0ms",
                  }}
                />
              </Container>
            </Container>
          );
        }}
      </Progressive>
      <Progressive>
        {(data) => {
          return (
            <Container style={{ height: "40vh", zIndex: 1 }}>
              <Container
                style={{
                  padding: "3%",
                  marginTop: -(data.progress * 30) - 60 + "vh",
                  position: "absolute",
                  width: "92%",
                  transitionDuration: "0ms",
                }}
              >
                <Subtitle>About</Subtitle>
                <Text style={{ maxWidth: 800 }}>
                  <strong>montorfano-utils</strong> is a package with all of my
                  utils for <strong>building websites</strong>, and a bunch of{" "}
                  <strong>variable manipulation tools</strong>. Everything you
                  see on this website is <strong>made possible</strong> by this
                  package.
                </Text>
                <Container
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    width: "100%",
                  }}
                >
                  <div>
                    <Subtitle
                      style={{ textAlign: "right", marginBottom: "0%" }}
                    >
                      How to access it.
                    </Subtitle>
                    <div
                      className="svg-content"
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <GithubSVG repo="franndjoo/montorfano-utils" />
                    </div>
                  </div>
                </Container>
              </Container>
            </Container>
          );
        }}
      </Progressive>
    </Container>
  );
};

const ComponentExample = (props: {
  name: string;
  component: JSX.Element;
  align: any;
  progress: number;
  progress_speed: number;
}) => {
  return (
    <Box
      style={{
        zIndex: 1,
        position: "absolute",
        display: "flex",
        width: "92%",
        justifyContent: props.align,
        padding: "3%",
        marginTop:
          -(props.progress * 100) + (100 - props.progress_speed) + "vh",
        transitionDuration: "0ms",
      }}
    >
      <div>
        <Text style={{ margin: 0, fontSize: "var(--s-tiny-font-size)" }}>
          {"<" + props.name + "/>"}
        </Text>
        {props.component}
      </div>
    </Box>
  );
};
