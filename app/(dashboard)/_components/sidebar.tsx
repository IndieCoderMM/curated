import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Bug, Github, Lightbulb } from "lucide-react";
import Link from "next/link";
import { SidebarRoutes } from "./sidebar-routes";

export const Sidebar = ({ isLogin = false }: { isLogin?: boolean }) => {
  return (
    <div className="flex h-full flex-col overflow-y-auto border-r bg-white shadow-sm">
      <div className="px-4 py-2">
        <Logo />
      </div>
      <div className="mt-8 flex h-full w-full flex-col">
        <SidebarRoutes isLogin={isLogin} />

        <div className="mt-auto border-t p-2">
          <p className="mb-2 text-xs text-muted-foreground">Community</p>
          <div className="flex flex-wrap gap-2 text-foreground/80">
            <Button asChild variant="ghost" size="sm" className="justify-start">
              <Link
                href="https://github.com/IndieCoderMM/curated"
                target="_blank"
                rel="noreferrer noopener"
              >
                <Github className="mr-2 h-4 w-4" /> Repository
              </Link>
            </Button>
            <Button asChild variant="ghost" size="sm" className="justify-start">
              <Link
                href="https://github.com/IndieCoderMM/curated/issues/new/choose"
                target="_blank"
                rel="noreferrer noopener"
              >
                <Bug className="mr-2 h-4 w-4" /> Report issue
              </Link>
            </Button>
            <Button asChild variant="ghost" size="sm" className="justify-start">
              <Link
                href="https://github.com/IndieCoderMM/curated/issues/new/choose"
                target="_blank"
                rel="noreferrer noopener"
              >
                <Lightbulb className="mr-2 h-4 w-4" /> Request feature
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
