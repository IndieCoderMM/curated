import Banner from "@/components/banner";
import { IconBadge } from "@/components/icon-badge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { LayoutDashboard, ListChecks } from "lucide-react";
import { redirect } from "next/navigation";
import { Actions } from "./_components/actions";
import CategoryForm from "./_components/category-form";
import ChaptersForm from "./_components/chapters-form";
import DescriptionForm from "./_components/description-form";
import CourseImageForm from "./_components/image-form";
import TitleForm from "./_components/title-form";

const CourseIdPage = async ({
  params,
}: {
  params: {
    courseId: string;
  };
}) => {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/");
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
      userId,
    },
    include: {
      chapters: {
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  // TODO: Seed categories
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  if (!course) {
    return redirect("/");
  }

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    // course.categoryId,
    course.chapters.some((chapter) => chapter.isPublished),
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!course.isPublished && (
        <Banner
          label="This course is not published. It will not
be visible to students."
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">Course Settings</h1>
            <span className="text-sm text-slate-700">
              Complete the following fields to publish your course:
              {completionText}
            </span>
          </div>
          <Actions
            courseId={course.id}
            isPublished={course.isPublished}
            disabled={!isComplete}
          />
        </div>
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="">
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} variant="success" />
              <h2 className="text-xl">General Settings:</h2>
            </div>
            <TitleForm initialData={course} courseId={course.id} />
            <DescriptionForm initialData={course} courseId={course.id} />
            <CategoryForm
              initialData={course}
              courseId={course.id}
              options={categories.map((category) => ({
                label: category.name,
                value: category.id,
              }))}
            />
            <CourseImageForm initialData={course} courseId={course.id} />
          </div>
          <div className="space-y-6">
            <div className="">
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ListChecks} variant="secondary" />
                <h2 className="text-xl">Chapters:</h2>
              </div>
            </div>
            <ChaptersForm initialData={course} courseId={course.id} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseIdPage;
