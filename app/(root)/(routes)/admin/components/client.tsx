"use client";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { User } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
interface ClientUsersProps {
  data: User[];
}

const ClientUsers: React.FC<ClientUsersProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title="Administração de usuários"
          description="Aqui é onde muda a senha e criar usuário"
        />
        <Button onClick={() => router.push(`/admin/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Novo usuario
        </Button>
      </div>

      <DataTable columns={columns} data={data} searchKey="username" />
    </>
  );
};

export default ClientUsers;
