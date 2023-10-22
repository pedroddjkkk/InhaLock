"use client";

import { Title } from "@/components/ui/text";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Prisma } from "@prisma/client";
import { Navbar, TemporaryKeyForm } from "..";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";

export default function LockerDetails({
  lock,
}: {
  lock: Prisma.LockGetPayload<{
    include: {
      temporaryKeys: true;
    };
  }>;
}) {
  const [passwordVisible, setPasswordVisible] = useState<number[]>([]);
  const [keysTime, setKeysTime] = useState<{ id: number; time: string }[]>([]);
  const pathname = usePathname();
  const { toast } = useToast();

  useEffect(() => {
    function updateCounter() {
      const now = new Date();
      const newKeysTime = lock.temporaryKeys.map((key) => {
        const timeDifference = key.expiresAt.getTime() - now.getTime();

        if (timeDifference <= 0) {
          return { id: key.id, time: "00:00" };
        } else {
          const minutos = Math.floor(timeDifference / 1000 / 60);
          const segundos = Math.floor((timeDifference / 1000) % 60);

          return {
            id: key.id,
            time: `${minutos < 10 ? "0" + minutos : minutos}:${
              segundos < 10 ? "0" + segundos : segundos
            }`,
          };
        }
      });

      setKeysTime(newKeysTime);
    }

    const interval = setTimeout(() => updateCounter(), 1000);

    return () => clearTimeout(interval);
  }, [lock.temporaryKeys, keysTime]);

  return (
    <div className="mx-4">
      <Navbar title="Ver fechadura" />
      <div className="w-full bg-[#26C967] rounded-lg p-4 flex justify-center mt-8">
        <span className="text-2xl text-white">{lock?.name}</span>
      </div>
      <div className="flex flex-row mt-8 gap-6 items-center w-full">
        <span>{lock.description}</span>
        <Link href={pathname + "/editar"} className="text-[#26C967]">
          Editar
        </Link>
        <Button
          className="self-end"
          onClick={async () => {
            const res = await axios.post(
              `/api/esp/remote/${lock.securityCode}`
            );

            if (res)
              toast({
                title: "Fechadura Aberta!",
                className: "mt-8"
              });
          }}
        >
          Abrir
        </Button>
      </div>
      <div className="flex flex-row justify-between items-center mt-8">
        <Title className="text-lg font-semibold">Chaves temporárias</Title>
        <TemporaryKeyForm lock={lock} />
      </div>
      {lock.temporaryKeys.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-8">
          <span className="text-lg">Nenhuma chave temporária cadastrada</span>
        </div>
      ) : (
        lock.temporaryKeys.map((key) => {
          return (
            <Card key={key.id} className="mt-4">
              <CardHeader>
                <CardTitle className="text-lg flex flex-row justify-between items-center mb-2">
                  <span>{key.name}</span>
                  <span className="text-sm font-medium">
                    {keysTime.find((time) => time.id === key.id)?.time}{" "}
                    restantes
                  </span>
                </CardTitle>
                <CardDescription className="w-full flex flex-row justify-between items-center">
                  {key.password ? (
                    <>
                      {passwordVisible.includes(key.id)
                        ? key.password
                        : Array.from({ length: key.password?.length }).map(
                            (_) => "*"
                          )}
                      {passwordVisible.includes(key.id) ? (
                        <AiOutlineEyeInvisible
                          className="cursor-pointer"
                          onClick={() =>
                            setPasswordVisible((prev) =>
                              prev.filter((id) => id !== key.id)
                            )
                          }
                        />
                      ) : (
                        <AiOutlineEye
                          className="cursor-pointer"
                          onClick={() =>
                            setPasswordVisible((prev) => [...prev, key.id])
                          }
                        />
                      )}
                    </>
                  ) : (
                    <span>Sem senha</span>
                  )}
                </CardDescription>
              </CardHeader>
            </Card>
          );
        })
      )}
    </div>
  );
}
