import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseQuery } from "@tanstack/react-query";
import { getProductByIdQueryOptions } from "@/entities/product";

export const Route = createFileRoute(
  '/_authenticated/products/$productId/releases/$releaseId',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const productId = parseInt(Route.useParams().productId);
  const { data: product } = useSuspenseQuery(
    getProductByIdQueryOptions(productId),
  );

  return 'Hello /_authenticated/products/$productId/releases/$releaseId!'
}
