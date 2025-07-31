"use client";

import { CheckCircle, Circle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import { cn } from "@/lib/utils";
import axios from "axios";

interface CourseProgressButtonProps {
  chapterId: string;
  courseId: string;
  nextChapterId?: string;
  isCompleted?: boolean;
}

export const CourseProgressButton = ({
  chapterId,
  courseId,
  nextChapterId,
  isCompleted,
}: CourseProgressButtonProps) => {
  const router = useRouter();
  const confetti = useConfettiStore();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      await axios.put(
        `/api/courses/${courseId}/chapters/${chapterId}/progress`,
        {
          isCompleted: !isCompleted,
        },
      );

      if (!isCompleted && !nextChapterId) {
        confetti.onOpen();
      }

      if (!isCompleted && nextChapterId) {
        router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
      }

      toast.success("Progress updated");
      router.refresh();
    } catch (error) {
      toast.error("Error updating progress");
    } finally {
      setIsLoading(false);
    }
  };

  const Icon = isCompleted ? CheckCircle : Circle;

  return (
    <Button
      onClick={onClick}
      type="button"
      variant={isCompleted ? "outline" : "success"}
      className="w-full md:w-auto"
    >
      <span
        className={cn({
          "text-green-800": isCompleted,
        })}
      >
        {isLoading
          ? "Loading..."
          : isCompleted
            ? "Completed"
            : "Mark as completed"}
      </span>
      <Icon
        className={cn("ml-2 h-4 w-4", {
          "text-green-800": isCompleted,
        })}
      />
    </Button>
  );
};
