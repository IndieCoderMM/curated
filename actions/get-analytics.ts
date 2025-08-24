import { db } from "@/lib/db";

type TrendPoint = { name: string; total: number };

const formatDay = (d: Date) =>
  d.toLocaleDateString("en-US", { month: "short", day: "numeric" });

export const getAnalytics = async (userId: string) => {
  try {
    const purchases = await db.purchase.findMany({
      where: { course: { userId } },
      select: { id: true, createdAt: true },
      orderBy: { createdAt: "asc" },
    });

    const totalStudents = purchases.length;

    // Build last 30 days window
    const today = new Date();
    const start = new Date(today);
    start.setDate(today.getDate() - 29); // inclusive 30 days

    // Initialize map for last 30 days with zeroes
    const counts = new Map<string, number>();
    for (let i = 0; i < 30; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      counts.set(d.toISOString().slice(0, 10), 0);
    }

    // Count purchases per day within the window
    for (const p of purchases) {
      const key = new Date(p.createdAt).toISOString().slice(0, 10);
      if (counts.has(key)) counts.set(key, (counts.get(key) || 0) + 1);
    }

    const data: TrendPoint[] = Array.from(counts.entries()).map(
      ([iso, total]) => ({ name: formatDay(new Date(iso)), total }),
    );

    return { data, totalStudents };
  } catch (error) {
    console.log("Failed to get analytics", error);
    return { data: [], totalStudents: 0 };
  }
};
