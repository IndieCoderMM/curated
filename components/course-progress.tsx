import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface CourseProgressProps {
  value: number;
  variant?: "default" | "success" | "accent";
  size?: "default" | "sm";
}

const colorByVariant = {
  default: "text-primary",
  accent: "text-accent-foreground",
  success: "text-emerald-700",
};

const sizeByVariant = {
  default: "text-sm",
  sm: "text-xs",
};

export const CourseProgress = ({
  value,
  variant,
  size,
}: CourseProgressProps) => {
  return (
    <div>
      <Progress className="h-2" value={value} variant={variant} />
      <p
        className={cn(
          "mt-2 font-medium text-sky-700",
          colorByVariant[variant || "default"],
          sizeByVariant[size || "default"],
        )}
      >
        {Math.round(value)}% Completed
      </p>
    </div>
  );
};
