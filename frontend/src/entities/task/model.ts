import z from "zod";
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { userSchema } from "@/entities/user";

export const taskType = z.enum(["task", "story", "epic"]);
export type TaskType = z.infer<typeof taskType>;

export const taskStatus = z.enum([
  "backlog",
  "to_do",
  "in_review",
  "in_progress",
  "ready_to_merge",
  "done",
  "canceled",
  "could_not_reproduce",
  "will_not_fix",
  "duplicate",
]);

export type TaskStatus = z.infer<typeof taskStatus>;
export type StatusGroup = "backlog" | "started" | "completed" | "canceled";

export const statusGroups = {
  backlog: ["backlog", "to_do"],
  started: ["in_progress", "in_review", "ready_to_merge"],
  completed: ["done"],
  canceled: ["canceled", "could_not_reproduce", "will_not_fix", "duplicate"],
} satisfies Record<StatusGroup, TaskStatus[]>;

export const taskSchema = z.object({
  id: z.number(),
  type: taskType,
  title: z.string(),
  description: z.string().optional(),
  assignee: userSchema.optional(),
  status: taskStatus,
});

export type Task = z.infer<typeof taskSchema>;
