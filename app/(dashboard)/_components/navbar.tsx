import { NavbarRoutes } from "@/components/navbar-routes";

import { MobileSidebar } from "./mobile-sidebar";

export const Navbar = () => {
  return (
    <div className="flex h-full items-center border-b bg-white px-4 py-1 shadow-sm">
      <MobileSidebar />
      <NavbarRoutes />
    </div>
  );
};
