import { auth } from "@/auth";
import { isTeacher } from "@/lib/teacher";
import { redirect } from "next/navigation";

const TeacherLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!isTeacher(userId)) return redirect("/");

  return <>{children}</>;
};

export default TeacherLayout;
