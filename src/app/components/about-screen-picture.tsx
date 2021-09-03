import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { resolveImage } from "../../gcp/scripts/storage";

export const AboutScreenPicture = () => {
  const [currentPictureURL, updatePictureURL] = useState<string>("");
  const [scale, setScale] = useState<number>(1);
  const [ref, inView] = useInView({ triggerOnce: true });

  useEffect(() => {
    resolveImage("memoji").then((url) => {
      updatePictureURL(url);
    });
  }, []);
  useEffect(() => {
    if (inView)
      setTimeout(() => {
        setScale(0.75);
        resolveImage("me2")
          .then((url) => {
            updatePictureURL(url);
          })
          .finally(() => {
            setScale(1.15);

            setTimeout(() => setScale(1), 500);
          });
      }, 1500);
  }, [inView]);

  return (
    <img
      ref={ref}
      src={currentPictureURL}
      style={{
        width: "15vw",
        height: "15vw",
        borderRadius: "50em",
        objectFit: "cover",
        transform: `scale(${scale})`,
      }}
    />
  );
};
