import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import z from "zod";
import {
  getPrincipalProductsQueryOptions,
  getProductsRequestSchema,
  useProductsTable,
} from "@/entities/product";
import { DataTable } from "@/shared/components/data-table.tsx";
import { PaginationFooter } from "@/shared/components/pagination.tsx";

export const Route = createFileRoute("/_authenticated/products/")({
  component: RouteComponent,
  validateSearch: getProductsRequestSchema,
  loaderDeps: (params) => params.search,
  loader: ({ deps, context }) => {
    return context.queryClient.ensureQueryData(
      getPrincipalProductsQueryOptions(deps),
    );
  },
});

type Query = z.infer<typeof getProductsRequestSchema>;

function RouteComponent() {
  const search = Route.useSearch();

  const { data } = useSuspenseQuery(getPrincipalProductsQueryOptions(search));
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
          query={search}
          total={data.total}
          setQuery={setQuery}
        />
      )}
    </div>
  );
}
