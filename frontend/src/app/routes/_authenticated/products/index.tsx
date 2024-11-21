import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/products/")({
  component: RouteComponent,
});

function RouteComponent() {
  return "Hello /_authenticated/products/!";
}
