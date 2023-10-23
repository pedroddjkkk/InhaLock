self.addEventListener("install", () => {
  console.log("Service worker instalado");
});

const SERVER_URL = "https://inha-lock.vercel.app";

const urlB64ToUint8Array = (base64String) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

const saveSubscription = async (subscription) => {
  const response = await fetch(SERVER_URL + "/api/user/subscription", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(subscription),
  });
  return response.json();
};

self.addEventListener("message", async (event) => {
  if (event.data === "activate") {
    try {
      const applicationServerKey = urlB64ToUint8Array(
        "BIPPr8KRaGiQr6ksQk3bSv-h9HoRdl40Z352XuG46ThdZLH8JO07Lx4XPdzM0B5wOPYVf80njYe01H8DPAM7GHw"
      );
      const options = { applicationServerKey, userVisibleOnly: true };
      const subscription = await self.registration.pushManager.subscribe(
        options
      );
      const response = await saveSubscription(subscription);
      console.log(response);
    } catch (err) {
      console.log("Error", err);
    }
  }
});

self.addEventListener("push", function (event) {
  if (event.data) {
    const data = event.data.json();
    self.registration.showNotification(data.title, data.options);
  } else {
    console.log("Push event but no data");
  }
});

self.addEventListener("notificationclick", async function (event) {
  console.log(event);
  const securityCode = event.notification.data.securityCode;

  if (event.action === "open") {
    console.log(securityCode);
    const res = await fetch(SERVER_URL + "/api/esp/remote/" + securityCode, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  event.notification.close();
});
