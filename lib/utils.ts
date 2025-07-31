import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertYouTubeToEmbed(url: string) {
  try {
    const parsedUrl = new URL(url);

    if (
      parsedUrl.hostname.includes("youtube.com") &&
      parsedUrl.searchParams.has("v")
    ) {
      const videoId = parsedUrl.searchParams.get("v");
      return `https://www.youtube.com/embed/${videoId}`;
    }

    if (parsedUrl.hostname === "youtu.be") {
      const videoId = parsedUrl.pathname.slice(1);
      return `https://www.youtube.com/embed/${videoId}`;
    }

    throw new Error("Invalid YouTube URL");
  } catch (err) {
    console.error("Invalid URL:", err);
    return null;
  }
}

export function getYouTubeThumbnail(url: string, quality = "hqdefault") {
  try {
    const parsed = new URL(url);
    let videoId;

    if (parsed.hostname.includes("youtube.com")) {
      videoId = parsed.searchParams.get("v");
    } else if (parsed.hostname === "youtu.be") {
      videoId = parsed.pathname.slice(1);
    }

    if (!videoId) throw new Error("Invalid YouTube URL");
    return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
  } catch (err) {
    console.error(err);
    return null;
  }
}
