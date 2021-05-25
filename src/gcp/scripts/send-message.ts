import { FirebaseAppInstance } from "..";

//this is the message type
export type MessageElement = {
  message: string;
  email: string;
  name: string;
  date: string;
};

//generate a message package
export const GenerateMessage = (
  message: string,
  email: string,
  name: string
): MessageElement => ({
  message: message,
  email: email,
  name: name,
  date: new Date().toDateString(),
});

//send a message to the database in the messages collection
export const SendMessage = (message: MessageElement): Promise<void> =>
  new Promise((resolve, reject) => {
    FirebaseAppInstance.firestore()
      .collection("messages")
      .add(message)
      .then(() => {
        resolve();
      })
      .catch(() => reject());
  });
