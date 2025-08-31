import { getFirstIncompleteChapter } from "@/actions/get-first-incomplete-chapter";
import { auth } from "@/auth";
import { appRoutes } from "@/routes";
import { redirect } from "next/navigation";

const CourseIdPage = async ({
  params,
}: {
  params: {
    courseId: string;
  };
}) => {
  const session = await auth();
  const userId = session?.user?.id ?? null;

  const firstChapterId = await getFirstIncompleteChapter({
    courseId: params.courseId,
    userId,
  });

  if (!firstChapterId) return redirect(appRoutes.landing);

  return redirect(appRoutes.chapter(params.courseId, firstChapterId));
};

export default CourseIdPage;
