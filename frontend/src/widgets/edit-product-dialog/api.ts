import { useMutation, useQueryClient } from "@tanstack/react-query";
import z from "zod";
import { api } from "@/shared/api";

export const editProductRequest = z.object({
  id: z.number(),
  ticker: z.string(),
  title: z.string(),
  description: z
    .string()
    .nullish()
    .transform((x) => x ?? undefined),
});

export function useEditProductMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (valuesRaw: z.infer<typeof editProductRequest>) => {
      const values = editProductRequest.parse(valuesRaw);
      const { data } = await api.api.updateProductById(values.id, {
        ...values,
        description: values.description ?? undefined,
      });
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });
}
