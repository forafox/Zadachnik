import { TaskType } from "@/entities/task";
import { Badge } from "@/shared/components/ui/badge.tsx";
import { cn } from "@/shared/lib/utils.ts";

export function TaskTypeBadge({ type, children }: { type: TaskType, children ?: React.ReactNode }) {
  return (
    <Badge
      className={cn("capitalize", {
        "bg-gray-300 text-gray-600 hover:bg-gray-200": type === "task",
        "bg-blue-300 text-blue-600 hover:bg-blue-200": type === "story",
        "bg-violet-300 text-violet-600 hover:bg-violet-200": type === "epic",
      })}
    >
      {children ?? type}
    </Badge>
  );
}
