import { useEffect, useState } from "react";
import axios from "axios";
import { Session } from "../types/auth";
import { Prisma } from "@prisma/client";

export function useSession() {
  const [session, setSession] = useState<Session>();
  const [user, setUser] = useState<Prisma.UserGetPayload<{}>>();
  const [loading, setLoading] = useState(true);
  const [unlogged, setUnlogged] = useState(false);

  useEffect(() => {
    async function loadSession() {
      const { data } = await axios({
        method: "GET",
        url: "/api/auth/session",
        validateStatus: () => true,
      });

      if (data.session && data.user) {
        setSession(data.session);
        setUser(data.user);
      } else if (data.error === "No session found") {
        setUnlogged(true);
      }

      setLoading(false);
    }

    loadSession();

    const sessionUpdateInterval = setInterval(loadSession, 1000 * 20);

    return () => clearInterval(sessionUpdateInterval);
  }, []);

  return { session, loading, unlogged, user };
}
