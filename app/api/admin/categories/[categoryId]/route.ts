import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { categoryId: string } },
) {
  try {
    const session = await auth();
    if (session?.user?.role !== "ADMIN") {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const { categoryId } = params;
    if (!categoryId) return new NextResponse("Bad Request", { status: 400 });

    const { name } = await req.json();
    if (!name || !name.trim()) {
      return new NextResponse("Category name is required", { status: 400 });
    }

    // Check if category exists
    const category = await db.category.findUnique({
      where: { id: categoryId },
    });
    if (!category) return new NextResponse("Not Found", { status: 404 });

    // Check if another category with this name already exists
    const existing = await db.category.findFirst({
      where: {
        name: name.trim(),
        id: { not: categoryId },
      },
    });

    if (existing) {
      return new NextResponse("Category name already exists", { status: 409 });
    }

    const updated = await db.category.update({
      where: { id: categoryId },
      data: { name: name.trim() },
    });

    return NextResponse.json(updated);
  } catch (e) {
    console.error("[ADMIN_UPDATE_CATEGORY]", e);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { categoryId: string } },
) {
  try {
    const session = await auth();
    if (session?.user?.role !== "ADMIN") {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const { categoryId } = params;
    if (!categoryId) return new NextResponse("Bad Request", { status: 400 });

    // Check if category exists
    const category = await db.category.findUnique({
      where: { id: categoryId },
      include: { courses: true },
    });
    if (!category) return new NextResponse("Not Found", { status: 404 });

    // Check if category has courses
    if (category.courses.length > 0) {
      return new NextResponse(
        "Cannot delete category with courses. Please reassign or delete courses first.",
        { status: 400 },
      );
    }

    await db.category.delete({
      where: { id: categoryId },
    });

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("[ADMIN_DELETE_CATEGORY]", e);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
