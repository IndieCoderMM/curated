import { db } from "@/lib/db";

interface GetFirstIncompleteChapterParams {
  courseId: string;
  userId?: string | null;
}

// Returns the first incomplete chapter id for a given course/user.
// Falls back to the first published chapter id.
// Returns null if the course has no published chapters.
export async function getFirstIncompleteChapter({
  courseId,
  userId,
}: GetFirstIncompleteChapterParams): Promise<string | null> {
  // If we have a user, fetch chapters including their progress; otherwise fetch chapters only
  if (userId) {
    const chapters = await db.chapter.findMany({
      where: { courseId, isPublished: true },
      orderBy: { position: "asc" },
      include: {
        userProgress: {
          where: { userId },
          select: { isCompleted: true },
        },
      },
    });

    if (chapters.length === 0) return null;

    const firstIncomplete = chapters.find(
      (ch) => ch.userProgress?.[0]?.isCompleted !== true,
    );

    return (firstIncomplete ?? chapters[0]).id;
  }

  const chapters = await db.chapter.findMany({
    where: { courseId, isPublished: true },
    orderBy: { position: "asc" },
    select: { id: true },
  });
  if (chapters.length === 0) return null;
  return chapters[0].id;
}
