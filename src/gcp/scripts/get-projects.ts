import { FirebaseAppInstance } from "..";

export type ProjectDefinition = {
  name: string;
  url: string;
  description: string;
};

export const GetProjects = (): Promise<ProjectDefinition[]> => {
  return new Promise((resolve, reject) => {
    FirebaseAppInstance.firestore()
      .collection("portfolio-data")
      .doc("projects")
      .get()
      .then((snapshot) => {
        const data: any = snapshot.data();
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
