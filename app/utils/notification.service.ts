import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "./firebase";

export const createNotification = async (
  title: string,
  message: string,
  type: "info" | "success" | "warning" | "error" = "info",
  userId?: string
) => {
  try {
    const docRef = await addDoc(collection(db, "notifications"), {
      title,
      message,
      type,
      timestamp: Timestamp.now(),
      read: false,
      userId: userId || null,
    });

    console.log("Notification created with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error creating notification: ", error);
    throw error;
  }
};
