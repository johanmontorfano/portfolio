import firebase from "firebase";

//FILES WHICH USES FIREBASE HAVE TO USE FirebaseAppInstance

//store the firebase app instance
//firebase configuration refers to: webapp
export const FirebaseAppInstance = firebase.initializeApp({
  apiKey: "AIzaSyDOa1aZmgCioyqkS_LxUja7HME_78QySiU",
  authDomain: "portfolio-ccddc.firebaseapp.com",
  projectId: "portfolio-ccddc",
  storageBucket: "portfolio-ccddc.appspot.com",
  messagingSenderId: "504671919081",
  appId: "1:504671919081:web:fb0ed46bdc1bc6d12c0978",
  measurementId: "G-98GYQ65P6Y",
});

//initialize analytics & perf
FirebaseAppInstance.analytics();
FirebaseAppInstance.performance();