import { auth } from "@/auth";
import { redirect } from "next/navigation";

import { getChaper } from "@/actions/get-chapter";
import Banner from "@/components/banner";
import { Preview } from "@/components/preview";
import { Separator } from "@/components/ui/separator";

import { CourseEnrollButton } from "./_components/course-enroll-button";
import { CourseProgressButton } from "./_components/course-progress-button";
import { VideoPlayer } from "./_components/video-player";

const ChaperIdPage = async ({
  params,
}: {
  params: {
    courseId: string;
    chapterId: string;
  };
}) => {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return redirect("/");

  const { chapter, course, nextChapter, userProgress, purchase } =
    await getChaper({
      userId,
      courseId: params.courseId,
      chapterId: params.chapterId,
    });

  if (!chapter || !course) return redirect("/");

  const isLocked = !chapter.isFree && !purchase;
  const completeOnEnd = !!purchase && !userProgress?.isCompleted;

  return (
    <div>
      {userProgress?.isCompleted && (
        <Banner variant="success" label="Chapter completed!" />
      )}
      {isLocked && (
        <Banner
          variant="warning"
          label="You need to enroll this course to view this chapter."
        />
      )}
      <div className="mx-auto flex max-w-4xl flex-col pb-20">
        <div className="p-4">
          {chapter.videoUrl ? (
            <VideoPlayer
              courseId={params.courseId}
              chapterId={params.chapterId}
              title={chapter.title}
              videoUrl={chapter.videoUrl}
              isLocked={isLocked}
              completeOnEnd={completeOnEnd}
            />
          ) : (
            <div className="flex h-96 items-center justify-center bg-gray-200">
              <p className="text-gray-500">
                No video available for this chapter.
              </p>
            </div>
          )}
        </div>
        <div className="">
          <div className="flex flex-col items-center justify-between p-4 md:flex-row">
            <h2 className="mb-2 text-2xl font-semibold">{chapter.title}</h2>
            {purchase ? (
              <CourseProgressButton
                chapterId={params.chapterId}
                courseId={params.courseId}
                nextChapterId={nextChapter?.id}
                isCompleted={!!userProgress?.isCompleted}
              />
            ) : (
              <CourseEnrollButton courseId={params.courseId} price={0} />
            )}
          </div>
          <Separator />
          <div className="">
            <Preview value={chapter.description!} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChaperIdPage;
