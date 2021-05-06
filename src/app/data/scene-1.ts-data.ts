import { SceneElement } from "./types";
import { UseLang } from "../../modules/doc/lang";


import Video1 from "../../videos/intro-1.mp4";
import Image1 from "../../images/intro-1.jpg";

export const SceneData: SceneElement = {
  SceneData: {
    className: "scene",
    name: "WelcomePage",
  },
  SceneTexts: {
    title: UseLang({ FR: "Johan Montorfano", US: "Johan Montorfano" }),
    subtitle: UseLang({
      FR:
        "Coucou, content de te voir ici. Scroll vers le bas pour en voir plus.",
      US:
        "Hi, glad to see you here. Scroll to the bottom to see more !",
    }),
    buttonGithub: UseLang({
      FR: "Voir le code sur GitHub",
      US: "See the code on GitHub"
    }),
    buttonMail: UseLang(
      {
        FR: "Me contacter",
        US: "Contact me"
      }
    )
  },
  SceneVideos: {
    1: Video1,
  },
  SceneImages: {
    1: Image1
  }
};
