import { useEffect, useState } from "react";
import { ResponsiveText } from "../responsive/responsive-text";

export const AnimatedAppear = (props: { children: any }) => {
  return props.children;
};

export const ScriptyAppear = (props: { text: string; wait?: number }) => {
  const [splittedText] = useState<string[]>(props.text.split(""));
  const [printedText, setPrintedtText] = useState<string[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    setTimeout(() => {
      interval = setInterval(() => {
        setPrintedtText((...prev) => [
          ...prev[0],
          splittedText[prev[0].length],
        ]);
      }, 25);
    }, props.wait);

    return function cleanup() {
      clearInterval(interval);
    };
  }, []);

  return (
    <ResponsiveText>
      <div>{printedText}</div>
    </ResponsiveText>
  );
};

export const MultiScriptyAppear = (props: { texts: string[] }) => {
  return (
    <div style={{ maxHeight: "89%", overflow: "auto" }}>
      {props.texts.map((text, i) => {
        return <ScriptyAppear text={text} />;
      })}
    </div>
  );
};
