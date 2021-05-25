//edit entries of json element

/**
 *
 * @param entries ["name"; "new value"]
 */
export const EditJSONEntries = (
  entries: [string, any][],
  element: { [key: string]: any }
): typeof element => {
  //copy the provided object
  const newElement = Object.assign({}, element);

  //apply changes of each entry provided
  entries.forEach((entry) => {
    //edit value
    newElement[entry[0]] = entry[1];
  });

  //return the new object
  return newElement;
};

export const JSONToArray = (jsonElement: { [key: string]: any }) => {
  const array = [];

  for (const key in jsonElement) {
    array.push(jsonElement[key]);
  }

  return array;
};

//verify the entry data to avoid big conditions and shorten some lines
export const VerifyEntry = (entry: string) => {
  return {
    byLength: (length: number) => entry.length >= length,
    byRegex: (regex: string) => {
      let statement = true;
      regex.split("").forEach((reg) => {
        statement = entry.indexOf(reg) > -1;
      });

      return statement;
    },
    get: () => entry
  };
};

//avoid having void data
export const AvoidEmpty = (value: any, onEmpty: any) => {
  return value !== undefined ? value : onEmpty
}