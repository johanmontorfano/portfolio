type ObjectEditionSettings = {
  edit: string;
  value: any;
}[];

export const EditJSONObject = (
  JSONElement: { [x: string]: any },
  EditSettings: ObjectEditionSettings
) => {
  const duplicatedElement = Object.assign({}, JSONElement);
  //apply modifications pushed in each element
  EditSettings.forEach((editInstructions) => {
    duplicatedElement[editInstructions.edit] = editInstructions.value;
  });

  return duplicatedElement;
};

/** 
 * * generates a EditJSONObject function which edit only a specific var
 * @param {JSON} SpecificJSONElement - The Element that you wants to edit
**/
export const EditJSONObjectFactory = (SpecificJSONElement: {
  [x: string]: any;
}) => (EditSettings: ObjectEditionSettings) =>
  EditJSONObject(Object.assign(SpecificJSONElement), EditSettings);

/**
 * 
 * @param Element - Gets an element to copy
 * @returns a duplicated element
 */
export const duplicate = (Element: Object) => (Object.assign({}, Element));