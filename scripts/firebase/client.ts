"use client";

import { initializeApp } from "firebase/app";
import { initializeAuth, setPersistence, inMemoryPersistence } from "firebase/auth";

const config = {
    apiKey: process.env.NEXT_PUBLIC_FB_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FB_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FB_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FB_MSG_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FB_APP_ID
};

export const firebase = initializeApp(config);
export const auth = initializeAuth(firebase);

// NOTE: we disable persistence on the auth object as we will only use cookies
// for authentication
await setPersistence(auth, inMemoryPersistence);
