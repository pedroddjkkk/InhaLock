"use client";

import { Title } from "@/components/ui/text";
import { useSession } from "@/lib/hooks/session";

export default function Home() {
  const { session, loading } = useSession();

  return (
    <main>
      <div className="h-screen">
        {loading ? (
          <h1>Carregando</h1>
        ) : (
          <div>
            <Title className="m-4 mt-12">Fechaduras</Title>
          </div>
        )}
      </div>
    </main>
  );
}
