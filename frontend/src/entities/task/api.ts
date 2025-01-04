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
      const { data } = await api.api.getTasksByProductId(req.productId, req);
      return getProductTasksResponseSchema.parse(data);
    },
  });
};
