"use client";

import axios from "axios";
import { Loader2, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import YouTubeEmbed from "@/components/youtube-embed";
import { useConfettiStore } from "@/hooks/use-confetti-store";

interface VideoPlayerProps {
  videoUrl: string;
  courseId: string;
  chapterId: string;
  nextChapterId?: string;
  isLocked: boolean;
  completeOnEnd: boolean;
  title: string;
}

export const VideoPlayer = ({
  videoUrl,
  courseId,
  chapterId,
  nextChapterId,
  isLocked,
  completeOnEnd,
  title,
}: VideoPlayerProps) => {
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();
  const confetti = useConfettiStore();

  useEffect(() => {
    const handleVideoReady = () => {
      setIsReady(true);
    };

    // Simulate video ready state after a short delay
    const timer = setTimeout(handleVideoReady, 1000);

    return () => clearTimeout(timer);
  }, []);

  const onEnd = async () => {
    try {
      if (completeOnEnd) {
        await axios.put(
          `/api/courses/${courseId}/chapters/${chapterId}/progress`,
          {
            isCompleted: true,
          },
        );
        if (!nextChapterId) confetti.onOpen();
        toast.success("Progress updated.");
        router.refresh();

        if (nextChapterId) {
          router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
        }
      }
    } catch (error) {
      toast.error("An error occurred.");
    }
  };

  return (
    <div className="relative aspect-video">
      <YouTubeEmbed url={videoUrl} />
      {!isReady && !isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
          <Loader2 className="h-8 w-8 animate-spin text-secondary" />
        </div>
      )}
      {isLocked && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-y-2 bg-slate-800 text-secondary">
          <Lock className="h-8 w-8" />
          <p className="text-sm">
            This chapter is locked. Please complete the previous chapter to
            unlock it.
          </p>
        </div>
      )}
    </div>
  );
};
