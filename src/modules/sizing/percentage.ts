/**
 *
 * @param percentage
 * @returns {number}number
 */
export const UsePercentage = (percentage: number) =>
  (window.innerWidth / 100 + window.innerHeight / 100) * percentage;

/**
 * @desc Automatically returns a percentage relative to the biggest dimension
 * @param percentage
 * @returns {number}number
 */
export const UseUniDirectionnalPercentage = (percentage: number) =>
  ((window.innerWidth > window.innerHeight
    ? window.innerWidth
    : window.innerHeight) /
    100) *
  percentage;
