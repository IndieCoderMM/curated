"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import DeleteUserButton from "./delete-user-button";

export type UserRow = {
  id: string;
  name: string | null;
  email: string | null;
  role: "USER" | "ADMIN";
  provider: string;
  createdAt: string; // ISO string
};

function SortableHeader({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <Button variant="ghost" onClick={onClick} className="h-8 px-2">
      {label}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
}

export const userColumns: ColumnDef<UserRow>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <SortableHeader
        label="Name"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      />
    ),
    cell: ({ row }) => (
      <span className="text-sm">{row.getValue("name") || "-"}</span>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <SortableHeader
        label="Email"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      />
    ),
    cell: ({ row }) => (
      <span className="text-sm">{row.getValue("email") || "-"}</span>
    ),
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <SortableHeader
        label="Role"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      />
    ),
    cell: ({ row }) => <span className="text-sm">{row.getValue("role")}</span>,
  },
  {
    accessorKey: "provider",
    header: ({ column }) => (
      <SortableHeader
        label="Provider"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      />
    ),
    cell: ({ row }) => (
      <span className="text-sm">{row.getValue("provider")}</span>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <SortableHeader
        label="Created"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      />
    ),
    cell: ({ row }) => {
      const value = row.getValue("createdAt") as string;
      const date = new Date(value);
      return (
        <span className="text-sm">
          {isNaN(date.getTime()) ? "-" : date.toLocaleString()}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: () => <span>Actions</span>,
    cell: ({ row }) => {
      const role = row.getValue("role") as UserRow["role"];
      return (
        <DeleteUserButton
          userId={row.original.id}
          disabled={role === "ADMIN"}
        />
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];
