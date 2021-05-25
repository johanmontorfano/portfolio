export type Unit = { value: number; unit: string };

//computeRatio function auto defines which dimension is needed
//if no dimension is defined, it can't defines it and returns 0 as error marker
//if both dimensions are defined, it can't defines it too and returns 0 as error marker

//the computed value is a number uysing the sizes
//if the sizes are string with unit, the prop size is converted to number
//the unit is added after computations. if there is no units, the functions set px as unit

//to do that, we use the function useWithUnit which returns {unit: string, value: number}
//and the compressUnit function convert the useWithUnit return statement to a string
const useWithUnit = (statement: string | number): Unit => {
  if (typeof statement !== "number") {
    //extracting the value
    const value = parseInt(statement);

    //extracting the unit suppposing that the unit is after the value
    const unit = statement.split(value.toString())[1];

    return { unit: unit, value: value };
  }

  //return statement when unit is a number, parseInt statement prevents typescript to throw an error
  return {
    unit: "px",
    value: parseInt(typeof statement === "string" ? statement : "0"),
  };
};

export const compressUnit = (statement: Unit): string =>
  statement.value + statement.unit;

export const computeRatio = (ratio: number, x?: number | string, y?: number | string) => {
  //get the missing axis
  const axisToCompute: "x" | "y" = x !== undefined ? "y" : "x";
  //get the unit package
  const givenAxisValue: Unit = useWithUnit(
    axisToCompute === "x" && y !== undefined
      ? y
      : axisToCompute === "y" && x !== undefined
      ? x
      : "0px"
  );

  return {
    value: givenAxisValue.value * ratio,
    unit: givenAxisValue.unit,
  };
};
