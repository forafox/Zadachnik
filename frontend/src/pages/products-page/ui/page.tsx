import { useSuspenseQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import z from "zod";
import {
  getProductsQueryOptions,
  getProductsRequestSchema,
  getProductsResponseSchema,
} from "@/entities/product";
import { useProductsTable } from "@/entities/product";
import { DataTable } from "@/shared/components/data-table.tsx";
import { PaginationFooter } from "@/shared/components/pagination.tsx";

type Query = z.infer<typeof getProductsRequestSchema>;

type Props = { products: z.infer<typeof getProductsResponseSchema> } & Query;

export function ProductsPage({ products, ...query }: Props) {
  const { data } = useSuspenseQuery({
    ...getProductsQueryOptions(query),
    initialData: products,
  });
  const navigate = useNavigate({
    from: "/products/",
  });
  function setQuery(updater: (query: Query) => Query) {
    void navigate({
      search: updater,
    });
  }

  const table = useProductsTable(data.values);

  return (
    <div className="space-y-4">
      <DataTable table={table} />
      {data.total > data.pageSize && (
        <PaginationFooter
          query={query}
          total={data.total}
          setQuery={setQuery}
        />
      )}
    </div>
  );
}
