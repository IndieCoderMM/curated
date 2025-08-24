import { auth } from "@/auth";
import { redirect } from "next/navigation";

import { getAnalytics } from "@/actions/get-analytics";

import { appRoutes } from "@/routes";
import { Chart } from "./_components/chart";
import { DataCard } from "./_components/data-card";

const AnalyticsPage = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return redirect(appRoutes.landing);
  }

  const { data, totalStudents } = await getAnalytics(userId);

  return (
    <div className="p-6">
      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <DataCard label="Total Students" value={totalStudents} />
      </div>
      <Chart data={data} />
    </div>
  );
};

export default AnalyticsPage;
