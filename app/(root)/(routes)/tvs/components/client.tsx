"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ApiList } from "@/components/ui/api-list";

import { TVColumn, columns } from "./columns";

interface TVsClientProps {
  data: TVColumn[];
}

export const TVsClient: React.FC<TVsClientProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`TVs (${data.length})`}
          description="Administração de TVs"
        />
        <Button onClick={() => router.push(`/tvs/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Adicionar TV
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading title="API" description="API Calls TVS" />
      <Separator />
      <ApiList entityName="tvs" entityIdName="tvId" />
    </>
  );
};
