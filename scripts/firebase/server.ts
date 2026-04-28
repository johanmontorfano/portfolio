import "server-only";

import firebase from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import { getApps } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";

function getInstance() {
    const found = getApps().find((app) => app.name === "[DEFAULT]");

    if (found) return found;

    return firebase.initializeApp({
        credential: firebase.credential.cert({
            projectId: process.env.NEXT_PUBLIC_FB_PROJECT_ID,
            clientEmail: process.env.FB_CLIENT_EMAIL,
            privateKey: process.env.FB_SERVICE_KEY?.replace(/\\n/g, "\n"),
        }),
        storageBucket: process.env.NEXT_PUBLIC_FB_STORAGE_BUCKET
    });
}


const admin = getInstance();

export const firestore = getFirestore(admin);
export const auth = getAuth(admin);
export const storage = getStorage(admin);
