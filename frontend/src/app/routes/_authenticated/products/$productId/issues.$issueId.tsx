import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";

export const Route = createFileRoute(
  "/_authenticated/products/$productId/issues/$issueId",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return "Hello /_authenticated/products/$productId/issues/$issueId!";
}
