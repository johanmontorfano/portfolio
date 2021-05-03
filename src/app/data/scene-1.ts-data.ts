import { SceneElement } from "./types";
import { UseLang } from "../../modules/doc/lang";


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
        "Coucou, content de te voir ici 😎. Scroll vers le bas pour en voir plus.",
      US:
        "Hi, glad to see you here😊. Scroll to the bottom to see more !",
    }),
  },
  SceneVideos: {
    1: Video1,
    2: Video2,
  },
};
