"use client";
import { PageWrapper } from "@/app/wrapper";
import { Navbar } from "@/components/client";
import { Switch } from "@/components/ui/switch";
import { Text } from "@/components/ui/text";
import { toast } from "@/components/ui/use-toast";
import { useSession } from "@/lib/hooks/session";
import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineBell } from "react-icons/ai";
import { PiUserCircleLight } from "react-icons/pi";

export default function Configuracoes() {
  const session = useSession();
  const [notifications, setNotifications] = useState<boolean>(false);

  async function updateUser() {
    const hasPermission = window.Notification.permission === "granted";

    if (!notifications === true && !hasPermission) {
      const permission = await window.Notification.requestPermission();
      if (permission !== "granted") {
        toast({
          title: "Permissão não garantida para notificações!",
          variant: "destructive",
        });
        return;
      }
    }

    const res = await axios.post("/api/user/update", {
      notifications: !notifications,
    });

    setNotifications(!notifications);

    if (res.status == 200) {
      toast({
        title: "Usuário atualizado com sucesso!",
      });
    }
  }

  useEffect(() => {
    console.log(session.user);

    setNotifications(session.user?.sendNotification ?? false);
  }, [session.user]);

  return (
    <PageWrapper className="overflow-hidden">
      <div className="mx-4">
        <Navbar title="Configurações" />
        {session.user ? (
          <>
            <div className="mt-6 flex flex-row justify-start items-center bg-gray-50 rounded-lg w-full p-2">
              <PiUserCircleLight size={68} className="font-thin" />
              <div className="flex flex-col ml-2">
                <Text className="text-lg font-bold text-black">
                  {session.user.username}
                </Text>
                <Text className="text-base">{session.user.email}</Text>
              </div>
            </div>
            <div className="flex flex-row items-center mt-12 w-full relative">
              <AiOutlineBell size={48} className="text-gray-500" />
              <Text className="text-xl font-semibold ml-2">Notificações</Text>
              <Switch
                className="absolute right-0"
                onClick={() => updateUser()}
                checked={notifications}
              />
            </div>
          </>
        ) : (
          <Text>Carregando...</Text>
        )}
      </div>
    </PageWrapper>
  );
}
