import { FirebaseAppInstance } from "..";
//this function is used to loads links defined in the database for the footer
export const GetFooterLinks = (): Promise<
  { name: string; entries: { name: string; path: string }[] }[]
> => {
  return new Promise((resolve, reject) => {
    FirebaseAppInstance.firestore()
      .collection("global")
      .doc("footer")
      .get()
      .then((snapshot) => {
        //use the links value which should be on the snapshot
        resolve(snapshot.data()?.links);
      })
      .catch(() => {
        resolve([{ name: "Error", entries: [] }]);
      });
  });
};
