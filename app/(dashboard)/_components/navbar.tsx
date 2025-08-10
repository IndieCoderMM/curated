import { NavbarRoutes } from "@/components/navbar-routes";

import { SessionProvider } from "next-auth/react";
import { MobileSidebar } from "./mobile-sidebar";

export const Navbar = () => {
  return (
    <SessionProvider>
      <div className="flex h-full items-center border-b bg-white px-4 py-1 shadow-sm">
        <MobileSidebar />
        <NavbarRoutes />
      </div>
    </SessionProvider>
  );
};
