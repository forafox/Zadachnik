import { useMutation } from "@tanstack/react-query";
import z from "zod";

export function generateMutation<
  Params extends z.Schema,
  Response extends z.Schema,
>(
  paramsSchema: Params,
  responseSchema: Response,
  mutationFn: (query: z.infer<Params>) => Promise<z.infer<Response>>,
) {
  return () =>
    useMutation({
      mutationFn: async (valuesRaw: z.infer<Params>) => {
        const values = paramsSchema.parse(valuesRaw);
        const data = await mutationFn(values);
        return responseSchema.parse(data);
      },
    });
}
