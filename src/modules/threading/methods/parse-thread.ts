// ! [string, string] => threadCode, parser

/**
 * @param threadCode thread code function passed in BuildWorker
 * @returns 
 */
export const ParseThread = (threadCode: (() => void)): [string, string] => {
    
    const str = threadCode
      .toString()
      .match(/^\s*function\s*\(\s*\)\s*\{(([\s\S](?!\}$))*[\s\S])/);

    if(str !== null && str[1] !== undefined) return [str[1], "ParseThread"];
    
    return ["", ""];
}