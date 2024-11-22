import { createFileRoute } from "@tanstack/react-router";
import { ProductReleasesPage } from "@/pages/product-releases";
import { getProductByIdQueryOptions } from "@/entities/product";

export const Route = createFileRoute(
  "/_authenticated/products/$productId/releases",
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

  return <ProductReleasesPage product={product} />;
}
