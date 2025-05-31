// hooks/useNotifications.ts
import { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../utils/firebase";
import { Notification } from "../utils/types";

export const useNotifications = (userId?: string, maxNotifications = 50) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const notificationsRef = collection(db, "notifications");
    const q = query(
      notificationsRef,
      orderBy("timestamp", "desc"),
      limit(maxNotifications)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notificationData: Notification[] = [];

      snapshot.forEach((doc) => {
        const data = doc.data();
        notificationData.push({
          id: doc.id,
          title: data.title,
          message: data.message,
          type: data.type,
          timestamp: data.timestamp.toDate(),
          read: data.read,
          userId: data.userId,
        });
      });

      // Filter by userId if provided
      const filteredNotifications = userId
        ? notificationData.filter((n) => !n.userId || n.userId === userId)
        : notificationData;

      setNotifications(filteredNotifications);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [userId, maxNotifications]);

  return { notifications, loading };
};
