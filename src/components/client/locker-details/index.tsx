"use client";

import { Title } from "@/components/ui/text";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Prisma } from "@prisma/client";
import { Navbar } from "..";
import { AiOutlinePlus } from "react-icons/ai";

export default function LockerDetails({
  lock,
}: {
  lock: Prisma.LockGetPayload<{
    include: {
      temporaryKeys: true;
    };
  }>;
}) {
  const [error, setError] = useState<{ field: string; message: string }>();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="mx-4">
      <Navbar title="Ver fechadura" />
      <div className="w-full bg-[#26C967] rounded-lg p-5 flex justify-center mt-8">
        <span className="text-2xl text-white">{lock?.name}</span>
      </div>
      <div className="flex flex-row mt-8 gap-6">
        <span>{lock.description}</span>
        <Link href={pathname + "/editar"} className="text-[#26C967]">
          Editar
        </Link>
      </div>
      <div className="flex flex-row justify-between items-center mt-8">
        <Title className="text-lg font-semibold">Chaves temporárias</Title>
        <AiOutlinePlus size={20}/>
      </div>
    </div>
  );
}
