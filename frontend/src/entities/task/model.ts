import z from "zod";
import { productSchema } from "@/entities/product";
import { userSchema } from "@/entities/user";
import { api } from "@/shared/api";
import { generateQueryOptions } from "@/shared/api/generate-query-options.tsx";
import {
  fromBackendPagination,
  paginatedRequestSchema,
  paginatedResponseSchema,
  toBackendPagination,
} from "@/shared/api/schemas.ts";

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
  product: productSchema,
  type: taskType,
  title: z.string(),
  description: z
    .string()
    .nullish()
    .transform((it) => it ?? undefined),
  assignee: userSchema.nullish().transform((it) => it ?? undefined),
  status: taskStatus,
});

export type Task = z.infer<typeof taskSchema>;

const taskField = z.enum([
  "id",
  "type",
  "title",
  "description",
  "product",
  "status",
  "assignee_username",
]);

export const taskChangeSchema = z.object({
  field: z.string().toLowerCase().pipe(taskField),
  previousValue: z.coerce.string(),
  newValue: z.coerce.string(),
  changedBy: userSchema,
  changedAt: z.coerce.date(),
});

export type TaskChangeEntry = z.infer<typeof taskChangeSchema>;

export const getTaskHistoryQueryOptions = generateQueryOptions(
  paginatedResponseSchema(taskChangeSchema),
  paginatedRequestSchema.extend({ productId: z.number(), taskId: z.number() }),
  async ({ productId, taskId, ...req }) => {
    const { data } = await api.api.getTaskChanges(
      taskId,
      productId,
      toBackendPagination(req),
    );
    return fromBackendPagination(data);
  },
  ({ productId, taskId, ...req }) => [
    "products",
    productId,
    "tasks",
    taskId,
    "history",
    req,
  ],
);
