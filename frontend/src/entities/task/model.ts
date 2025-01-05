import z from "zod";
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { userSchema } from "@/entities/user";

export const taskType = z
  .string()
  .toLowerCase()
  .pipe(z.enum(["task", "story", "epic"]));
export type TaskType = z.infer<typeof taskType>;

export const taskTypes: Array<TaskType> = ["task", "story", "epic"];

export const taskStatus = z
  .string()
  .toLowerCase()
  .pipe(
    z.enum([
      "backlog",
      "to_do",
      "in_review",
      "in_progress",
      "ready_to_merge",
      "done",
      "cancelled",
      "could_not_reproduce",
      "will_not_fix",
      "duplicate",
    ]),
  );

export type TaskStatus = z.infer<typeof taskStatus>;
export type StatusGroup = "backlog" | "started" | "completed" | "cancelled";

export const statusGroups = {
  backlog: ["backlog", "to_do"],
  started: ["in_progress", "in_review", "ready_to_merge"],
  completed: ["done"],
  cancelled: ["cancelled", "could_not_reproduce", "will_not_fix", "duplicate"],
} satisfies Record<StatusGroup, TaskStatus[]>;

export const taskSchema = z.object({
  id: z.number(),
  type: taskType,
  title: z.string(),
  description: z.string().optional(),
  assignee: userSchema.nullish().transform((it) => it ?? undefined),
  status: taskStatus,
});

export type Task = z.infer<typeof taskSchema>;
