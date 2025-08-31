import { auth } from "@/auth";
import { getMetadata, metaTexts } from "@/config/meta";
import { isTeacher } from "@/lib/teacher";
import { authRoutes } from "@/routes";
import { redirect } from "next/navigation";

export const metadata = getMetadata({
  title: metaTexts.teacher.title,
  description: metaTexts.teacher.description,
});

const TeacherLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!isTeacher(userId)) return redirect(authRoutes.login);

  return <>{children}</>;
};

export default TeacherLayout;
