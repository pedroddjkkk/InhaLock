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
        .then(async (registration) => {
          console.log('Service Worker registrado com sucesso!', registration);

          if (!registration.active) return;

          registration.active.postMessage("activate");
        })
        .catch((error) => {
          console.error('Erro ao registrar o Service Worker:', error);
        });
    }

    requestNotificationPermission();
  }, []);

  return <> </>;
}
