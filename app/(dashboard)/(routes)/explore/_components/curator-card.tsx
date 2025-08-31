import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { db } from "@/lib/db";
import { appRoutes } from "@/routes";
import { GraduationCapIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CuratorCard = async ({
  userId,
  courseId,
}: {
  courseId: string;
  userId: string;
}) => {
  const author = await db.user.findUnique({ where: { id: userId } });
  const courses = await db.course.findMany({
    where: { userId, isPublished: true, isActive: true, id: { not: courseId } },
  });

  return (
    <Card>
      <CardHeader className="px-2 py-2">
        <CardDescription>About the curator</CardDescription>
      </CardHeader>
      <CardContent className="px-2">
        <div className="flex items-center gap-3 border-b pb-4">
          {author?.image ? (
            <Image
              src={author.image}
              alt={author.name || "Profile image"}
              width={40}
              height={40}
              className="h-10 w-10 rounded-full border"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full border bg-accent/40 text-sm font-semibold">
              {(author?.name || author?.email || "U").charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <p className="text-md font-medium">{author?.name || "Unknown"}</p>
            <p className="text-sm text-muted-foreground">
              Joined on {author?.createdAt?.toLocaleDateString()}
            </p>
          </div>
        </div>
        {courses.length > 0 ? (
          <div className="mt-4">
            <h4 className="mb-2 text-sm font-medium text-muted-foreground">
              Other courses by this curator
            </h4>
            <ul className="h-full space-y-2 overflow-y-auto">
              {courses.map((course) => (
                <li key={course.id}>
                  <Link
                    href={appRoutes.courseDetail(course.id)}
                    className="flex items-center gap-1 rounded-md border p-2 text-sm text-muted-foreground hover:border-accent"
                  >
                    <GraduationCapIcon className="h-4 w-4" />
                    {course.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="mt-4">
            <p className="text-sm text-muted-foreground">
              This curator has no other courses.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CuratorCard;
