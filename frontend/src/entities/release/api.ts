import { z } from "zod";
import { articleSchema } from "@/entities/article";
import { productSchema } from "@/entities/product";
import { sprintSchema } from "@/entities/sprint";
import { taskSchema } from "@/entities/task";
import { api } from "@/shared/api";
import { generateMutation } from "@/shared/api/generate-mutation.tsx";
import { generateQueryOptions } from "@/shared/api/generate-query-options.tsx";
import {
  fromBackendPagination,
  paginatedRequestSchema,
  paginatedResponseSchema,
  toBackendPagination,
} from "@/shared/api/schemas.ts";

export const releaseSchema = z.object({
  id: z.number(),
  version: z.string(),
  releaseNotes: articleSchema,
  tasks: taskSchema.array(),
  product: productSchema,
  sprint: sprintSchema,
});

export type Release = z.infer<typeof releaseSchema>;

export const createReleaseMutationRequestSchema = z.object({
  version: z.string(),
  releaseNotes: z.string(),
  sprint: sprintSchema,
  tasks: taskSchema.array(),
  productId: z.number(),
});

export const useCreateReleaseMutation = generateMutation(
  createReleaseMutationRequestSchema,
  releaseSchema,
  async ({ productId, ...query }) => {
    const { data } = await api.api.createProductRelease(productId, {
      releaseNotes: query.releaseNotes,
      tasks: query.tasks.map((it) => ({ id: it.id })),
      version: query.version,
      sprintId: query.sprint.id,
    });
    return data;
  },
);

export const getReleasesQueryOptions = generateQueryOptions(
  paginatedResponseSchema(releaseSchema),
  paginatedRequestSchema.extend({ productId: z.number() }),
  async ({ productId, ...req }) => {
    const { data } = await api.api.getProductReleases(
      productId,
      toBackendPagination(req),
    );
    return fromBackendPagination(data);
  },
  ({ productId, ...req }) => ["products", productId, "releases", req],
);

export const getReleaseByIdQueryOptions = generateQueryOptions(
  releaseSchema,
  z.object({ productId: z.number(), releaseId: z.number() }),
  async ({ productId, releaseId }) => {
    const { data } = await api.api.getProductReleaseById(productId, releaseId);
    return data;
  },
  ({ productId, ...req }) => ["products", productId, "releases", req],
);
