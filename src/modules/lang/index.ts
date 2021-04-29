import getUserLocale from "get-user-locale";

const lang = getUserLocale().split("-")[1];

export const UseLang = (textVariants: {[key: string]: string}): string => {
    return textVariants[lang] || textVariants["en-US"]
}