"use client";

import Form from "@/components/form";
import { Text, Title } from "@/components/ui/text";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page() {
  const [error, setError] = useState<{ field: string; message: string }>();
  const router = useRouter();

  return (
    <div className="h-screen mx-4">
      <Title className="mb-8 mt-6">Cadastrar Cadeado</Title>
      <Form
        action="/api/lock"
        onError={(error) => setError(error)}
        onSuccess={() => router.push("/")}
        className="flex flex-col"
      >
        <div className=""></div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Nome do Cadeado</Label>
            <Input id="name" name="name" error={error?.field === "name"} />
            {error?.field === "name" && <Text>{error.message}</Text>}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="description">Descrição</Label>
            <Input
              id="description"
              name="description"
              error={error?.field === "description"}
            />
            {error?.field === "description" && <Text>{error.message}</Text>}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              name="password"
              type="password"
              error={error?.field === "password"}
            />
            {error?.field === "password" && <Text>{error.message}</Text>}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="securityCode">Código de segurança</Label>
            <Input
              id="securityCode"
              name="securityCode"
              type="password"
              error={error?.field === "securityCode"}
            />
            {error?.field === "securityCode" && <Text>{error.message}</Text>}
          </div>
        </div>
        <div className="self-end mt-6 flex gap-4">
          <Link
            className={buttonVariants({
              variant: "outline",
            })}
            href="/"
          >
            Cancelar
          </Link>
          <Button>Cadastrar</Button>
        </div>
      </Form>
    </div>
  );
}
