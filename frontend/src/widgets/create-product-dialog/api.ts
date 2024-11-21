import { useMutation, useQueryClient } from "@tanstack/react-query";
import z from "zod";
import { api } from "@/shared/api";

export const createProductRequest = z.object({
  ticker: z.string(),
  title: z.string(),
  description: z.string().optional(),
});

export function useCreateProductMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (valuesRaw: z.infer<typeof createProductRequest>) => {
      const values = createProductRequest.parse(valuesRaw);
      return api.api.createProduct(values);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });
}
