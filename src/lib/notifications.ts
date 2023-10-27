import prisma from "./db";
const webpush = require("web-push");

export async function sendNotificationBySecurityCode(
  securityCode: string,
  content: object
) {
  const sessions = await prisma.session.findMany({
    where: {
      user: {
        lockers: {
          some: {
            securityCode: securityCode,
          },
        },
      },
    },
    include: {
      user: true,
    },
  });

  sessions.forEach((session) => {
    if (session.pushSubscription && session.user.sendNotification) {
      webpush.sendNotification(
        session.pushSubscription,
        JSON.stringify(content)
      );
    }
  });
}
