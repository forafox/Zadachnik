import { z } from "zod";
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { articleSchema } from "@/entities/article";
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { taskSchema } from "@/entities/task";
import { api } from "@/shared/api";
import { generateMutation } from "@/shared/api/generate-mutation.tsx";

export const releaseSchema = z.object({
  id: z.number(),
  version: z.string(),
  releaseNotes: articleSchema,
  tasks: taskSchema.array(),
  productId: z.number(),
});

export const createReleaseMutationRequestSchema = z.object({
  version: z.string(),
  releaseNotes: z.string(),
  sprintId: z.number(),
  tasks: z.object({ id: z.number() }).array(),
  productId: z.number(),
});

export const useCreateReleaseMutation = generateMutation(
  createReleaseMutationRequestSchema,
  releaseSchema,
  async (query) => {
    const { data } = await api.api.createProductRelease(query.productId, {
      ...query,
    });
    return data;
  },
);
