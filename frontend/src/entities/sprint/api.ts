import {
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import z from "zod";
import { taskSchema, taskStatus } from "@/entities/task";
import { teamSchema } from "@/entities/team";
import { api } from "@/shared/api";
import { generateQueryOptions } from "@/shared/api/generate-query-options.tsx";
import {
  fromBackendPagination,
  paginatedRequestSchema,
  paginatedResponseSchema,
  toBackendPagination,
} from "@/shared/api/schemas.ts";

export const sprintSchema = z.object({
  id: z.number(),
  length: z.coerce.number(),
  startAt: z.coerce.date(),
  planningDateTime: z.coerce.date(),
  retroDateTime: z.coerce.date(),
  reviewDateTime: z.coerce.date(),
  team: teamSchema,
});

export type Sprint = z.infer<typeof sprintSchema>;
export const getTeamSprintsRequestSchema = paginatedRequestSchema.extend({
  teamId: z.number(),
});
export const getTeamSprintsResponseSchema =
  paginatedResponseSchema(sprintSchema);

export const getTeamSprintsQueryOptions = (
  queryRaw: z.infer<typeof getTeamSprintsRequestSchema>,
) => {
  const query = getTeamSprintsRequestSchema.parse(queryRaw);
  return queryOptions({
    queryKey: ["sprints", "list", query],
    queryFn: async () => {
      const { data } = await api.api.getSprintsByTeamId(query.teamId, {
        pageSize: query.pageSize,
        pageNumber: query.page - 1,
      });
      return getTeamSprintsResponseSchema.parse({
        page: data.pageable?.pageNumber,
        pageSize: data.pageable?.pageSize,
        total: data.totalElements,
        values: data.content,
      });
    },
  });
};

export const createSprintRequestSchema = sprintSchema
  .omit({ id: true, team: true })
  .extend({ teamId: z.number(), tasks: taskSchema.array() });
export type CreateSprintValues = z.infer<typeof createSprintRequestSchema>;

export function useCreateSprintMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (valuesRaw: CreateSprintValues) => {
      const values = createSprintRequestSchema.parse(valuesRaw);
      const { data } = await api.api.createSprint(values.teamId, {
        ...values,
        tasksIds: values.tasks.map((it) => it.id),
        startsAt: values.startAt.toISOString(),
        planningDateTime: values.planningDateTime.toISOString(),
        retroDateTime: values.retroDateTime.toISOString(),
        reviewDateTime: values.reviewDateTime.toISOString(),
      });
      return sprintSchema.parse(data);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["sprints"] }),
  });
}

export const getSprintByIdQueryOptions = generateQueryOptions(
  sprintSchema,
  z.object({ teamId: z.number(), sprintId: z.number() }),
  async ({ teamId, sprintId }) => {
    const { data } = await api.api.getSprintsByTeamIdAndSprintId(
      teamId,
      sprintId,
    );
    return data;
  },
  ({ teamId, sprintId }) => ["teams", teamId, "sprints", sprintId],
);

export const getSprintTasksQueryOptions = generateQueryOptions(
  paginatedResponseSchema(taskSchema),
  z.object({
    sprintId: z.number(),
    teamId: z.number(),
    assigneeId: z.number().optional(),
    status: taskStatus.optional(),
    page: z.number(),
    pageSize: z.number(),
  }),
  async ({ teamId, sprintId, status, assigneeId, ...req }) => {
    const { data } = await api.api.getSprintTasks(teamId, sprintId, {
      ...toBackendPagination(req),
      status: status?.toUpperCase(),
      assigneeId,
    });
    return fromBackendPagination(data);
  },
  ({ teamId, sprintId, ...req }) => [
    "teams",
    teamId,
    "sprints",
    sprintId,
    "tasks",
    req,
  ],
);
