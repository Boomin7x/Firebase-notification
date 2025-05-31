// lib/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAJGIgUzhTqWD0i4GTfOYaKXf6kn45RFmM",
  authDomain: "notifications-fd96d.firebaseapp.com",
  projectId: "notifications-fd96d",
  storageBucket: "notifications-fd96d.firebasestorage.app",
  messagingSenderId: "150858804472",
  appId: "1:150858804472:web:656568e02b81d759015f0d",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

import { getMessaging } from "firebase/messaging";

// Initialize Firebase Cloud Messaging
let messaging: any = null;
if (typeof window !== "undefined") {
  messaging = getMessaging(app);
}

export { messaging };
