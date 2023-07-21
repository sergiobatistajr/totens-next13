"use client";
import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";

export type TVColumn = {
  id: string;
  name: string;
  imageUrl: string;
};

export const columns: ColumnDef<TVColumn>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "imageUrl",
    header: "Imagem",
    cell: ({ row }) => (
      <Image
        width={100}
        height={100}
        className="object-cover w-16 h-16 rounded-full"
        alt="Image"
        src={row.original.imageUrl}
      />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
