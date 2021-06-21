import { FirebaseAppInstance } from './../index';

export type LinkListProp = { name: string; entries: { name: string; path: string }[] }[]

//this function is used to loads links defined in the database for the footer
export const GetFooterLinks = (): Promise<LinkListProp> => {
  return new Promise((resolve) => {
    FirebaseAppInstance.firestore()
      .collection("global")
      .doc("footer")
      .get()
      .then(
        (snapshot) => {
          //use the links value which should be on the snapshot
          resolve(snapshot.data()?.links);
        }
      )
      .catch(() => {
        resolve([{ name: "Error", entries: [] }]);
      });
  });
};
