import { UseLang } from "./../../modules/doc/lang";
import { PageElement } from "./types";

export const PageData: PageElement = {
  PageData: {
    className: "scene",
    name: "CurriculumVitae",
  },
  PageTexts: {
    miniCards: {
      1: UseLang({
        FR: "Compétences",
        US: "Skills",
      }),
      2: UseLang({
        FR: "Langages connus",
        US: "Language skills",
      }),
      3: UseLang({
        FR: "Je parle",
        US: "I speak",
      }),
      4: UseLang({
        FR: "Portfolio de projets",
        US: "Project's Portfolio",
      }),
    },
  },
  PageTables: {
    paraphs: [
      [
        UseLang({
          FR: "Qui je suis ?",
          US: "Who I am ?",
        }),
        UseLang({
          FR: "Je suis Johan. Je vis en France, autour de Lyon.",
          US: "I'm Johan. I live in France, around Lyon.",
        }),
      ],
      [
        UseLang({
          FR: "Qu'est-ce que je sais faire.",
          US: "What I can do ?",
        }),
        UseLang({
          FR:
            "Je suis un 'freelancer dev'. Je fais en particulier des sites et des backends. Je suis spécialisé dans la création d'interfaces responsives et animées qui répondent aux gestes par des micro-interactions.",
          US:
            "I'm a freelancer dev. I do especially websites and backends. I'm specialized in building responsives and animated interfaces which responds to gestures by animations by micro-interactions.",
        }),
      ],
      [
        UseLang({
          FR: "Qu'est-ce qui me motive ?",
          US: "What motivates me ?",
        }),
        UseLang({
          FR:
            "Programmer est quelque chose qui me passiones. J'aime la programmation et j'aime aussi le bon travail, je sais construire des sites assez rapidement avec le front-end et le back-end fait par moi-même.",
          US:
            "Programming is something that passionates me. I love programming and I like good job, I build websites quickly with both front-end and back-end ended by myself.",
        }),
      ],
    ],
  },
};
