import { ResponsiveChilds } from "../../modules/responsive/childrens";
import { ResponsiveComponent } from "../../modules/responsive/responsive";
import { AnimatedAppear } from "../appear";
import { ResponsiveTemplateComponentType } from "./types";

const TemplateComponentsFactory = (
  TemplateElement: ResponsiveTemplateComponentType | undefined
): ((props: { children: any }) => JSX.Element) => {
  if (TemplateElement === undefined)
    return (props: { children: any }) => <div>{props.children}</div>;

  return (props: { children: any }) => (
    <TemplateElement>{props.children}</TemplateElement>
  );
};

export const ResponsiveGrid = (props: {
  gridLeftContent: any[];
  gridRightContent: any[];
  gridLeftContentTemplate?: ResponsiveTemplateComponentType;
  gridRightContentTemplate?: ResponsiveTemplateComponentType;
  allowedDimensions: {
    width: number | string;
    height: number | string;
  };
  //dimensions per column on the desktop experience
  dimensionsPerColumn?: (number | string)[];
}): JSX.Element => {
  return (
    <AnimatedAppear>
      <div style={props.allowedDimensions}>
        <ResponsiveComponent
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows:
              "repeat(" + props.gridLeftContent.length + ", 1fr)",
            gap: "2.5rem",
            placeItems: "center",
          }}
          mobile_style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gridTemplateRows: "auto 1fr",
            rowGap: "2rem",
            placeItems: "center",
          }}
          useBasicResponsiveRules
        >
          {props.gridLeftContent.map((leftContent, index) => {
            //define templates as usable component case

            const RCTemplate = TemplateComponentsFactory(
              props.gridRightContentTemplate
            );
            const LCTemplate = TemplateComponentsFactory(
              props.gridLeftContentTemplate
            );

            if (props.gridRightContent[index] !== undefined) {
              return [
                <LCTemplate>{leftContent}</LCTemplate>,
                <RCTemplate>{props.gridRightContent[index]}</RCTemplate>,
              ];
            }

            return null;
          })}
        </ResponsiveComponent>
      </div>
    </AnimatedAppear>
  );
};
