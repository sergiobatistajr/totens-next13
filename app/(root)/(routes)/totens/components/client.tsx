"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ApiList } from "@/components/ui/api-list";

import { TotenColumn, columns } from "./columns";

interface TotenClientProps {
  data: TotenColumn[];
}

export const TotenClient: React.FC<TotenClientProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Totens (${data.length})`}
          description="Administração de Totens"
        />
        <Button onClick={() => router.push(`/totens/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Adicionar Toten
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading title="API" description="API Calls Totens" />
      <Separator />
      <ApiList entityName="totens" entityIdName="totenId" />
    </>
  );
};
