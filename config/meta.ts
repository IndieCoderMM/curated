import { Metadata } from "next";

export const metaTexts = {
  landing: {
    title: "CuratED | Learn Anything Online, Anytime",
    description:
      "Master new skills for free, anytime, anywhere with CuratED online courses",
  },
  dashboard: {
    title: "Dashboard | CuratED",
    description:
      "Your dashboard to track learning progress and course activities",
  },
  explore: {
    title: "Explore Courses | CuratED",
    description: "Discover curated courses, tutorials, and learning resources",
  },
  teacher: {
    title: "Manage Courses | CuratED",
    description: "Manage your courses and chapters with intuitive LMS",
  },
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const getMetadata = ({
  title,
  description,
  image,
}: {
  title: string;
  description?: string;
  image?: string;
}): Metadata => {
  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    openGraph: {
      images: [image ?? "/api/og"],
    },
  };
};
