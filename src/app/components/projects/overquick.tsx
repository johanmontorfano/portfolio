import {
  Text,
  Container,
  Progressive,
  Subtitle,
  Title,
  Separe,
  Parallax,
} from "montorfano-utils";
import { useEffect, useState } from "react";
import { GithubSVG } from "../../sources/github.svg";
// for svg-content
import "../screens/title-screen.scss";

// overquick
export const Overquick_ProjectScreen = () => {
  return (
    <Container>
      <Progressive>
        {({ progress }) => {
          return (
            <Container style={{ height: "auto", transform: "rotateX(0deg)" }}>
              <DistortedRow lines_number={20} progress={progress} />
            </Container>
          );
        }}
      </Progressive>
      <Container
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "130vh",
        }}
      >
        <Progressive>
          {({ progress }) => {
            return (
              <Container
                style={{
                  height: "100vh",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    maxWidth: 800,
                    opacity: progress + 0.2,
                    transform: `translateY(${progress + 0.1 * 4}vh)`,
                  }}
                >
                  <Container>
                    <Subtitle>
                      <span style={{ display: "block" }}>
                        Light-speed storage
                        <sup style={{ fontSize: "var(--s-tiny-font-size)" }}>
                          1
                        </sup>
                        ,
                      </span>
                      <span style={{ display: "block" }}>
                        designed for security
                        <sup style={{ fontSize: "var(--s-tiny-font-size)" }}>
                          2
                        </sup>
                        ,
                      </span>
                      <span style={{ display: "block" }}>easy to manage.</span>
                    </Subtitle>
                  </Container>
                  <Container>
                    <Text>
                      <sup style={{ fontSize: "var(--s-tiny-font-size)" }}>
                        1
                      </sup>{" "}
                      Overquick uses an <strong>hybrid storage method</strong>.
                      It helps you have
                      <strong> shorter</strong> load times when you are trying
                      to load or reload an
                      <strong> heavy</strong> ressource and helps load multiple
                      ressources at the same time without{" "}
                      <strong>busying</strong> disk.
                    </Text>
                    <Text>
                      <sup style={{ fontSize: "var(--s-tiny-font-size)" }}>
                        2
                      </sup>{" "}
                      Overquick is shipped with <strong>AES-256</strong>{" "}
                      encryption methods. It means that you can automatically
                      encrypt files. Overquick will <strong>take care</strong>{" "}
                      of <strong>decrypting</strong> and{" "}
                      <strong>encrypting</strong> it without having you to make
                      anything but the encryption set up.
                    </Text>

                    <div
                      className="svg-content"
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                      }}
                    >
                      <Text>Source code on</Text>
                      <GithubSVG repo="franndjoo/overquick" />
                    </div>
                  </Container>
                </div>
              </Container>
            );
          }}
        </Progressive>
      </Container>
    </Container>
  );
};

// create a distorded lines row
const DistortedRow = (props: { lines_number: number; progress: number }) => {
  // store the array for map
  const [item, setItem] = useState<number[]>([]);

  // create the array
  useEffect(() => {
    for (let i = 0; i <= props.lines_number; i++) {
      setItem((prev) => [...prev, i]);
    }
  }, []);

  // height is computed this way to put the overquick label in the middle with flex
  return (
    <>
      {item.map((id) => {
        return <DistortedLine top={10 * id} progress={props.progress} />;
      })}
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: "rotateX(40deg)",
          WebkitTransform: "rotateX(40deg)",
        }}
      >
        <Title>OVERQUICK</Title>
      </div>
    </>
  );
};

// line for distorsion effect
const DistortedLine = (props: { top: number; progress: number }) => {
  return (
    <div
      style={{
        width:
          (props.progress > 1 ? 1 : props.progress < 0 ? 0 : props.progress) *
            100 +
          "vw",
        transitionDuration: "0ms",
        height: 2,
        top: props.top,
        position: "absolute",
        background:
          "var(--significative-theme-color-relative-to-palette-reversed)",
      }}
    />
  );
};
