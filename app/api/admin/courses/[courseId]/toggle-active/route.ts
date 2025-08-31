import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  _req: Request,
  { params }: { params: { courseId: string } },
) {
  try {
    const session = await auth();
    if (session?.user?.role !== "ADMIN") {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const { courseId } = params;
    if (!courseId) return new NextResponse("Bad Request", { status: 400 });

    const course = await db.course.findUnique({ where: { id: courseId } });
    if (!course) return new NextResponse("Not Found", { status: 404 });

    const updated = await db.course.update({
      where: { id: courseId },
      data: { isActive: !course.isActive },
    });

    return NextResponse.json(updated);
  } catch (e) {
    console.error("[ADMIN_TOGGLE_COURSE_ACTIVE]", e);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
