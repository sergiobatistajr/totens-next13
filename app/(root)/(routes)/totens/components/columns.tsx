"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellImages } from "./cell-images";
import { CellAction } from "./cell-action";

export type TotenColumn = {
  id: string;
  name: string;
  images: string[];
};

export const columns: ColumnDef<TotenColumn>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "images",
    header: "Imagens",
    cell: ({ row }) => <CellImages data={row.original} />,
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
