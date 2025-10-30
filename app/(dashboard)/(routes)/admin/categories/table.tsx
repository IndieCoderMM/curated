"use client";

import { DataTable } from "@/components/table/data-table";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Edit, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { CategoryFormModal } from "./category-form-modal";

type Row = {
  id: string;
  name: string;
  totalCourses: number;
  createdAt: string | Date;
};

async function deleteCategory(id: string) {
  const res = await fetch(`/api/admin/categories/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || "Failed to delete");
  }
  return res.json();
}

export default function AdminCategoriesTable({ data }: { data: Row[] }) {
  const [rows, setRows] = useState<Row[]>(data);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const handleCreate = () => {
    setSelectedCategory(null);
    setIsModalOpen(true);
  };

  const handleEdit = (category: { id: string; name: string }) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string, name: string) => {
    if (
      !confirm(`Are you sure you want to delete the category "${name}"? This action cannot be undone.`)
    ) {
      return;
    }

    try {
      await deleteCategory(id);
      setRows((prev) => prev.filter((r) => r.id !== id));
      toast.success("Category deleted successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to delete category");
    }
  };

  const handleSuccess = async () => {
    // Refresh the data by re-fetching
    try {
      const res = await fetch("/api/admin/categories");
      if (res.ok) {
        const categories = await res.json();
        const updatedData = categories.map((c: any) => ({
          ...c,
          totalCourses: c.courses?.length || 0,
        }));
        setRows(updatedData);
      }
    } catch (error) {
      console.error("Failed to refresh categories", error);
    }
  };

  const columns: ColumnDef<Row>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "totalCourses",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total Courses
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const category = row.original;
        return (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleEdit({ id: category.id, name: category.name })}
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDelete(category.id, category.name)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Categories</h1>
        <Button onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4" />
          Create Category
        </Button>
      </div>
      <DataTable columns={columns} data={rows} searchColumn="name" />
      <CategoryFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleSuccess}
        category={selectedCategory}
      />
    </>
  );
}
