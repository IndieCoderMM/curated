import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
  _req: Request,
  { params }: { params: { userId: string } },
) {
  try {
    const session = await auth();
    if (session?.user?.role !== "ADMIN") {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const { userId } = params;
    if (!userId) return new NextResponse("Bad Request", { status: 400 });

    // Prevent deleting the last admin (optional safeguard)
    const target = await db.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });
    if (!target) return new NextResponse("Not Found", { status: 404 });
    if (target.role === "ADMIN") {
      // Count other admins
      const admins = await db.user.count({
        where: { role: "ADMIN", NOT: { id: userId } } as any,
      });
      if (admins === 0)
        return new NextResponse("Cannot delete the only admin", {
          status: 400,
        });
    }

    await db.user.delete({ where: { id: userId } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[ADMIN_DELETE_USER]", e);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
