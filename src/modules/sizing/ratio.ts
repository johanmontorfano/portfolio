import { RatioData } from './types';

/**
 * 
 * @param ratio - which ratio is gonna be used
 * @param target - what is the target size for the lowest dimension
 * @returns width, height - the computed dimensions provided by the ratio
 */
export const UseRatio = (ratio: number, target: number): RatioData => ({
    width: ratio < 1? target : ratio * target,
    height: ratio < 1? ratio * target : target
});