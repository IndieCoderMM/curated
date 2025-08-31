import { auth } from "@/auth";
import { getMetadata, metaTexts } from "@/config/meta";
import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";

export const metadata = getMetadata({
  title: metaTexts.dashboard.title,
  description: metaTexts.dashboard.description,
});

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  const userId = session?.user.id;

  return (
    <div className="h-full">
      <div className="fixed inset-y-0 z-50 h-[60px] w-full md:pl-56">
        <Navbar />
      </div>
      <div className="fixed inset-y-0 z-50 hidden h-full w-56 flex-col md:flex">
        <Sidebar isLogin={!!userId} />
      </div>
      <main className="h-full pt-[60px] md:pl-56">{children}</main>
    </div>
  );
};

export default DashboardLayout;
