"use client";

import { useSession } from "@/lib/hooks/session";
import axios from "axios";

export default function Home() {
  const { session, loading } = useSession();

  return (
    <main>
      {loading ? (
        <h1>Carregando</h1>
      ) : (
        <div>
          <h1>Olá {session ? session.user.email : ""}</h1>
          <button onClick={async () => await axios.post("/api/auth/logout")}>
            Deslogar
          </button>
        </div>
      )}
    </main>
  );
}
