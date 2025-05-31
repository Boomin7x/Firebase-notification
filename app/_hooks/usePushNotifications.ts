// hooks/usePushNotifications.ts
import { useState, useEffect, useCallback } from "react";
import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "../utils/firebase";

export const usePushNotifications = () => {
  const [permission, setPermission] =
    useState<NotificationPermission>("default");
  const [token, setToken] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    const checkSupport = async () => {
      try {
        // Check if notifications are supported
        const supported =
          (typeof window !== "undefined" &&
            "Notification" in window &&
            "serviceWorker" in navigator &&
            window.location.protocol === "https:") ||
          window.location.hostname === "localhost";

        setIsSupported(supported);

        if (typeof window !== "undefined") {
          setPermission(Notification.permission);
        }
      } catch (error) {
        console.error("Error checking notification support:", error);
        setIsSupported(false);
      }
    };

    checkSupport();
  }, []);

  const requestPermission = async () => {
    if (!isSupported) {
      throw new Error("Push notifications are not supported in this browser");
    }

    try {
      const permission = await Notification.requestPermission();
      setPermission(permission);

      console.log("requested permission:", permission);

      if (permission === "granted" && messaging) {
        // Get FCM token
        const fcmToken = await getToken(messaging, {
          vapidKey:
            "BBl6XHc58B7m54cvcaGA-1piIoFE5GX5C8eONhkvMJYwZGHTUGKeuoWzTBwWgW8u41bMJMULQ9J6YVs_--zaox4", // Add your VAPID key here
        });

        if (fcmToken) {
          setToken(fcmToken);
          console.log("FCM Token:", fcmToken);
          // You can send this token to your server to send push notifications
        }
      }

      return permission;
    } catch (error) {
      console.error("Error requesting notification permission:", error);
      throw error;
    }
  };

  const showBrowserNotification = useCallback(
    (title: string, options?: NotificationOptions) => {
      if (permission === "granted") {
        try {
          new Notification(title, {
            tag: "notification",
            requireInteraction: false,
            ...options,
          });
        } catch (error) {
          console.error("Error showing browser notification:", error);
        }
      }
    },
    [permission]
  );

  // Listen for foreground messages
  useEffect(() => {
    if (messaging && permission === "granted") {
      try {
        const unsubscribe = onMessage(messaging, (payload) => {
          console.log("Foreground message received:", payload);

          if (payload.notification) {
            showBrowserNotification(
              payload.notification.title || "New Notification",
              {
                body: payload.notification.body,
                icon: payload.notification.icon,
                data: payload.data,
              }
            );
          }
        });

        return () => {
          if (typeof unsubscribe === "function") {
            unsubscribe();
          }
        };
      } catch (error) {
        console.error("Error setting up message listener:", error);
      }
    }
  }, [messaging, permission, showBrowserNotification]);

  return {
    permission,
    token,
    isSupported,
    requestPermission,
    showBrowserNotification,
  };
};
