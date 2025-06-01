import { getMessaging, getToken, isSupported } from "firebase/messaging";
import { fireBaseInitialized } from "./initialise";
import { VAPID_KEY } from "./keys";

const messaging = isSupported().then((supported) =>
  supported ? getMessaging(fireBaseInitialized) : null
);
export const getTokenFn = async () => {
  const msg = await messaging;
  if (!msg) {
    console.log("cannot get messaging instance");
    return;
  }
  const token = await getToken(msg, { vapidKey: VAPID_KEY });

  try {
    if (!token) {
      console.log(
        "No registration token available. Request permission to generate one."
      );
      return;
    }
    console.log("Token retrieved successfully:", token);

    return token;
  } catch (err) {
    console.log("An error occurred while retrieving token. ", err);
    console.error("Error retrieving token:", err);
  }
};

// Export the messaging promise as v2Messaging
export const v2Messaging = messaging;
