"use client";
import React, { ReactNode, useEffect } from "react";

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
  return <div>{children}</div>;
};

export default MailLayout;
