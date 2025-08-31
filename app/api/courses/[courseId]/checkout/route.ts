import { auth } from "@/auth";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } },
) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        isPublished: true,
        isActive: true,
      },
    });

    const purchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId: params.courseId,
        },
      },
    });

    if (purchase) {
      return new NextResponse("Already purchased", { status: 400 });
    }

    if (!course) {
      return new NextResponse("Not found", { status: 404 });
    }

    const successUrl = `${process.env.NEXT_PUBLIC_APP_URL}/courses/${course.id}?success=1`;

    await db.purchase.create({
      data: {
        courseId: course.id,
        userId: userId,
      },
    });

    return NextResponse.json({ url: successUrl });
  } catch (error) {
    console.error("Failed to checkout", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
