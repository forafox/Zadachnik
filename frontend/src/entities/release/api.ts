import { z } from "zod";
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { articleSchema } from "@/entities/article";
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { sprintSchema } from "@/entities/sprint";
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
      tasks: query.tasks.map((it) => ({id: it.id})),
      version: query.version,
      sprintId: query.sprint.id,
    });
    return data;
  },
);
