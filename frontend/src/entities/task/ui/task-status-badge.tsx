import { TaskStatus } from "@/entities/task";
import { colors, getStatusGroup } from "@/entities/task/ui/status-logic.tsx";
import { Badge } from "@/shared/components/ui/badge.tsx";
import { cn } from "@/shared/lib/utils.ts";

export function TaskStatusBadge({ status }: { status: TaskStatus }) {
  const group = getStatusGroup(status);

  return (
    <Badge className={cn("capitalize", colors[group])}>
      {status?.replace(new RegExp("_", "g"), " ")}
    </Badge>
  );
}
