"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import YouTubeEmbed from "@/components/youtube-embed";
import { zodResolver } from "@hookform/resolvers/zod";
import { Chapter } from "@prisma/client";
import { Pencil, PlusCircle, Video } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface ChapterVideoFormProps {
  initialData: Chapter;
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  videoUrl: z.string().min(1),
});

export const ChapterVideoForm = ({
  initialData,
  courseId,
  chapterId,
}: ChapterVideoFormProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { isSubmitting, isValid } = form.formState;
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        values,
      );
      toast.success("Video updated successfully");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Failed to update video");
    }
  };

  return (
    <div className="mt-6 rounded-md border bg-slate-100 p-4">
      <div className="flex items-center justify-between font-medium">
        <span>Video</span>
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData.videoUrl && (
            <>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Video
            </>
          )}
          {!isEditing && initialData.videoUrl && (
            <>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </>
          )}
        </Button>
      </div>
      {!isEditing ? (
        !initialData.videoUrl ? (
          <div className="flex h-60 items-center justify-center rounded-md bg-slate-200">
            <Video className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="aspect-video w-full">
            <YouTubeEmbed url={initialData.videoUrl} />
          </div>
        )
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-4 space-y-4"
          >
            <FormField
              control={form.control}
              name="videoUrl"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isSubmitting}
                      placeholder="Enter video URL"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button type="submit" disabled={!isValid || isSubmitting}>
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
      {initialData.videoUrl && !isEditing && (
        <div className="mt-2 text-xs text-muted-foreground">
          Videos may take a few minutes to process. Refresh the page if the
          video does not appear.
        </div>
      )}
    </div>
  );
};

export default ChapterVideoForm;
