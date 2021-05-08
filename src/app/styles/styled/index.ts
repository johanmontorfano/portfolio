import { ClassNamesMediaQueries } from "./media-queries";
import styled from "styled-components";
import { Classnames, ClassnamesSignature } from "./classnames";
import { ClassNamesValues } from "./values";

export const ComputeClassnames = () => {
  let styledElement = ``;

  Classnames.forEach((className) => {
    styledElement += `
            .${className} {
                ${ClassNamesValues[className][1]}: ${ClassNamesValues[className][0]}
            }
        `;
    if (ClassNamesMediaQueries[className] !== undefined) {
      styledElement += `
            @media only screen and (max-width: 1023px) and (orientation: portrait) {
                .${className} {
                    ${ClassNamesValues[className][1]}: ${ClassNamesMediaQueries[className].small}
                }
            }
            @media only screen and (min-width: 1024px) or ((max-width: 1023px) and (orientation: landscape)) {
                .${className} {
                    ${ClassNamesValues[className][1]}: ${ClassNamesMediaQueries[className].normal}
                }
            }
        `;
    }
  });

  return styled.div`
    ${styledElement}

    min-width: 100%
    max-width: 100vw
  `;
};

export const ComposeClassnameString = (classnames: ClassnamesSignature[]): string => {
    let string = "";

    classnames.forEach((classname) => {
        string += " " + classname;
    });

    return string;
}

export const GetClassnameValue = (classname: ClassnamesSignature): string => {
    return ClassNamesValues[classname][0]
}