import { useMutation, useQueryClient } from "@tanstack/react-query";
import z from "zod";
import { api } from "@/shared/api";

export const createProductRequest = z.object({
  ticker: z.string(),
  title: z.string(),
  description: z
    .string()
    .nullish()
    .transform((x) => x ?? undefined),
});

export function useCreateProductMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (valuesRaw: z.infer<typeof createProductRequest>) => {
      const values = createProductRequest.parse(valuesRaw);
      const { data } = await api.api.createProduct({
        ...values,
        description: values.description ?? undefined,
      });
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });
}
