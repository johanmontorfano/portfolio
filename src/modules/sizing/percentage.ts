/**
 *
 * @param percentage
 * @returns {number}number
 */
export const UsePercentage = (percentage: number) =>
  (window.outerWidth / 100 + window.outerHeight / 100) * percentage;

/**
 * @desc Automatically returns a percentage relative to the biggest dimension
 * @param percentage
 * @returns {number}number
 */
export const UseUniDirectionnalPercentage = (percentage: number) =>
  ((window.outerWidth > window.outerHeight
    ? window.outerWidth
    : window.outerHeight) /
    100) *
  percentage;
