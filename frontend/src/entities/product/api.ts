import { queryOptions } from "@tanstack/react-query";
import { z } from "zod";
import { api } from "@/shared/api";
import {
  paginatedRequestSchema,
  paginatedResponseSchema,
} from "@/shared/api/schemas.ts";
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { userSchema } from "../user";

export const productSchema = z.object({
  id: z.number(),
  title: z.string(),
  ticker: z.string(),
  description: z.string().optional(),
  owner: userSchema,
});

export type Product = z.infer<typeof productSchema>;

export const detailedProductSchema = productSchema.extend({});

export type DetailedProduct = z.infer<typeof detailedProductSchema>;

export const getProductsRequestSchema = paginatedRequestSchema;
export const getProductsResponseSchema = paginatedResponseSchema(productSchema);

export const getProductsQueryOptions = (
  queryRaw: z.infer<typeof getProductsRequestSchema>,
) => {
  const query = getProductsRequestSchema.parse(queryRaw);
  return queryOptions({
    queryKey: ["products", "list", query],
    queryFn: async () => {
      const { data } = await api.api.getProducts({
        size: query.pageSize,
        page: query.page - 1,
      });
      return getProductsResponseSchema.parse({
        page: data.pageable?.pageNumber,
        pageSize: data.pageable?.pageSize,
        total: data.totalElements,
        values: data.content,
      });
    },
  });
};
