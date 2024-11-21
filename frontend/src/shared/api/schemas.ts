import z from "zod";

export const paginatedRequestSchema = z.object({
  page: z.number(),
  pageSize: z.number(),
});

export function paginatedResponseSchema<T extends z.Schema>(t: T) {
  return z.object({
    total: z.number(),
    page: z.number(),
    pageSize: z.number(),
    values: z.array(t),
  });
}
