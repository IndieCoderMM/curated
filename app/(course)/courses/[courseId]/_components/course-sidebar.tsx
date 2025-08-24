import { auth } from "@/auth";
import { Chapter, Course, UserProgress } from "@prisma/client";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";

import { CourseProgress } from "@/components/course-progress";
import { appRoutes } from "@/routes";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { CourseSidebarItem } from "./course-sidebar-item";

interface CourseSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}

export const CourseSidebar = async ({
  course,
  progressCount,
}: CourseSidebarProps) => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return redirect(appRoutes.landing);
  }

  const purchase = await db.purchase.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId: course.id,
      },
    },
  });

  return (
    <div className="flex h-full flex-col overflow-y-auto border-r shadow-sm">
      <div className="flex min-h-[60px] flex-col border-b p-4">
        <div className="flex items-center gap-2">
          <Link
            title="Back"
            href={"/dashboard"}
            className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-neutral-100 hover:text-gray-600"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <h1 className="truncate font-semibold">{course.title}</h1>
        </div>
        {purchase && (
          <div className="mt-4">
            <CourseProgress variant="success" value={progressCount} />
          </div>
        )}
      </div>
      <div className="flex w-full flex-col">
        {course.chapters.map((chapter) => (
          <CourseSidebarItem
            key={chapter.id}
            id={chapter.id}
            label={chapter.title}
            isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
            courseId={course.id}
            isLocked={!chapter.isFree && !purchase}
          />
        ))}
      </div>
    </div>
  );
};
