import { createFileRoute } from "@tanstack/react-router";
import { getProductByIdQueryOptions } from "@/entities/product";
import { UserHoverCard } from "@/entities/user";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card.tsx";
import { Separator } from "@/shared/components/ui/separator.tsx";

export const Route = createFileRoute("/_authenticated/products/$productId")({
  component: RouteComponent,
  loader: ({ context, params }) => {
    return context.queryClient.ensureQueryData(
      getProductByIdQueryOptions(Number(params.productId)),
    );
  },
});

function RouteComponent() {
  const product = Route.useLoaderData();

  return (
    <div className="prose mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-sm font-medium">[{product.ticker}]</span>
            <span>{product.title}</span>
          </CardTitle>
          <CardDescription>{product.description}</CardDescription>
        </CardHeader>
        <Separator orientation="horizontal" />
        <CardContent>
          <p>
            Owned by
            <UserHoverCard user={product.owner} />
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
