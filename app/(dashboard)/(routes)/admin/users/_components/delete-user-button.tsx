"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export default function DeleteUserButton({
  userId,
  disabled,
}: {
  userId: string;
  disabled?: boolean;
}) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const onDelete = async () => {
    startTransition(async () => {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "DELETE",
      });
      if (res.ok) router.refresh();
    });
  };

  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={onDelete}
      disabled={pending || disabled}
    >
      <Trash2 className="mr-1 h-4 w-4" /> Delete
    </Button>
  );
}
