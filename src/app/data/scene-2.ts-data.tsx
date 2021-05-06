import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  GetLikes,
  ManipulateLikes,
} from "../../gcp/modules/firestore.like-button";
import { Express_SVG } from "../../svg/express-svg";
import { MySQL_SVG } from "../../svg/sql-svg";
import { SceneElement } from "./types";
import { UseLang } from "../../modules/doc/lang";
import { GetClassnameValue } from "../styles/styled";
import { ResponsiveText } from "../../components/responsive/responsive-text";
import { MorphHeart } from "../../svg/heart-svg";

let pushed = false;

const SVGContainer = (props: { children: any }) => (
  <motion.svg>{props.children}</motion.svg>
);

const SVGMorphExample = () => {
  //which path is gnna be displayed on animate, changes at every animation complete event
  const [animatedPathID, setAnimatedPathID] = useState<number>(1);

  const paths = {
    1: {
      d:
        "M100 50C100 77.6142 77.6142 100 50 100C22.3858 100 0 77.6142 0 50C0 22.3858 22.3858 0 50 0C77.6142 0 100 22.3858 100 50Z",
    },
    2: {
      d:
        "M 100 50 C 100 77.6142 77.6142 100 49 51 C 22.3858 100 0 77.6142 0 50 C 0 22.3858 22.3858 0 49 51 C 77.6142 0 100 22.3858 100 50 Z",
    },
    3: {
      d:
        "M85.5 34C85.5 45.5 83 51 63 73.5C43 96 17 70.5 4 46C-9 21.5 12 -8.49999 41.5 2.5C71 13.5 85.5 22.5 85.5 34Z",
    },
  };

  return (
    <motion.svg
      initial="1"
      viewBox="0 0 100 100"
      width="100%"
      height="100%"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      animate={animatedPathID.toString()}
      onMouseEnter={() =>
        setAnimatedPathID((...prev) => (prev[0] === 3 ? 1 : prev[0] + 1))
      }
      onClick={() =>
        setAnimatedPathID((...prev) => (prev[0] === 3 ? 1 : prev[0] + 1))
      }
    >
      <motion.path
        variants={paths}
        transition={{
          duration: 1,
          bounce: 0.6,
        }}
        fill="rgb(0,0,0)"
      />
    </motion.svg>
  );
};

const FirebaseLikeButton = () => {
  const [likes, setLikes] = useState<number>(0);
  const [liked, setLiked] = useState<boolean>(false);

  const UpdateLikes = () => {
    GetLikes()
      .then((snapshot) => {
        const likes = snapshot.data();

        if (likes !== undefined && typeof likes.likes === "number")
          setLikes(likes.likes);
      })
      .catch(() => setLikes(-1));
  };
  const AddLike = () => ManipulateLikes("add").finally(UpdateLikes);
  const RemoveLike = () => ManipulateLikes("remove").finally(UpdateLikes);

  useEffect(() => UpdateLikes(), []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MorphHeart
        state={liked}
        MotionSVGProps={{
          initial: { width: "10%", scale: 1 },
          animate: { fill: liked ? "red" : "black" },
          whileHover: { width: "15%", cursor: "pointer" },
          onTap: () => {
            setLiked(!liked);
            if (liked) RemoveLike();
            else AddLike();
          },
        }}
      />
      <ResponsiveText>{likes.toString() + " likes"}</ResponsiveText>
    </div>
  );
};

export const SceneData: SceneElement = {
  SceneData: {
    className: "scene",
    name: "Skills",
  },
  SceneTexts: {
    subtitle1: UseLang({
      FR: "Qu'est-ce que je fais.",
      US: "What kind of work I do",
    }),
    description1: UseLang({
      FR: "Je suis un développeur front-end. J'utilise des frameworks comme:",
      US: "I'm a front-end developer, I use frameworks like:",
    }),
    subtitle2: UseLang({ FR: "Qu'est-ce que je fais d'autre.", US: "More." }),
    description2: UseLang({
      FR:
        "Je suis aussi un developpeur back-end, je fais des serveurs et j'utilise des frameworks avec/comme:",
      US:
        "I'm also a back-end developer, I make servers and use databases with frameworks like:",
    }),
    bannerTipTitle: UseLang({ FR: "Aide", US: "Tip" }),
    bannerTipContent: UseLang({
      FR:
        "Les examples à côté de mes compétences sont interactifs, joue avec !",
      US: "Examples are interactives, play with it !",
    }),
  },
  SceneTables: {
    1: {
      text: [
        UseLang({
          FR:
            "React, pour faire des interfaces rapides et puissantes facilement",
          US: "React, to build easily powerful and lightweight elements",
        }),
        UseLang({
          FR:
            "Framer, pour faire de belles animations et transitions réactives aux interactions.",
          US:
            "Framer, to build stunning animations and transitions reactives to gestures.",
        }),
        UseLang({
          FR: "SVGs, pour faire de belles formes et les animer avec Framer",
          US: "SVGs, to make pretty shape and animate them with Framer",
        }),
      ],
      comps: [
        <div style={{ fontSize: "150%" }}>Hello React World :)</div>,
        <motion.div
          drag
          dragConstraints={{
            top: 0,
            left: 0,
            bottom: 10,
            right: 10,
          }}
          dragElastic={0.5}
          initial={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            width: "55%",
            height: "100%",
            borderRadius: "50%",
            background: GetClassnameValue("linear-gradient"),
            userSelect: "none",
          }}
          whileHover={{
            scale: 1.1,
          }}
          whileTap={{
            scale: 1,
            width: "100%",
            height: "100%",
            borderRadius: "0%",
          }}
          whileDrag={{
            width: "100px",
            height: "100px",
            borderRadius: GetClassnameValue("element-border-radius-size"),
          }}
        >
          🤔
        </motion.div>,
        <SVGMorphExample />,
      ],
    },
    2: {
      text: [
        UseLang({
          US:
            "Firebase, to use powerful queries with Firestore, APIs like AuthAPI or RemoteConfig and build scalable apps.",
          FR:
            "Firebase, pour faire des requêtes rapides avec Firestore, utiliser des APIs comme AuthAPI et construire des apps scalables.",
        }),
        UseLang({
          US: "Express, to build servers from scratch easily.",
          FR: "Express, pour faire des serveurs facilement.",
        }),
        UseLang({
          US: "MySQL, because it's a database standard.",
          FR: "MySQL, parce que c'est un standard.",
        }),
      ],
      comps: [
        <FirebaseLikeButton />,
        <SVGContainer>
          <Express_SVG />
        </SVGContainer>,
        <SVGContainer>
          <MySQL_SVG />
        </SVGContainer>,
      ],
    },
  },
};
