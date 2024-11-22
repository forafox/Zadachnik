import { createFileRoute } from "@tanstack/react-router";
import { ProductIndexPage } from "@/pages/product-index";
import { getProductByIdQueryOptions } from "@/entities/product";

export const Route = createFileRoute("/_authenticated/products/$productId/")({
  component: RouteComponent,
  loader: ({ context, params }) => {
    return context.queryClient.ensureQueryData(
      getProductByIdQueryOptions(Number(params.productId)),
    );
  },
});

function RouteComponent() {
  const product = Route.useLoaderData();

  return <ProductIndexPage product={product} />;
}
