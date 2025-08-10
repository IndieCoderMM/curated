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
  const isSearchPage = pathname === "/search";

  const userId = session?.data?.user?.id;

  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="ml-auto flex gap-x-2">
        {/* {isTeacherPage || isCoursePage ? (
          <Link href="/">
            <Button size="sm" variant="ghost">
              Log Out
            </Button>
          </Link>
        ) : isTeacher(userId) ? (
          <Link href="/teacher/courses">
            <Button size="sm" variant="ghost">
              Manage Courses
            </Button>
          </Link>
        ) : null} */}
        <UserButton />
      </div>
    </>
  );
};
