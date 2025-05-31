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
    // Check if notifications are supported
    setIsSupported(
      typeof window !== "undefined" &&
        "Notification" in window &&
        "serviceWorker" in navigator
    );

    if (typeof window !== "undefined") {
      setPermission(Notification.permission);
    }
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

  const browserNotification = (
    title: string,
    options?: NotificationOptions
  ) => {
    if (permission === "granted") {
      new Notification(title, {
        // icon: "/notification-icon.png", // Add an icon to your public folder
        // badge: "/notification-badge.png",
        tag: "notification",
        // renotify: true,
        ...options,
      });
    }
  };

  const showBrowserNotification = useCallback(browserNotification, [
    permission,
  ]);

  // Listen for foreground messages
  useEffect(() => {
    if (messaging && permission === "granted") {
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

      if (typeof unsubscribe === "function") {
        return () => unsubscribe();
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
