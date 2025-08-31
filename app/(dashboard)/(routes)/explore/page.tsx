import { getCourses } from "@/actions/get-courses";
import { auth } from "@/auth";
import { CoursesList } from "@/components/courses-list";
import { SearchInput } from "@/components/search-input";
import { getMetadata, metaTexts } from "@/config/meta";
import { db } from "@/lib/db";
import { Categories } from "./_components/categories";

export const metadata = getMetadata({
  title: metaTexts.explore.title,
  description: metaTexts.explore.description,
});

interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  };
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const session = await auth();
  const userId = session?.user?.id ?? "public";

  const items = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const courses = await getCourses({
    userId,
    ...searchParams,
  });

  return (
    <>
      <div className="block px-6 pt-6 md:mb-0 md:hidden">
        <SearchInput />
      </div>
      <div className="space-y-4 p-6">
        <Categories items={items} />
        <CoursesList items={courses} />
      </div>
    </>
  );
};

export default SearchPage;
