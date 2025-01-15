import { DialogTrigger } from "@radix-ui/react-dialog";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Pencil } from "lucide-react";
import { useTranslation } from "react-i18next";
import { EditProductDialogContent } from "@/widgets/edit-product-dialog";
import { getPrincipalQueryOptions } from "@/entities/principal";
import { getProductByIdQueryOptions } from "@/entities/product";
import { ProductInvitations } from "@/entities/product";
import { ProductParticipants } from "@/entities/product";
import { UserHoverCard } from "@/entities/user";
import { defaultPagination } from "@/shared/api/schemas.ts";
import { SetSidebarBreadcrumbs } from "@/shared/components/sidebar-breadcrumbs.tsx";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/shared/components/ui/breadcrumb.tsx";
import { Button } from "@/shared/components/ui/button.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card.tsx";
import { Separator } from "@/shared/components/ui/separator.tsx";
import { useDialog } from "@/shared/hooks/use-dialog.tsx";

export const Route = createFileRoute("/_authenticated/products/$productId/")({
  component: RouteComponent,
  loader: ({ context, params }) => {
    return context.queryClient.prefetchQuery(
      getProductByIdQueryOptions(Number(params.productId)),
    );
  },
});

function RouteComponent() {
  const productId = Route.useParams().productId;
  const { data: product } = useSuspenseQuery(
    getProductByIdQueryOptions(parseInt(productId)),
  );
  const { t } = useTranslation("product");
  const { data: principal } = useSuspenseQuery(getPrincipalQueryOptions);
  const { Dialog, onClose } = useDialog();

  return (
    <div className="prose mx-auto">
      <SetSidebarBreadcrumbs>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbLink asChild>
              <Link search={defaultPagination} to="/products">
                {t("products.label")}
              </Link>
            </BreadcrumbLink>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <Link
                to="/products/$productId"
                params={{ productId: String(product.id) }}
              >
                {product.title}
              </Link>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </SetSidebarBreadcrumbs>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-xl">{product.title}</span>
            <span className="text-sm font-medium">[{product.ticker}]</span>
          </CardTitle>
          <CardDescription>{product.description}</CardDescription>
        </CardHeader>
        <Separator orientation="horizontal" />
        <CardContent className="flex items-center gap-4 py-4">
          <UserHoverCard user={product.owner} />
          <div className="ml-auto">
            {principal.id == product.owner.id && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" variant="outline">
                    <Pencil />
                    {t("actions.edit.trigger")}
                  </Button>
                </DialogTrigger>
                <EditProductDialogContent product={product} onClose={onClose} />
              </Dialog>
            )}
          </div>
        </CardContent>
        <Separator orientation="horizontal" />
        <CardContent className="py-4">
          <ProductParticipants product={product} />
          <ProductInvitations product={product} />
        </CardContent>
      </Card>
    </div>
  );
}
