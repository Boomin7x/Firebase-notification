import { useEffect, useState } from "react";
import { getTokenFn } from "../_utils/firebase/conficureFCM";
import { requestPermission } from "../_utils/firebase/requestPermission";
import { getInaAppMessages } from "../_utils/firebase/inAppMessages";

const useFCM = () => {
  const [permission, setPermission] =
    useState<NotificationPermission>("default");
  const [fcmToken, setFcmToken] = useState<string>();
  useEffect(() => {
    const getPermission = async () => {
      const perm = await requestPermission();
      if (!perm) {
        console.error("Notification permission request was denied");
        return;
      }
      console.log("requested permission:", permission);
      setPermission(perm);

      if (permission === "granted") {
        const newToken = await getTokenFn();
        setFcmToken(newToken);
        console.log("token baby:", fcmToken);
        await getInaAppMessages();
      }
    };
    getPermission();
  }, [permission, fcmToken]);

  //   console.log({ permission });

  return {
    permission,
  };
};

export default useFCM;
