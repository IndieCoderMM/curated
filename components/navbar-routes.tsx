"use client";

import { usePathname } from "next/navigation";

import { UserButton } from "@/components/user-button";
import { useSession } from "next-auth/react";
import { SearchInput } from "./search-input";

export const NavbarRoutes = () => {
  const session = useSession();
  const pathname = usePathname();

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isCoursePage = pathname?.includes("/courses");
  const isSearchPage = pathname === "/explore";

  const userId = session?.data?.user?.id;

  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="ml-auto flex gap-x-2">
        <UserButton />
      </div>
    </>
  );
};
