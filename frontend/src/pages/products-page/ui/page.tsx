import { useSuspenseQuery } from "@tanstack/react-query";
import { getProductsQueryOptions } from "@/entities/product";
import { useProductsTable } from "@/entities/product";
import { DataTable } from "@/shared/components/data-table.tsx";

export function ProductsPage() {
  const { data } = useSuspenseQuery(
    getProductsQueryOptions({
      page: 1,
      pageSize: 50,
    }),
  );

  const table = useProductsTable(data.values);

  return <DataTable table={table} />;
}
