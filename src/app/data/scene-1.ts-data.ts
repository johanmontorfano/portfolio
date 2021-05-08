import { PageElement } from "./types";
import { UseLang } from "../../modules/doc/lang";


import Image1 from "../../images/intro-1.jpg";
import Image2 from "../../images/intro-2.jpg";

export const PageData: PageElement = {
  PageData: {
    className: "scene",
    name: "WelcomePage",
  },
  PageTexts: {
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
  PageImages: {
    1: Image1,
    2: Image2
  }
};
