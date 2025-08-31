"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { appRoutes, authRoutes } from "@/routes";
import { UserRole } from "@prisma/client";
import { DatabaseZapIcon, GraduationCapIcon, LogOutIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export function UserButton() {
  const { data, status } = useSession();
  const user = data?.user;

  const name = user?.name || user?.email?.split("@")[0] || "User";
  const avatarUrl = (user as any)?.image || (user as any)?.avatar || "";
  const initial = (name?.[0] || "U").toUpperCase();

  if (!user) {
    if (status === "loading") return null;

    return (
      <div className="hidden items-center gap-2 sm:flex">
        <Link href={authRoutes.login}>
          <Button variant="ghost">Login</Button>
        </Link>
        <Link href={authRoutes.register}>
          <Button>Register</Button>
        </Link>
      </div>
    );
  }

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
        <DropdownMenuLabel className="truncate font-normal">
          {user?.email || "No email"}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {user?.role === UserRole.ADMIN && (
          <>
            <Link href={appRoutes.adminUsers}>
              <DropdownMenuItem className="cursor-pointer">
                <DatabaseZapIcon className="mr-1 h-5 w-5 stroke-2" />
                Admin Dashboard
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
          </>
        )}
        <Link href={appRoutes.teacherCourses}>
          <DropdownMenuItem className="cursor-pointer">
            <GraduationCapIcon className="mr-1 h-5 w-5 stroke-2" />
            Manage Courses
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer text-destructive"
          onClick={() => signOut({ redirectTo: appRoutes.landing })}
        >
          <LogOutIcon className="mr-1 h-5 w-5 stroke-2" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
