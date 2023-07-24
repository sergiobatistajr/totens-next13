"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type UsersColum = {
  id: string;
  name: string;
  username: string;
  isActive: boolean;
};

export const columns: ColumnDef<UsersColum>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "username",
    header: "Usuário",
  },
  {
    accessorKey: "isActive",
    header: "Ativo",
    cell: ({ row }) => <div>{row.original.isActive ? "Sim" : "Não"}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
