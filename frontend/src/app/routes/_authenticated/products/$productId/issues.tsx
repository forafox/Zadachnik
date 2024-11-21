import { createFileRoute } from "@tanstack/react-router";
import { ProductIssuesPage } from "@/pages/product-issues";
import { getProductByIdQueryOptions } from "@/entities/product";

export const Route = createFileRoute(
  "/_authenticated/products/$productId/issues",
)({
  component: RouteComponent,
  loader: ({ context, params }) => {
    return context.queryClient.ensureQueryData(
      getProductByIdQueryOptions(Number(params.productId)),
    );
  },
});

function RouteComponent() {
  const product = Route.useLoaderData();
  return <ProductIssuesPage product={product} />;
}
