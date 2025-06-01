// import { messaging } from "@/app/utils/firebase"
import { onMessage } from "firebase/messaging";
import { v2Messaging } from "./conficureFCM";

export const getInaAppMessages = async () => {
  const messaging = await v2Messaging;
  if (!messaging) {
    console.error(
      "Firebase Messaging is not initialized or supported in this browser."
    );
    return;
  }
  onMessage(messaging, (payload) => {
    console.log("Message received. ", payload);
    const { title, body } = payload.notification ?? {};
    if (title || body) {
      new Notification(title || "New message", {
        body: body || "",
      });
    }
    // ...
    // You can handle the in-app message here, e.g., show a notification or update UI
  });
};
