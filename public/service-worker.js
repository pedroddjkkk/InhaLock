self.addEventListener("install", () => {
  console.log("Service worker installed ");
});

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
  const SERVER_URL =
    process.env.NODE_ENV === "production"
      ? "https://inha-lock.vercel.app/api/user/subscription"
      : "http://localhost:3000/api/user/subscription";
  const response = await fetch(SERVER_URL, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(subscription),
  });
  return response.json();
};

self.addEventListener("activate", async () => {
  try {
    const applicationServerKey = urlB64ToUint8Array(
      "BIPPr8KRaGiQr6ksQk3bSv-h9HoRdl40Z352XuG46ThdZLH8JO07Lx4XPdzM0B5wOPYVf80njYe01H8DPAM7GHw"
    );
    const options = { applicationServerKey, userVisibleOnly: true };
    const subscription = await self.registration.pushManager.subscribe(options);
    const response = await saveSubscription(subscription);
    console.log(response);
  } catch (err) {
    console.log("Error", err);
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

self.addEventListener("notificationclick", function (event) {
  console.log("Notification clicked");
  console.log(event);
  event.notification.close();
});
