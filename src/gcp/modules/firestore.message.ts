import { MessageData } from './../types';
import { FirebaseFirestore, FirestoreBatch } from "../firebase";

const MessagesCollection = FirebaseFirestore.collection("messages");

export const PushMessage = (data: MessageData) => {
  return MessagesCollection.add(data);
};
