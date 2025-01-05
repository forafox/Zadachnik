import {
  queryOptions,
  useMutation,
} from "@tanstack/react-query";
import z from "zod";
import { taskSchema, taskStatus } from "@/entities/task/model.ts";
import { api } from "@/shared/api";
import { paginatedResponseSchema } from "@/shared/api/schemas.ts";

export const getProductTasksRequestSchema = z.object({
  productId: z.number(),
  assigneeId: z.number().optional(),
  status: taskStatus.optional(),
  teamId: z.number().optional(),
  page: z.number(),
  pageSize: z.number(),
});
export type GetProductTasksRequestValues = z.infer<
  typeof getProductTasksRequestSchema
>;

export const getProductTasksResponseSchema =
  paginatedResponseSchema(taskSchema);

export const getProductTasksQueryOptions = (
  reqRaw: GetProductTasksRequestValues,
) => {
  const req = getProductTasksRequestSchema.parse(reqRaw);
  return queryOptions({
    queryKey: ["products", "detail", req.productId, "tasks", req],
    queryFn: async () => {
      const { data } = await api.api.getTasksByProductId(req.productId, {
        ...req,
        pageNumber: req.page - 1,
        status: req.status?.toUpperCase(),
      });
      return getProductTasksResponseSchema.parse({
        values: data.content,
        page: data.number + 1,
        pageSize: data.size,
        total: data.totalElements,
      });
    },
  });
};

export const getTeamTasksRequestSchema = z.object({
  assigneeId: z.number().optional(),
  status: taskStatus.optional(),
  teamId: z.number(),
  page: z.number(),
  pageSize: z.number(),
});
export type GetTeamTasksRequestValues = z.infer<
  typeof getTeamTasksRequestSchema
>;

export const getTeamTasksResponseSchema = paginatedResponseSchema(taskSchema);

export const getTeamTasksQueryOptions = (reqRaw: GetTeamTasksRequestValues) => {
  const req = getTeamTasksRequestSchema.parse(reqRaw);
  return queryOptions({
    queryKey: ["teams", "detail", req.teamId, "tasks"],
    queryFn: async () => {
      return getTeamTasksResponseSchema.parse({
        total: 0,
        page: 0,
        pageSize: 0,
        values: [],
      });
    },
  });
};

export const createTaskMutationRequestSchema = taskSchema
  .omit({ id: true })
  .extend({ productId: z.number() })
  .partial({ assignee: true })
export type CreateTaskValues = z.infer<typeof createTaskMutationRequestSchema>;

export function useCreateTaskMutation() {
  return useMutation({
    mutationFn: async (valuesRaw: CreateTaskValues) => {
      const values = createTaskMutationRequestSchema.parse(valuesRaw);
      const { data } = await api.api.createTask(values.productId, {
        type: values.type.toUpperCase(),
        title: values.title,
        description: values.description,
        status: values.status.toUpperCase(),
        assigneeId: values.assignee?.id,
      });
      return taskSchema.parse(data);
    },
  });
}
