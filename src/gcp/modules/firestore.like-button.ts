import { FirebaseFirestore, FirestoreBatch } from "../firebase";

const LikesDocument = FirebaseFirestore.collection("misc").doc("numbers");

export const ManipulateLikes = (method: "add" | "remove") => {
  return LikesDocument.update({
    likes: FirestoreBatch.FieldValue.increment(method === "add" ? 1 : -2)
  });
};
export const GetLikes = () => {
  return LikesDocument.get();
};
