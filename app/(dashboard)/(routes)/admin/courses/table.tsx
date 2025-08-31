"use client";

import { DataTable } from "@/components/table/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { useState } from "react";

type Row = {
  id: string;
  title: string;
  isPublished: boolean;
  isActive: boolean;
  createdAt: string | Date;
  enrollment: number;
};

async function toggleActive(id: string) {
  const res = await fetch(`/api/admin/courses/${id}/toggle-active`, {
    method: "PATCH",
  });
  if (!res.ok) throw new Error("Failed to toggle");
  return res.json();
}

export default function AdminCoursesTable({ data }: { data: Row[] }) {
  const [rows, setRows] = useState<Row[]>(data);

  const columns: ColumnDef<Row>[] = [
    {
      accessorKey: "title",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "enrollment",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Enrollment
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "isPublished",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <Badge
          className={cn(
            "bg-slate-500",
            row.original.isPublished && "bg-sky-700",
          )}
        >
          {row.original.isPublished ? "Published" : "Unpublished"}
        </Badge>
      ),
    },
    {
      accessorKey: "isActive",
      header: "Active",
      cell: ({ row }) => (
        <Badge
          className={cn(
            "bg-slate-500",
            row.original.isActive && "bg-emerald-700",
          )}
        >
          {row.original.isActive ? "Active" : "Inactive"}
        </Badge>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const course = row.original;
        const label = course.isActive ? "Deactivate" : "Activate";
        return (
          <Button
            variant={course.isActive ? "destructive" : "secondary"}
            size="sm"
            onClick={async () => {
              const updated = await toggleActive(course.id);
              setRows((prev) =>
                prev.map((r) =>
                  r.id === course.id ? { ...r, isActive: updated.isActive } : r,
                ),
              );
            }}
          >
            {label}
          </Button>
        );
      },
    },
  ];

  return <DataTable columns={columns} data={rows} searchColumn="title" />;
}
