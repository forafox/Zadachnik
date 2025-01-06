import { QueryKey, queryOptions } from "@tanstack/react-query";
import z from "zod";

export function generateQueryOptions<
  Response extends z.Schema,
  Params extends z.Schema,
>(
  responseSchema: Response,
  querySchema: Params,
  method: (query: z.infer<Params>) => Promise<z.infer<Response>>,
  queryKey: (query: z.infer<Params>) => QueryKey,
) {
  return function (queryRaw: z.infer<Params>) {
    const query = querySchema.parse(queryRaw);
    return queryOptions({
      queryKey: queryKey(query),
      queryFn: async () => {
        const response = await method(query);
        return responseSchema.parse(response) as z.infer<Response>;
      },
    });
  };
}
