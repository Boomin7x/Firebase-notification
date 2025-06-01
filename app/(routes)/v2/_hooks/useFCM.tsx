import { useEffect, useState } from "react";
import { getTokenFn } from "../_utils/firebase/conficureFCM";
import { requestPermission } from "../_utils/firebase/requestPermission";

const useFCM = () => {
  const [permission, setPermission] =
    useState<NotificationPermission>("default");
  const [fcmToken, setFcmToken] = useState<string>();
  useEffect(() => {
    const getPermission = async () => {
      await requestPermission((permission) => setPermission(permission));
      console.log("requested permission:", permission);

      if (permission === "granted") {
        await getTokenFn((token) => setFcmToken(token));
        console.log("token baby:", fcmToken);
      }
    };
    getPermission();
  }, [permission, fcmToken]);

  //   console.log({ permission });

  return {
    permission,
    requestPerm: () =>
      requestPermission((permission) => setPermission(permission)),
  };
};

export default useFCM;
