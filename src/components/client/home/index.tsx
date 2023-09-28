"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Title } from "@/components/ui/text";
import { useSession } from "@/lib/hooks/session";
import { Prisma } from "@prisma/client";

export default function Home({
  user,
}: {
  user: Prisma.UserGetPayload<{
    include: {
      lockers: {
        include: {
          temporaryKeys: true;
        };
      };
    };
  }>;
}) {
  const { session, loading } = useSession();

  return (
    <main>
      <div className="h-screen">
        {loading ? (
          <h1>Carregando</h1>
        ) : (
          <div>
            <Title className="m-4 mt-12">Fechaduras</Title>
            {user.lockers.map((locker) => (
              <Card key={locker.id}>
                <CardHeader>
                  <CardTitle>{locker.name}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
