"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function UserButton() {
  const { data } = useSession();
  const user = data?.user;

  const name = user?.name || user?.email?.split("@")[0] || "User";
  const avatarUrl = (user as any)?.image || (user as any)?.avatar || "";
  const initial = (name?.[0] || "U").toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-9 gap-2 px-2">
          <span className="relative inline-flex h-7 w-7 items-center justify-center overflow-hidden rounded-full bg-muted">
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt={name}
                fill
                className="object-cover"
                sizes="28px"
              />
            ) : (
              <span className="text-xs font-medium text-muted-foreground">
                {initial}
              </span>
            )}
          </span>
          <span className="hidden max-w-[140px] truncate text-sm font-medium sm:inline">
            {name}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="truncate">
          {user?.email || "No email"}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href="/teacher/courses">
          <DropdownMenuItem className="cursor-pointer">
            Manage Courses
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer text-destructive"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
