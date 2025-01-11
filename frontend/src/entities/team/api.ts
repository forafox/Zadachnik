import { queryOptions } from "@tanstack/react-query";
import { z } from "zod";
import { api } from "@/shared/api";
import { generateQueryOptions } from "@/shared/api/generate-query-options.tsx";
import {
  fromBackendPagination,
  paginatedRequestSchema,
  paginatedResponseSchema,
  toBackendPagination,
} from "@/shared/api/schemas";
import { userSchema } from "../user";

export const teamSchema = z.object({
  id: z.number(),
  title: z.string(),
  scrumMaster: userSchema,
});

export type Team = z.infer<typeof teamSchema>;

export const getTeamsRequestSchema = paginatedRequestSchema;
export const getTeamsResponseSchema = paginatedResponseSchema(teamSchema);

export const getPrincipalTeamsQueryOptions = (
  queryRaw: z.infer<typeof getTeamsRequestSchema>,
) => {
  const query = getTeamsRequestSchema.parse(queryRaw);
  return queryOptions({
    queryKey: ["teams", "list", query],
    queryFn: async () => {
      const { data } = await api.api.getTeamsOfCurrentUser({
        size: query.pageSize,
        page: query.page - 1,
      });
      return getTeamsResponseSchema.parse({
        page: data.pageable?.pageNumber,
        pageSize: data.pageable?.pageSize,
        total: data.totalElements,
        values: data.content,
      });
    },
  });
};

export const getTeamQueryOptions = (id: number) => {
  return queryOptions({
    queryKey: ["teams", "detail", id],
    queryFn: async () => {
      const { data } = await api.api.getTeamById(id);
      return teamSchema.parse(data);
    },
  });
};

export const getTeamParticipantsQueryOptions = generateQueryOptions(
  paginatedResponseSchema(userSchema),
  paginatedRequestSchema.extend({ teamId: z.number() }),
  async ({ teamId, ...req }) => {
    const { data } = await api.api.getUsersOfTeams(
      teamId,
      toBackendPagination(req),
    );
    // @ts-expect-error bad backend typing
    return fromBackendPagination(data);
  },
  ({ teamId, ...req }) => ["teams", teamId, "participants", req],
);
