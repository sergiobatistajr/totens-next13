"use client";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";

const ClientUsers = () => {
  const router = useRouter();
  return (
    <div className="ml-6 mt-3">
      <Heading
        title="Administração de usuários"
        description="Aqui é onde muda a senha e criar usuário "
      />
      <div className="mt-4">
        <Button onClick={() => router.push("register/new")}>
          Novo usuario
        </Button>
        <p>list users</p>
      </div>
    </div>
  );
};

export default ClientUsers;
