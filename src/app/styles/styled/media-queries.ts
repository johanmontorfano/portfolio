import { ClassNamesValues } from "./values";

export const ClassNamesMediaQueries: {[key: string]: {small: string, normal: string}} = {
    "big-font-size-current": {
        small: ClassNamesValues["big-font-size-mobile"][0],
        normal: ClassNamesValues["big-font-size"][0]
    },
    "semi-big-font-size-current": {
        small: ClassNamesValues["semi-big-font-size-mobile"][0],
        normal: ClassNamesValues["semi-big-font-size"][0]
    },
    "middle-font-size-current": {
        small: ClassNamesValues["middle-font-size-mobile"][0],
        normal: ClassNamesValues["middle-font-size"][0]
    },
    "normal-font-size-current": {
        small: ClassNamesValues["normal-font-size-mobile"][0],
        normal: ClassNamesValues["normal-font-size"][0]
    },
    "tiny-font-size-current": {
        small: ClassNamesValues["tiny-font-size-mobile"][0],
        normal: ClassNamesValues["tiny-font-size"][0]
    }
}