export const UseNonUndefined = (value: any): typeof value => {
    if(value !== undefined || value !== null) return value;

    return "";
}