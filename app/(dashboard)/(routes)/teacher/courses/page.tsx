import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

const CoursesPage = async () => {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/");
  }

  const courses = await db.course.findMany({
    where: {
      userId,
    },
    include: {
      purchases: {
        where: {
          userId,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const data = courses.map((course) => ({
    ...course,
    enrollment: course.purchases.length,
  }));

  return (
    <div className="p-6">
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default CoursesPage;
