import { useState, useEffect, useRef } from "react";
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
  const [error, setError] = useState<string | null>(null);
  const { showBrowserNotification, permission } = usePushNotifications();

  // Track initial load
  const isInitialLoad = useRef(true);

  useEffect(() => {
    let unsubscribe: (() => void) | null = null;

    const setupListener = async () => {
      try {
        const notificationsRef = collection(db, "notifications");
        const q = query(
          notificationsRef,
          orderBy("timestamp", "desc"),
          limit(maxNotifications)
        );

        unsubscribe = onSnapshot(
          q,
          (snapshot) => {
            const notificationData: Notification[] = [];

            // Handle new notifications
            if (!isInitialLoad.current) {
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

                  // Show browser notification for new notifications
                  if (
                    permission === "granted" &&
                    (!userId ||
                      !notification.userId ||
                      notification.userId === userId)
                  ) {
                    console.log("Showing browser notification:", notification);
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
              });
            }

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
            setError(null);

            // Mark initial load as complete
            if (isInitialLoad.current) {
              isInitialLoad.current = false;
            }
          },
          (error) => {
            console.error("Firestore listener error:", error);
            setError(`Failed to load notifications: ${error.message}`);
            setLoading(false);
          }
        );
      } catch (error) {
        console.error("Error setting up Firestore listener:", error);
        setError(
          `Failed to connect to notifications: ${(error as Error).message}`
        );
        setLoading(false);
      }
    };

    setupListener();

    // Cleanup function
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [userId, maxNotifications, permission, showBrowserNotification]);

  return { notifications, loading, error };
};
