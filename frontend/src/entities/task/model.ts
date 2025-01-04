import z from "zod";
import { userSchema } from "@/entities/user";

export const taskType = z.enum(["task", "story", "epic"]);

export const taskStatus = z.enum([
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
]);

export const taskSchema = z.object({
  id: z.number(),
  type: taskType,
  title: z.string(),
  description: z.string().optional(),
  assignee: userSchema.optional(),
  status: taskStatus,
});

export type Task = z.infer<typeof taskSchema>;
