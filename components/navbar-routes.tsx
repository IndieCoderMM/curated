"use client";

import { usePathname } from "next/navigation";

import { UserButton } from "@/components/user-button";
import { appRoutes } from "@/routes";
import { ChevronLeftIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { SearchInput } from "./search-input";
import { Button } from "./ui/button";

export const NavbarRoutes = () => {
  const session = useSession();
  const pathname = usePathname();

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isAdminPage = pathname?.startsWith("/admin");
  const isSearchPage = pathname === "/explore";

  const userId = session?.data?.user?.id;

  return (
    <>
      {(isTeacherPage || isAdminPage) && (
        <div className="">
          <Link href={appRoutes.dashboard}>
            <Button variant={"ghost"}>
              <ChevronLeftIcon className="size-2 mr-1" />
              Go to Dashboard
            </Button>
          </Link>
        </div>
      )}
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
