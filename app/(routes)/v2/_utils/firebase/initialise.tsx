import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAJGIgUzhTqWD0i4GTfOYaKXf6kn45RFmM",
  authDomain: "notifications-fd96d.firebaseapp.com",
  projectId: "notifications-fd96d",
  storageBucket: "notifications-fd96d.firebasestorage.app",
  messagingSenderId: "150858804472",
  appId: "1:150858804472:web:656568e02b81d759015f0d",
};

export const fireBaseInitialized = initializeApp(firebaseConfig);
