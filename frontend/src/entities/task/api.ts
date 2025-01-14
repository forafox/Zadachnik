import { queryOptions, useMutation } from "@tanstack/react-query";
import z from "zod";
import { commentSchema } from "@/entities/comment";
import { taskSchema, taskStatus } from "@/entities/task/model.ts";
import { api } from "@/shared/api";
import { generateQueryOptions } from "@/shared/api/generate-query-options.tsx";
import {
  fromBackendPagination,
  paginatedRequestSchema,
  paginatedResponseSchema,
} from "@/shared/api/schemas.ts";

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
        values: data.content.map((it: Record<string, unknown>) => ({
          ...it,
          productId: req.productId,
        })),
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
  const { teamId, ...req } = getTeamTasksRequestSchema.parse(reqRaw);
  return queryOptions({
    queryKey: ["teams", "detail", teamId, "tasks", req],
    queryFn: async () => {
      const { data } = await api.api.getTasksByTeamId(teamId);
      return getTeamTasksResponseSchema.parse(fromBackendPagination(data));
    },
  });
};

export const getTasksRequestSchema = z.union([
  z.object({
    productId: z.number(),
  }),
  z.object({
    teamId: z.number(),
  }),
  z.object({
    sprintId: z.number(),
    teamId: z.number(),
  }),
]);

export const getTasksQueryOptions = generateQueryOptions(
  getTeamTasksResponseSchema,
  getTasksRequestSchema,
  // @ts-expect-error IDGAF
  async ({ ...req }) => {
    if ("productId" in req) {
      const { productId } = req;
      const { data } = await api.api.getTasksByProductId(productId);
      const paginated = fromBackendPagination(data);
      return paginated;
    }
    if ("teamId" in req && !("sprintId" in req)) {
      const { teamId } = req;
      const { data } = await api.api.getTasksByTeamId(teamId);
      return {
        values: data,
        page: 1,
        pageSize: 100,
        total: (data as unknown[]).length,
      };
    }
    if ("sprintId" in req && "teamId" in req) {
      const { sprintId, teamId } = req;
      const { data } = await api.api.getSprintTasks(teamId, sprintId);
      return {
        values: data,
        page: 1,
        pageSize: 100,
        total: (data as unknown[]).length,
      };
    }
  },
  (req) => ["tasks", req],
);

export const createTaskMutationRequestSchema = taskSchema
  .omit({ id: true })
  .extend({ productId: z.number() })
  .partial({ assignee: true });
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

const updateTaskSchema = taskSchema;

export function useUpdateTaskMutation() {
  return useMutation({
    mutationFn: async (valuesRaw: z.infer<typeof updateTaskSchema>) => {
      const values = updateTaskSchema.parse(valuesRaw);
      return api.api.updateTaskById(values.id, values.product.id, {
        type: values.type.toUpperCase(),
        title: values.title,
        description: values.description,
        status: values.status.toUpperCase(),
        assigneeId: values.assignee?.id,
      });
    },
  });
}

export const getTaskByIdQueryOptions = generateQueryOptions(
  taskSchema,
  z.object({
    taskId: z.number(),
    productId: z.number(),
  }),
  // @ts-expect-error bad status typing on backend
  async ({ taskId, productId }) => {
    const { data } = await api.api.getTaskById(taskId, productId);
    return data;
  },
  ({ productId, taskId }) => [
    "products",
    "detail",
    productId,
    "tasks",
    "detail",
    taskId,
  ],
);

const createTaskCommentMutationRequest = z.object({
  productId: z.number(),
  taskId: z.number(),
  content: z.string(),
});

export function useCreateTaskCommentMutation() {
  return useMutation({
    mutationFn: async (
      valuesRaw: z.infer<typeof createTaskCommentMutationRequest>,
    ) => {
      const values = createTaskCommentMutationRequest.parse(valuesRaw);
      const { data } = await api.api.createComment1(
        values.productId,
        values.taskId,
        { content: values.content },
      );
      return commentSchema.parse(data);
    },
  });
}

export const getTaskCommentsQueryOptions = generateQueryOptions(
  paginatedResponseSchema(commentSchema),
  paginatedRequestSchema.extend({ productId: z.number(), taskId: z.number() }),
  async ({ productId, taskId, page, pageSize }) => {
    const { data } = await api.api.getCommentsByTaskId(productId, taskId, {
      page: page - 1,
      size: pageSize,
    });
    return {
      values: data.content,
      page: data.number + 1,
      pageSize: data.size,
      total: data.totalElements,
    };
  },
  ({ productId, taskId, ...query }) => [
    "products",
    "detail",
    productId,
    "tasks",
    taskId,
    "comments",
    query,
  ],
);
