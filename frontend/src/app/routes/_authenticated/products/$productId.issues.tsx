import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_authenticated/products/$productId/issues",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return "Hello /_authenticated/products/$productId/issues!";
}
