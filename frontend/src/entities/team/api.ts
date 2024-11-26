import { z } from "zod";
import { userSchema } from "../user";
import { paginatedRequestSchema, paginatedResponseSchema } from "@/shared/api/schemas";
import { queryOptions } from "@tanstack/react-query";
import { api } from "@/shared/api";

export const teamSchema = z.object({
  id: z.string(),
  title: z.string(),
  scrumMaster: userSchema,
});

export type Team = z.infer<typeof teamSchema>;

const getTeamsRequestSchema = paginatedRequestSchema;
const getTeamsResponseSchema = paginatedResponseSchema(teamSchema);

export const getTeamsQueryOptions = (
  queryRaw: z.infer<typeof getTeamsRequestSchema>,
) => {
  const query = getTeamsRequestSchema.parse(queryRaw);
  return queryOptions({
    queryKey: ["products", "list", query],
    queryFn: async () => {
      const { data } = await api.api.getTeams({
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

