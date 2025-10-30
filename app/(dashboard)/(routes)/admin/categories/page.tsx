import { auth } from "@/auth";
import { db } from "@/lib/db";
import { appRoutes } from "@/routes";
import { redirect } from "next/navigation";
import AdminCategoriesTable from "./table";

const AdminCategoriesPage = async () => {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    return redirect(appRoutes.landing);
  }

  const categories = await db.category.findMany({
    include: { courses: true },
    orderBy: { createdAt: "desc" },
  });

  const data = categories.map((c) => ({
    ...c,
    totalCourses: c.courses.length,
  }));

  return (
    <div className="p-6">
      <AdminCategoriesTable data={data as any} />
    </div>
  );
};

export default AdminCategoriesPage;
