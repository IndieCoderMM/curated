import { Logo } from "./logo";
import { SidebarRoutes } from "./sidebar-routes";

export const Sidebar = () => {
  return (
    <div className="flex h-full flex-col overflow-y-auto border-r bg-white shadow-sm">
      <div className="px-4 py-2">
        <Logo />
      </div>
      <div className="mt-8 flex h-full w-full flex-col">
        <SidebarRoutes />
      </div>
    </div>
  );
};
