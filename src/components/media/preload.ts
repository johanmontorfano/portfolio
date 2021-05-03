export const PreloadData = (
  loadStack: { as: string; path: string }[]
): Promise<{ [key: string]: any }> => {
  return new Promise((resolve, reject) => {
    const loadedData: { [entry: string]: any } = {};

    //consider using fs.readFile

    loadStack.forEach((element) => {
      fetch(element.path).then((res) => {
        res.blob().then((blob) =>
        
            blob
              .stream()
              .getReader()
              .read()
              .then((v) => {
                loadedData[element.as] = v.value
              })
          
        );
      });
    });

    resolve(loadedData);
  });
};
