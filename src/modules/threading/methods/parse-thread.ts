//[string, string] => threadCode, parser

export const ParseThread = (threadCode: (() => void)): [string, string] => {
    
    const str = threadCode
      .toString()
      .match(/^\s*function\s*\(\s*\)\s*\{(([\s\S](?!\}$))*[\s\S])/);

    if(str !== null && str[1] !== undefined) return [str[1], "ParseThread"];
    
    return ["", ""];
}