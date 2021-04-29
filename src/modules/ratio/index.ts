import { RatioData } from './types';

const UseRatioBuilderFunction = ( direction: "horizontal" | "vertical") => {
    return (ratio: number, targetSize: number): RatioData => ({
        width: "horizontal"? ratio * targetSize : targetSize,
        height: "vertical"? targetSize : ratio * targetSize
    })
}

export const UseHorizontalRatio = UseRatioBuilderFunction("horizontal");
export const UseVerticalRatio = UseRatioBuilderFunction("vertical");