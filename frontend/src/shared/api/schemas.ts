import z from "zod";
import { Page } from "@/shared/api.gen.ts";

const DEFAULT_PAGE_SIZE = 50;
const DEFAULT_PAGE = 1;

export const defaultPagination = {
  pageSize: DEFAULT_PAGE_SIZE,
  page: DEFAULT_PAGE,
};

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

export function toBackendPagination(
  req: z.infer<typeof paginatedRequestSchema>,
) {
  return {
    page: req.page - 1,
    size: req.pageSize,
  };
}

export function fromBackendPagination<T>(data: Page): {
  values: T[];
  page: number;
  pageSize: number;
  total: number;
} {
  return {
    values: (data.content ?? []) as Array<T>,
    page: (data.number ?? 0) + 1,
    total: data.totalElements ?? 0,
    pageSize: data.size ?? 0,
  };
}
