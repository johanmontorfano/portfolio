import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const app = initializeApp({
    apiKey: "AIzaSyDOa1aZmgCioyqkS_LxUja7HME_78QySiU",
    authDomain: "portfolio-ccddc.firebaseapp.com",
    projectId: "portfolio-ccddc",
    storageBucket: "portfolio-ccddc.appspot.com",
    messagingSenderId: "504671919081",
    appId: "1:504671919081:web:fb0ed46bdc1bc6d12c0978",
    measurementId: "G-98GYQ65P6Y"
});

export const firestore = getFirestore(app);
export const realtime = getDatabase(app, "https://portfolio-ccddc-default-rtdb.firebaseio.com/");