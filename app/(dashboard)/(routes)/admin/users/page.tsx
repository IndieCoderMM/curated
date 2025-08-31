import { auth } from "@/auth";
import { DataTable } from "@/components/table/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/db";
import { appRoutes } from "@/routes";
import { redirect } from "next/navigation";
import { userColumns, type UserRow } from "./_components/columns";

export default async function AdminUsersPage() {
  const session = await auth();
  const role = session?.user?.role;
  if (role !== "ADMIN") redirect(appRoutes.landing);

  const users = await db.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      accounts: {
        select: {
          provider: true,
        },
      },
    },
  });

  return (
    <div className="mx-auto max-w-5xl p-4">
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable<UserRow, unknown>
            columns={userColumns}
            data={users.map((u) => ({
              id: u.id,
              name: u.name ?? null,
              email: u.email ?? null,
              role: u.role as UserRow["role"],
              provider: u.accounts?.[0]?.provider ?? "-",
              createdAt: u.createdAt.toISOString(),
            }))}
            searchColumn="email"
          />
        </CardContent>
      </Card>
    </div>
  );
}
