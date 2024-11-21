import { createFileRoute } from "@tanstack/react-router";
import { ProductsPage } from "@/pages/products-page";
import {
  getProductsQueryOptions,
  getProductsRequestSchema,
} from "@/entities/product";

export const Route = createFileRoute("/_authenticated/products/")({
  component: RouteComponent,
  validateSearch: getProductsRequestSchema,
  loaderDeps: (params) => params.search,
  loader: ({ deps, context }) => {
    return context.queryClient.ensureQueryData(getProductsQueryOptions(deps));
  },
});

function RouteComponent() {
  const search = Route.useSearch();
  const data = Route.useLoaderData();

  return <ProductsPage {...search} products={data} />;
}
