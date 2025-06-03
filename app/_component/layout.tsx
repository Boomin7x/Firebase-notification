"use client";
import React, { ReactNode, useEffect } from "react";
import useFCM from "../(routes)/v2/_hooks/useFCM";

const MailLayout = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then((reg) => console.log("Service Worker registered", reg))
        .catch((err) =>
          console.error("Service Worker registration failed", err)
        );
    }
  }, []);

  const { permission } = useFCM();
  return <>{children}</>;
};

export default MailLayout;
