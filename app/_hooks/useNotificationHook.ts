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
import { usePushNotifications } from "./usePushNotifications";

export const useNotifications = (userId?: string, maxNotifications = 50) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const { showBrowserNotification, permission } = usePushNotifications();

  useEffect(() => {
    const notificationsRef = collection(db, "notifications");
    const q = query(
      notificationsRef,
      orderBy("timestamp", "desc"),
      limit(maxNotifications)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notificationData: Notification[] = [];

      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const data = change.doc.data();
          const notification = {
            id: change.doc.id,
            title: data.title,
            message: data.message,
            type: data.type,
            timestamp: data.timestamp.toDate(),
            read: data.read,
            userId: data.userId,
          };

          // Check if this is a new notification (not from initial load)
          console.log({
            loading,
            permission,
            notification,
            userId,
          });
          if (!loading) {
            // Show browser notification for new notifications
            if (
              permission === "granted" &&
              (!userId ||
                !notification.userId ||
                notification.userId === userId)
            ) {
              showBrowserNotification(notification.title, {
                body: notification.message,
                tag: `notification-${notification.id}`,
                data: {
                  notificationId: notification.id,
                  type: notification.type,
                },
              });
            }
          }
        }
      });

      // Get all notifications
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
  }, [userId, maxNotifications, showBrowserNotification, permission, loading]);

  return { notifications, loading };
};
