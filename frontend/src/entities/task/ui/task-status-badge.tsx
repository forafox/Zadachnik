import { StatusGroup, statusGroups, TaskStatus } from "@/entities/task";
import { Badge } from "@/shared/components/ui/badge.tsx";
import { cn } from "@/shared/lib/utils.ts";

function getStatusGroup(status: TaskStatus): StatusGroup {
  const groups = Object.keys(statusGroups) as StatusGroup[];

  // @ts-expect-error can't type object keys
  return groups.find((group) => statusGroups[group].includes(status))!;
}

export function TaskStatusBadge({ status }: { status: TaskStatus }) {
  const group = getStatusGroup(status);

  return (
    <Badge
      className={cn("capitalize", {
        "bg-gray-300 text-gray-600 hover:bg-gray-200": group === "backlog",
        "bg-blue-300 text-blue-600 hover:bg-blue-200": group === "started",
        "bg-green-300 text-green-600 hover:bg-green-200": group === "completed",
        "bg-amber-300 text-amber-600 hover:bg-amber-200":
          group === "cancelled",
      })}
    >
      {status.replace(new RegExp("_", "g"), " ")}
    </Badge>
  );
}
