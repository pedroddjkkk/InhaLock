export interface Session {
  sessionId: string;
  user: Lucia.DatabaseUserAttributes & { userId: string };
  activePeriodExpiresAt: Date;
  idlePeriodExpiresAt: Date;
  state: "active" | "idle";
  fresh: boolean;
};