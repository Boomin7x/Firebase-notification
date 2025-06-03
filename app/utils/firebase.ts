// lib/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD03fCwB4EoR_rN25cl7P8vw2k_bRh8Ca4",
  authDomain: "maliya-4b31c.firebaseapp.com",
  projectId: "maliya-4b31c",
  storageBucket: "maliya-4b31c.firebasestorage.app",
  messagingSenderId: "294257136832",
  appId: "1:294257136832:web:d3250dd77f21dd6e294925",
  measurementId: "G-DWCBD1JDR3",
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
