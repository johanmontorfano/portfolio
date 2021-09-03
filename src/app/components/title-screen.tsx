import {
  Container,
  navigate,
  Parallax,
  Subtitle,
  Title,
} from "montorfano-utils";
import { useMouseMove } from "../hooks/use-mouse-move";
import "./title-screen.scss";
import { useEffect, useState } from "react";
import { RewardsSubject } from "./rewards";
import { InstagramSVG } from "../sources/instagram.svg";
import { TwitterSVG } from "../sources/twitter.svg";

/**
 * THIS BOX WILL FOLLOW THE CURSOR POSITION
 */
export const Shape = (props: { color: string; size: number }): JSX.Element => {
  const [x, y] = useMouseMove(50);

  return (
    <div
      style={{
        transform: "translate(-50%, -50%)",
        border: "2px solid " + props.color,
        width: props.size * 10,
        height: props.size * 10,
        borderRadius: "50em",
        position: "absolute",
        left: x,
        top: y,
        transition: "all " + (150 + props.size * 8 + "ms") + " ease",
        willChange: "top left background",
      }}
    />
  );
};

export const TitleScreen = () => {
  const [useMonochromatic, setUseMonochromatic] = useState<boolean>(false);
  const [hasBeenDisplayed, setDisplayingState] = useState<boolean>(false);
  const [hexGeneratorColorReference, setHexGeneratorColorReference] = useState<
    [number, number, number]
  >([generateColorEntry(), generateColorEntry(), generateColorEntry()]);
  const [palette, setPalette] = useState([
    generateHexColor(80),
    generateHexColor(60),
    generateHexColor(40),
    generateHexColor(20),
  ]);

  window.addEventListener("load", () =>
    setTimeout(() => setDisplayingState(true), 400)
  );
  useEffect(() => {
    generateHexColorReference();
    updatePalette();
  }, []);
  useEffect(() => {
    document.documentElement.style.setProperty("--blue-ryb", palette[2]);
  }, [palette]);

  function updatePalette() {
    generateHexColorReference();
    setPalette([
      generateHexColor(70),
      generateHexColor(50),
      generateHexColor(30),
      generateHexColor(10),
    ]);
  }

  function generateColorEntry() {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return Math.floor(Math.random() * 255 - (isDark ? 50 : 0));
  }

  /**
   * generateHexColorReferenec set an hex color reference, it's useful because it avoids to have too light colors that
   * makes contrast difficulty
   */
  function generateHexColorReference() {
    let colorReference: [number, number, number] = [
      generateColorEntry(),
      generateColorEntry(),
      generateColorEntry(),
    ];

    //color tolerance is computed by computing generated entries average value and comparing it to the maximum tolerance value for lightening
    //it avoids to get too light colors. higher is the tolerance value, longer the generating process will be and lighten the color reference will be
    while (
      (colorReference[0] + colorReference[1] + colorReference[2]) / 3 >=
      200
    ) {
      colorReference = [
        generateColorEntry(),
        generateColorEntry(),
        generateColorEntry(),
      ];
    }

    setHexGeneratorColorReference(colorReference);
  }

  /**
   * generateHexColor returns an hex color relative to the hex color reference
   *
   * @param hexDifference darken difference
   * @param monochromatic should be n&b
   */
  function generateHexColor(
    hexDifference: number,
    monochromatic: boolean = false
  ) {
    if (monochromatic || useMonochromatic) monochromatic = true;

    const hexEntries = [
      hexGeneratorColorReference[0] + hexDifference,
      hexGeneratorColorReference[1] + hexDifference,
      hexGeneratorColorReference[2] + hexDifference,
    ];

    if (monochromatic) {
      const monochromaticEntry = generateColorEntry();
      hexEntries[0] = monochromaticEntry;
      hexEntries[1] = monochromaticEntry;
      hexEntries[2] = monochromaticEntry;
    }

    return (
      "rgb(" + hexEntries[0] + "," + hexEntries[1] + "," + hexEntries[2] + ")"
    );
  }

  return (
    <Container
      onClick={() => {
        updatePalette();
        RewardsSubject.next("clickedonthecircle");
      }}
      style={{ maxWidth: "100vw" }}
    >
      <Container className="shapes" style={{ background: palette[2] }} />
      <Container className={"title-screen-content"}>
        <Parallax y={[-150, 50]}>
          <div className="svg-content">
            <InstagramSVG />
            <TwitterSVG />
          </div>
        </Parallax>
        <div className="center">
          <Parallax y={[-150, 50]}>
            <div
              style={{
                transform: "scale(" + (hasBeenDisplayed ? 1 : 8) + ")",
                backgroundColor: hasBeenDisplayed ? "unset" : "white",
              }}
            >
              <Title
                style={{
                  textAlign: "center",
                }}
              >
                Johan Montorfano
              </Title>
              <Subtitle style={{ textAlign: "center" }}>
                Full-Stack Dev
              </Subtitle>
            </div>
          </Parallax>
        </div>
      </Container>
    </Container>
  );
};
