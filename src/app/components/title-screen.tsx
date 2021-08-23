import { Container, Parallax, Subtitle, Title } from "montorfano-utils";
import { useMouseMove } from "../hooks/use-mouse-move";
import "./title-screen.scss";
import { useEffect, useState } from "react";
import { RewardsSubject } from "./rewards";

/**
 * THIS BOX WILL FOLLOW THE CURSOR POSITION
 */
export const Shape = (props: { color: string; size: number }): JSX.Element => {
  const [x, y] = useMouseMove(50);

  return (
    <div
      style={{
        transform: "translate(-50%, -50%)",
        background: props.color,
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
  const [scale, setScale] = useState<number>(0);
  const [hexGeneratorColorReference, setHexGeneratorColorReference] = useState<
    [number, number, number]
  >([generateColorEntry(), generateColorEntry(), generateColorEntry()]);
  const [palette, setPalette] = useState([
    generateHexColor(80),
    generateHexColor(60),
    generateHexColor(40),
    generateHexColor(20),
  ]);
  const isMobileDevice =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
      navigator.userAgent
    );

  useEffect(() => {
    if (isMobileDevice) setScale(26);
  }, [isMobileDevice]);

  function updatePalette() {
    setHexGeneratorColorReference([generateColorEntry(), generateColorEntry(), generateColorEntry()]);
    if (!isMobileDevice) setScale(8);
    setPalette([
      generateHexColor(70),
      generateHexColor(50),
      generateHexColor(30),
      generateHexColor(10),
    ]);
    if (!isMobileDevice) setTimeout(() => setScale(0), 500);
    RewardsSubject.next("clickedonthecircle");
  }

  function generateColorEntry() {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return Math.floor(Math.random() * 255) - (isDark ? 50 : 0);
  }

  function generateHexColor(hexDifference: number, monochromatic: boolean = false) {
    if (monochromatic || useMonochromatic)
      monochromatic = true;

    const hexEntries = [
      hexGeneratorColorReference[0] + hexDifference,
      hexGeneratorColorReference[1] + hexDifference,
      hexGeneratorColorReference[2] + hexDifference
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
    <Container onClick={updatePalette} style={{ maxWidth: "100vw" }}>
      <Container className="shapes" style={{ background: palette[0] }}>
        <Shape color={palette[1]} size={35 + scale} />
        <Shape color={palette[2]} size={25 + scale} />
        <Shape color={palette[3]} size={15 + scale} />
      </Container>

      <Container className={"title-screen-content"}>
        <Parallax y={[-50, 50]}>
          <Title style={{ textAlign: "center" }}>Johan Montorfano</Title>
          <Subtitle style={{ textAlign: "center" }}>Full-Stack Dev</Subtitle>
        </Parallax>
      </Container>
    </Container>
  );
};
