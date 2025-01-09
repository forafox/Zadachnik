import { StatusGroup, statusGroups, TaskStatus } from "@/entities/task";

export function getStatusGroup(status: TaskStatus): StatusGroup {
  const groups = Object.keys(statusGroups) as StatusGroup[];

  // @ts-expect-error can't type object keys
  return groups.find((group) => statusGroups[group].includes(status))!;
}

export const colors = {
  backlog: "bg-gray-300 text-gray-600 hover:bg-gray-200",
  started: "bg-blue-300 text-blue-600 hover:bg-blue-200",
  completed: "bg-green-300 text-green-600 hover:bg-green-200",
  cancelled: "bg-amber-300 text-amber-600 hover:bg-amber-200",
};
