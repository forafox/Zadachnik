import {
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import z from "zod";
import { taskSchema } from "@/entities/task";
import { api } from "@/shared/api";
import {
  paginatedRequestSchema,
  paginatedResponseSchema,
} from "@/shared/api/schemas.ts";

export const sprintSchema = z.object({
  id: z.number(),
  length: z.number(),
  startAt: z.coerce.date(),
  planningDateTime: z.coerce.date(),
  retroDateTime: z.coerce.date(),
  reviewDateTime: z.coerce.date(),
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
  .omit({ id: true })
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
