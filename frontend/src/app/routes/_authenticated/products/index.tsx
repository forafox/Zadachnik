import { createFileRoute } from "@tanstack/react-router";
import { ProductsPage } from "@/pages/products-page";

export const Route = createFileRoute("/_authenticated/products/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ProductsPage />;
}
