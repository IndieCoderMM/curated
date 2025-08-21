export const authApiPrefix = "/api/auth/";

export const authRoutes = {
  login: "/auth/login",
  register: "/auth/register",
  error: "/auth/error",
};

export const appRoutes = {
  landing: "/",
  dashboard: "/dashboard",
  explore: "/explore",
  teacherCourses: "/teacher/courses",
  createCourse: "/teacher/create",
  courseAnalytics: "/teacher/analytics",
  courseDetail: (courseId: string) => `/explore/courses/${courseId}`,
  manageCourse: (courseId: string) => `/teacher/courses/${courseId}`,
  enrolledCourse: (courseId: string) => `/courses/${courseId}`,
  chapter: (courseId: string, chapterId: string) =>
    `/courses/${courseId}/chapters/${chapterId}`,
};

export const publicRoutes = [
  appRoutes.landing,
  appRoutes.explore,
  appRoutes.courseDetail(":id"),
];

export const DEFAULT_LOGIN_REDIRECT = "/dashboard";
