"use client";

import Form from "@/components/form";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useSession } from "@/lib/hooks/session";
import { redirect, useRouter } from "next/navigation";

export default function Page() {
  const [error, setError] = useState<{ field: string; message: string }>();
  const { session } = useSession();
  const router = useRouter();
  if (session) redirect("/");

  return (
    <main>
      <div className="h-screen bg-blue-400">
        <Form
          action="/api/auth/signup"
          onError={(error) => setError(error)}
          onSuccess={() => {
            router.refresh();
            router.push("/");
          }}
          className="flex justify-center items-center h-full"
        >
          <Card className="max-w-[360px] w-[90%]">
            <CardHeader>
              <CardTitle>Registrar</CardTitle>
              <CardDescription>
                Realize o registro para acessar o sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="username">Nome de usuário</Label>
                  <Input
                    id="username"
                    name="username"
                    autoComplete="username"
                    error={error?.field === "username"}
                  />
                  {error?.field === "username" && <Text>{error.message}</Text>}
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    error={error?.field === "email"}
                  />
                  {error?.field === "email" && <Text>{error.message}</Text>}
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    error={error?.field === "password"}
                  />
                  {error?.field === "password" && <Text>{error.message}</Text>}
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    error={error?.field === "confirm"}
                  />
                  {error?.field === "confirm" && (
                    <Text>As senhas não coincidem!</Text>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-2">
              <Text>
                Já tem uma conta?{" "}
                <Link href="/login" className="text-blue-600">
                  Realize o Login!
                </Link>
              </Text>
              <Button variant="outline" className="self-end" type="submit">
                Registrar
              </Button>
            </CardFooter>
          </Card>
        </Form>
      </div>
    </main>
  );
}
