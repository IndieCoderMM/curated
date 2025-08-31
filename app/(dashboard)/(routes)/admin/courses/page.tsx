import { auth } from "@/auth";
import { db } from "@/lib/db";
import { appRoutes } from "@/routes";
import { redirect } from "next/navigation";
import AdminCoursesTable from "./table";

const AdminCoursesPage = async () => {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    return redirect(appRoutes.landing);
  }

  const courses = await db.course.findMany({
    include: { purchases: true, category: true },
    orderBy: { createdAt: "desc" },
  });

  const data = courses.map((c) => ({
    ...c,
    enrollment: c.purchases.length,
  }));

  return (
    <div className="p-6">
      <AdminCoursesTable data={data as any} />
    </div>
  );
};

export default AdminCoursesPage;
