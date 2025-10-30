import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (session?.user?.role !== "ADMIN") {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const { name } = await req.json();
    if (!name || !name.trim()) {
      return new NextResponse("Category name is required", { status: 400 });
    }

    // Check if category already exists
    const existing = await db.category.findUnique({
      where: { name: name.trim() },
    });

    if (existing) {
      return new NextResponse("Category already exists", { status: 409 });
    }

    const category = await db.category.create({
      data: { name: name.trim() },
    });

    return NextResponse.json(category);
  } catch (e) {
    console.error("[ADMIN_CREATE_CATEGORY]", e);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await auth();
    if (session?.user?.role !== "ADMIN") {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const categories = await db.category.findMany({
      include: { courses: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(categories);
  } catch (e) {
    console.error("[ADMIN_GET_CATEGORIES]", e);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
