import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { db } from "@/lib/db";
import { Link } from "lucide-react";

const CuratorCard = async ({
  userId,
  courseId,
}: {
  courseId: string;
  userId: string;
}) => {
  const author = await db.user.findUnique({ where: { id: userId } });
  const courses = await db.course.findMany({
    where: { userId, isPublished: true, id: { not: courseId } },
  });

  return (
    <Card>
      <CardHeader>
        <CardDescription>About the curator</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-3 border-b pb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border bg-accent/40 text-sm font-semibold">
            {(author?.name || author?.email || "U").charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-md font-medium">{author?.name || "Unknown"}</p>
            <p className="text-sm text-muted-foreground">
              Joined on {author?.createdAt?.toLocaleDateString()}
            </p>
          </div>
        </div>
        {courses.length > 0 ? (
          <div className="mt-4">
            <h4 className="mb-2 text-sm font-semibold text-muted-foreground">
              Other courses by this curator
            </h4>
            <ul className="space-y-2">
              {courses.map((course) => (
                <li key={course.id}>
                  <Link
                    href={`/explore/courses/${course.id}`}
                    className="text-sm text-muted-foreground"
                  >
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
