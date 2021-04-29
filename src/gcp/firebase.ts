import { BannerFlow } from "./../components/banner/index";
import firebase from "firebase";
import { UseLang } from "../modules/lang";

const FirebaseConfiguration = require("./firebase.config.json");

//initialize firebase
const FirebaseApp = firebase.initializeApp(FirebaseConfiguration);

//initialize basic functionnalities
FirebaseApp.analytics();
FirebaseApp.performance();

//basic firebase functions for modules
export const FirebaseFirestore = FirebaseApp.firestore();
export const FirebaseRealtime = FirebaseApp.database();
export const RealtimeBatch = firebase.database;
export const FirestoreBatch = firebase.firestore;

FirebaseRealtime.ref("offline")
  .onDisconnect()
  .remove((err) => {
    if (err)
      BannerFlow.next({
        title: "Connection",
        content: UseLang({
          FR: "Votre connexion est trop instable pour se connecter au serveur",
          US: "Your connection is too bad to be connected to the server",
        }),
        color: "red",
        duration: 5000,
      });
  });
