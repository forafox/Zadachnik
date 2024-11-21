import z from "zod";

const DEFAULT_PAGE_SIZE = 50;
const DEFAULT_PAGE = 1;

export const paginatedRequestSchema = z.object({
  page: z.number().catch(DEFAULT_PAGE),
  pageSize: z.number().catch(DEFAULT_PAGE_SIZE),
});

export function paginatedResponseSchema<T extends z.Schema>(t: T) {
  return z.object({
    total: z.number(),
    page: z.number(),
    pageSize: z.number(),
    values: z.array(t),
  });
}
