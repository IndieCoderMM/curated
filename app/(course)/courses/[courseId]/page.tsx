import { db } from "@/lib/db";
import { appRoutes } from "@/routes";
import { redirect } from "next/navigation";

const CourseIdPage = async ({
  params,
}: {
  params: {
    courseId: string;
  };
}) => {
  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  if (!course) redirect(appRoutes.landing);

  return redirect(appRoutes.chapter(course.id, course.chapters[0].id));
};

export default CourseIdPage;
