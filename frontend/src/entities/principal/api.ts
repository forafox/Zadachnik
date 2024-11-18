import { queryOptions } from "@tanstack/react-query";
import z from "zod";
import { api } from "@/shared/api";

export const principalSchema = z.object({
  username: z.string(),
  fullName: z.string(),
  id: z.number(),
  role: z.enum(["ADMIN", "USER"]),
});

export const getPrincipalQueryOptions = queryOptions({
  queryKey: ["principal"],
  queryFn: async () => {
    const { data } = await api.api.me();
    return principalSchema.parse(data);
  },
});

export type Principal = z.infer<typeof principalSchema>;