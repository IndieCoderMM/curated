import { db } from "@/lib/db";
import { loadGoogleFont } from "@/lib/font";
import { ImageResponse } from "next/og";
import fs from "node:fs";
import path from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getLogoDataUrl() {
  try {
    const p = path.join(process.cwd(), "public", "logo.png");
    const buf = fs.readFileSync(p);
    return `data:image/png;base64,${buf.toString("base64")}`;
  } catch {
    return undefined;
  }
}

export async function GET(req: Request) {
  const host = (() => {
    try {
      const url = new URL(req.url);
      return url.host;
    } catch {
      return "curat-ed.vercel.app";
    }
  })();

  const logo = getLogoDataUrl();
  let title = "Curated";
  let tagline = "Education Platform for Self-taught Learners";

  try {
    const url = new URL(req.url);
    const courseId = url.searchParams.get("course");

    if (courseId) {
      const course = await db.course.findUnique({
        where: { id: courseId },
        include: { category: true },
      });
      if (course) {
        title = course.title;

        const category = course.category?.name ?? undefined;
        const description =
          course.description ?? "Learn with community-curated courses.";

        tagline =
          description.length > 300
            ? description.slice(0, 297) + "..."
            : description;
      }
    }
  } catch (err) {
    console.error("[OG]", err);
  }

  let regularFont: ArrayBuffer | undefined;
  let boldFont: ArrayBuffer | undefined;
  try {
    regularFont = await loadGoogleFont("Outfit");
    boldFont = await loadGoogleFont("Outfit:wght@700");
  } catch {}

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 48,
          color: "#fff",
          background: "linear-gradient(135deg, #000000 0%, #434343 100%)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 800, lineHeight: 1.05 }}>
            {title}
          </div>
          <div style={{ fontSize: 28, marginTop: 14, opacity: 0.95 }}>
            {tagline}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          {logo ? (
            <img
              src={logo}
              width={140}
              height={60}
              style={{
                borderRadius: 8,
                background: "rgba(255,255,255,0.06)",
                padding: 8,
              }}
            />
          ) : null}
          <div
            style={{ fontSize: 28, marginLeft: logo ? 16 : 0, opacity: 0.9 }}
          >
            {host}
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        ...(regularFont
          ? ([
              {
                name: "Outfit",
                data: regularFont,
                style: "normal",
                weight: 400,
              },
            ] as const)
          : []),
        ...(boldFont
          ? ([
              { name: "Outfit", data: boldFont, style: "normal", weight: 700 },
            ] as const)
          : []),
      ],
    },
  );
}
