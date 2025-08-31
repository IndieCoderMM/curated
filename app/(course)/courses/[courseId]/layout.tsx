import { getProgress } from "@/actions/get-progress";
import { auth } from "@/auth";
import { getMetadata } from "@/config/meta";
import { db } from "@/lib/db";
import { getCourseMetadata } from "@/lib/queries";
import { appRoutes } from "@/routes";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { CourseNavbar } from "./_components/course-navbar";
import { CourseSidebar } from "./_components/course-sidebar";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ courseId: string | string[] }>;
}): Promise<Metadata> {
  const routeParams = await params;
  const id = Array.isArray(routeParams.courseId)
    ? routeParams.courseId.join("/")
    : routeParams.courseId || "";

  const course = await getCourseMetadata({ id });

  if (!course?.title)
    return {
      title: "CuratED",
    };

  return getMetadata({
    title: `${course.title} | CuratED`,
    description: course.description ?? "",
    image: `/api/og?course=${course.id}`,
  });
}

const CourseLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { courseId: string };
}) => {
  const session = await auth();
  const userId = session?.user?.id ?? "public";

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        include: {
          userProgress: {
            where: {
              userId,
            },
          },
        },
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  if (!course) return redirect(appRoutes.landing);

  const progressCount = await getProgress(userId, course.id);

  return (
    <div className="h-full">
      <div className="fixed inset-y-0 z-50 h-[60px] w-full md:pl-80">
        <CourseNavbar course={course} progressCount={progressCount} />
      </div>
      <div className="fixed inset-y-0 z-50 hidden h-full w-80 flex-col md:flex">
        <CourseSidebar course={course} progressCount={progressCount} />
      </div>
      <main className="h-full pt-[80px] md:pl-80">{children}</main>
    </div>
  );
};

export default CourseLayout;
