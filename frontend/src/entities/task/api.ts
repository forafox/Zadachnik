import { queryOptions } from "@tanstack/react-query";
import z from "zod";
import { taskSchema, taskStatus } from "@/entities/task/model.ts";
import { api } from "@/shared/api";
import { paginatedResponseSchema } from "@/shared/api/schemas.ts";

export const getProductTasksRequestSchema = z.object({
  productId: z.number(),
  assigneeId: z.number().optional(),
  status: taskStatus,
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
    queryKey: ["products", "detail", req.productId, "tasks"],
    queryFn: async () => {
      const { data } = await api.api.getTasksByProductId(req.productId, {
        ...req,
        pageNumber: req.page - 1,
      });
      return getProductTasksResponseSchema.parse(data);
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
