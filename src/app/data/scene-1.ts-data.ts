import { SceneElement } from "./types";
import { UseLang } from "../../modules/lang";


import Video1 from "../../videos/introduction-1.mov";
import Video2 from "../../videos/introduction-2.mov";

export const SceneData: SceneElement = {
  SceneData: {
    className: "scene",
    name: "WelcomePage",
  },
  SceneTexts: {
    title: UseLang({ FR: "Johan Montorfano", US: "Johan Montorfano" }),
    subtitle: UseLang({
      FR:
        "Coucou, je suis Johan! Je suis content que tu sois sur mon portfolio😎. Scroll vers le bas pour en voir plus.",
      US:
        "Hi, I'm Johan and I'm glad to let you visit my website portfolio😊. Scroll to the bottom to see more !",
    }),
  },
  SceneVideos: {
    1: Video1,
    2: Video2,
  },
};
