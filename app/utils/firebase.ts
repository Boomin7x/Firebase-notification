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

import { getMessaging, isSupported, Messaging } from "firebase/messaging";

// Initialize Firebase Cloud Messaging
let messaging: Messaging | null = null;
if (typeof window !== "undefined") {
  messaging = getMessaging(app);
}

const initializeMessaging = async () => {
  if (typeof window !== "undefined") {
    try {
      const supported = await isSupported();
      if (supported) {
        messaging = getMessaging(app);
        console.log("Firebase Messaging initialized successfully");
      } else {
        console.log("Firebase Messaging is not supported in this browser");
      }
    } catch (error) {
      console.error("Error initializing Firebase Messaging:", error);
    }
  }
};

// Initialize messaging when the module loads
if (typeof window !== "undefined") {
  initializeMessaging();
}

export { messaging };
