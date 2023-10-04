"use client";

import { Text } from "@/components/ui/text";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Prisma } from "@prisma/client";
import { AiOutlinePlus } from "react-icons/ai";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

const createTemporaryKeySchema = z.object({
  name: z
    .string({ required_error: "Nome é obrigatório" })
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .max(255, "Nome deve ter no máximo 255 caracteres"),
  password: z
    .string({ required_error: "Nome é obrigatório" })
    .min(4, "Senha deve ter pelo menos 4 caracteres")
    .max(255, "Senha deve ter no máximo 255 caracteres"),
});

export default function TemporaryKeyForm({
  lock,
}: {
  lock: Prisma.LockGetPayload<{
    include: {
      temporaryKeys: true;
    };
  }>;
}) {
  const form = useForm<z.infer<typeof createTemporaryKeySchema>>({
    resolver: zodResolver(createTemporaryKeySchema),
  });
  const [open, setOpen] = useState(false);
  const router = useRouter();

  async function onSubmit(data: any) {
    const res = await axios.post(`/api/lock/${lock.id}/temporary-key`, data);

    if (res.status === 200) {
      setOpen(false);
      form.reset();
      router.refresh();
    }
  }

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger asChild>
        <AiOutlinePlus size={28} />
      </DialogTrigger>
      <DialogContent className="w-[80%]">
        <DialogHeader>
          <DialogTitle>Adicionar chave temporaria</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 flex flex-col"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="self-end mt-6 flex gap-4 flex-row">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit">Cadastrar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
