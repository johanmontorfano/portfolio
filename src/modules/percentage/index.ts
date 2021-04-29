import React from "react";

const UsePercentageBuilderFunction = ( range: "w" | "h") => {
    return (percentage: number, referenceDocument: Element) => ((range === "h"? referenceDocument.getBoundingClientRect().width / 100 : referenceDocument.getBoundingClientRect().height / 100) * percentage)
}

export const UseWidthPercentage = UsePercentageBuilderFunction("w");
export const UseHeightPercentage = UsePercentageBuilderFunction("h");