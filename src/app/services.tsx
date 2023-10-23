"use client";

import { useEffect } from "react";

export default function Services() {
  useEffect(() => {
    const requestNotificationPermission = async () => {
      const permission = await window.Notification.requestPermission();
      if (permission !== "granted") {
        throw new Error("Permissão não garantida para notificações!");
      }
    };

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js", { scope: "/" })
        .then((registration) => {
          console.log(
            "Service worker registered successfully. Scope:",
            registration.scope
          );
        })
        .catch((error) => {
          console.error("Service worker registration failed:", error);
        });
    }

    requestNotificationPermission();
  }, []);

  return <> </>;
}
