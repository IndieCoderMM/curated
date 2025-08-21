"use client";

import { BarChart, Compass, Layout, List } from "lucide-react";
import { usePathname } from "next/navigation";

import { appRoutes } from "@/routes";
import { SidebarItem } from "./sidebar-item";

const studentRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: appRoutes.dashboard,
    public: false,
  },
  {
    icon: Compass,
    label: "Explore",
    href: appRoutes.explore,
    public: true,
  },
];

const teacherRoutes = [
  {
    icon: List,
    label: "Courses",
    href: appRoutes.teacherCourses,
    public: false,
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: appRoutes.courseAnalytics,
    public: false,
  },
];

export const SidebarRoutes = ({ isLogin }: { isLogin?: boolean }) => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.includes("/teacher");

  const routes = isTeacherPage ? teacherRoutes : studentRoutes;

  const filteredRoutes = routes.filter((route) => {
    if (route.public) return true;
    return isLogin;
  });

  return (
    <div className="flex w-full flex-col">
      {filteredRoutes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};
