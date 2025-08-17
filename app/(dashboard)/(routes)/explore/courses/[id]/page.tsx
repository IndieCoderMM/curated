import { ShareButton } from "@/components/share-button";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/lib/db";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import CuratorCard from "../../_components/curator-card";

interface PageProps {
  params: { id: string };
}

export default async function CourseOverview({ params }: PageProps) {
  const course = await db.course.findUnique({
    where: { id: params.id },
    include: {
      chapters: {
        orderBy: { position: "asc" },
        select: { id: true, title: true, position: true, isPublished: true },
      },
    },
  });

  if (!course) {
    return (
      <main className="container mx-auto max-w-5xl px-4 py-10">
        <Card>
          <CardHeader>
            <CardTitle>Course not found</CardTitle>
            <CardDescription>
              We couldn't find the course you were looking for.
            </CardDescription>
          </CardHeader>
        </Card>
      </main>
    );
  }

  const enrollments = await db.purchase.findMany({
    where: { courseId: course.id },
  });

  return (
    <main className="container mx-auto max-w-5xl px-4 py-10">
      {/* Breadcrumbs */}
      <div className="mb-6 flex items-center gap-2">
        <Link
          href="/explore"
          className="text-sm text-primary hover:text-accent hover:underline"
        >
          Explore Courses
        </Link>
        <span className="text-sm text-muted-foreground">/</span>
        <span className="text-sm font-semibold text-muted-foreground">
          {course.title}
        </span>
      </div>
      {/* Cover */}
      <div className="mb-6 overflow-hidden rounded-xl border">
        <div className="relative h-60 w-full bg-muted">
          {course.imageUrl ? (
            <Image
              src={course.imageUrl}
              alt={course.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1024px"
            />
          ) : null}
        </div>
      </div>

      {/* Header */}
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            {course.title}
          </h1>
          {course.description ? (
            <p className="mt-2 max-w-3xl text-muted-foreground">
              {course.description}
            </p>
          ) : null}
          <div className="mt-4 flex items-center">
            <Link href={`/courses/${course.id}`}>
              <Button variant="default">Enroll Now</Button>
            </Link>
            <p className="ml-4 text-sm text-muted-foreground">
              {enrollments.length} students
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ShareButton />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Chapters */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Chapters</CardTitle>
            <CardDescription>Course content</CardDescription>
          </CardHeader>
          <CardContent>
            {course.chapters.length === 0 ? (
              <p className="text-sm text-muted-foreground">No chapters yet.</p>
            ) : (
              <ul className="space-y-2">
                {course.chapters.map((ch) => (
                  <li
                    key={ch.id}
                    className="flex items-center gap-3 rounded-md border p-3"
                  >
                    <span className="text-lg font-bold text-accent-foreground">
                      {String(ch.position).padStart(2, "0")}
                    </span>
                    <span className="line-clamp-1 text-sm">{ch.title}</span>
                    {!ch.isPublished && (
                      <span className="ml-auto text-xs text-muted-foreground">
                        Draft
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        {/* Creator */}
        <Suspense fallback={null}>
          <CuratorCard courseId={course.id} userId={course.userId} />
        </Suspense>
      </div>
    </main>
  );
}
