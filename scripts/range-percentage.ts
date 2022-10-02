/** get the progression percentage of a value between x and y
 * ex: what is the distance of -2 between -4 and 5
 */
export function getProgressionPercentage(of: number, between: [number, number], preventBoudariesUsage = false) {
    /** get the range of the between values */
    const range = positive(between[0] - between[1]);
    /** compute the distance of the `of` value and `between[0]` */
    const ofDistance = positive(of - between[0]);
    return of <= between[0] ?  0 : of >= between[1] && !preventBoudariesUsage ? 1 : ofDistance / range;
}

/** make any number positive */
function positive(number: number) {
    if (number < 0) return number * -1
    return number;
}