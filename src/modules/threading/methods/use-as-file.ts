//[string, string] => fileCode, parser

export const useAsFile = (fileCode: string): [string, string] => {
    return [fileCode, "fileParser"];
}