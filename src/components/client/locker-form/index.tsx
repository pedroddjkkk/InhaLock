"use client";

import Form from "@/components/form";
import { Text, Title } from "@/components/ui/text";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Prisma } from "@prisma/client";
import { Navbar } from "..";
import { PageWrapper } from "@/app/wrapper";

export default function LockerForm({
  lock,
}: {
  lock?: Prisma.LockGetPayload<{
    include: {
      temporaryKeys: true;
    };
  }>;
}) {
  const [error, setError] = useState<{ field: string; message: string }>();
  const router = useRouter();

  return (
    <PageWrapper className="overflow-hidden">
      <div className="mx-4">
        <Navbar title="Editar fechadura" />
        <div className="w-full bg-[#26C967] rounded-lg p-4 flex justify-center my-8">
          <span className="text-2xl text-white">{lock?.name}</span>
        </div>
        <Form
          action={`/api/lock/${lock ? lock.id : ""}`}
          onError={(error) => setError(error)}
          onSuccess={() => {
            router.refresh();
            router.push("/");
          }}
          className="flex flex-col"
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Nome da Fechadura</Label>
              <Input
                id="name"
                name="name"
                error={error?.field === "name"}
                defaultValue={lock?.name}
              />
              {error?.field === "name" && <Text>{error.message}</Text>}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="description">Descrição</Label>
              <Input
                id="description"
                name="description"
                error={error?.field === "description"}
                defaultValue={lock?.description ? lock?.description : ""}
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
                defaultValue={lock?.password ? lock?.password : ""}
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
                defaultValue={lock?.securityCode ? lock?.securityCode : ""}
              />
              {error?.field === "securityCode" && <Text>{error.message}</Text>}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="notificationPassword">Senha de Notificação</Label>
              <Input
                id="notificationPassword"
                name="notificationPassword"
                type="password"
                error={error?.field === "notificationPassword"}
                defaultValue={
                  lock?.notificationPassword ? lock?.notificationPassword : ""
                }
              />
              {error?.field === "notificationPassword" && (
                <Text>{error.message}</Text>
              )}
            </div>
          </div>
          <div className="self-end mt-6 flex gap-4">
            <Button variant="outline" onClick={() => router.back()}>
              Cancelar
            </Button>
            <Button>{lock ? "Editar" : "Cadastrar"}</Button>
          </div>
        </Form>
      </div>
    </PageWrapper>
  );
}
