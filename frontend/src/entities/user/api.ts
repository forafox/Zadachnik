import { queryOptions } from "@tanstack/react-query";
import { z } from "zod";
import { api } from "@/shared/api";
import {
  paginatedRequestSchema,
  paginatedResponseSchema,
} from "@/shared/api/schemas.ts";

export const userSchema = z.object({
  id: z.number(),
  fullName: z.string(),
  username: z.string(),
  role: z.enum(["ADMIN", "USER"]),
});

export type User = z.infer<typeof userSchema>;

const getUsersRequestSchema = paginatedRequestSchema.extend({
  search: z.string().optional(),
});

const getUsersResponseSchema = paginatedResponseSchema(userSchema);

export function getUsersQueryOptions(
  reqRaw: z.infer<typeof getUsersRequestSchema>,
) {
  const req = getUsersRequestSchema.parse(reqRaw);
  return queryOptions({
    queryKey: ["users", req],
    queryFn: async () => {
      const { data } = await api.api.getUsers({ ...req, page: req.page - 1 });
      return getUsersResponseSchema.parse({
        values: data.content,
        page: (data.number ?? 0) + 1,
        pageSize: data.size,
        total: data.totalElements,
      });
    },
  });
}
