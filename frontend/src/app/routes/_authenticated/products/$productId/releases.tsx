import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { getProductByIdQueryOptions, ProductLink } from "@/entities/product";
import {
  CreateReleaseDialogContent,
  getReleasesQueryOptions,
} from "@/entities/release";
import { defaultPagination } from "@/shared/api/schemas.ts";
import { SetSidebarBreadcrumbs } from "@/shared/components/sidebar-breadcrumbs.tsx";
import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/shared/components/ui/breadcrumb.tsx";
import { Button } from "@/shared/components/ui/button";
import { DialogTrigger } from "@/shared/components/ui/dialog.tsx";
import { useDialog } from "@/shared/hooks/use-dialog.tsx";
import { useReleasesTable } from "@/entities/release/ui/releases-table.tsx";
import { DataTable } from "@/shared/components/data-table.tsx";

export const Route = createFileRoute(
  "/_authenticated/products/$productId/releases",
)({
  component: RouteComponent,
  loader: ({ context, params }) => {
    return context.queryClient.prefetchQuery(
      getProductByIdQueryOptions(Number(params.productId)),
    );
  },
});

function RouteComponent() {
  const productId = parseInt(Route.useParams().productId);
  const { data: product } = useSuspenseQuery(
    getProductByIdQueryOptions(productId),
  );
  const { data: releases } = useSuspenseQuery(
    getReleasesQueryOptions({ productId, page: 1, pageSize: 50 }),
  );
  const { t } = useTranslation("product");
  const { Dialog: CreateDialog } = useDialog();
  const table = useReleasesTable(releases.values)

  return (
    <div className="space-y-4">
      <SetSidebarBreadcrumbs>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbLink asChild>
              <Link search={defaultPagination} to="/products">
                {t("products.label")}
              </Link>
            </BreadcrumbLink>
            <BreadcrumbSeparator />
            <BreadcrumbLink asChild>
              <ProductLink product={product} />
            </BreadcrumbLink>
            <BreadcrumbSeparator />
            <BreadcrumbLink asChild>
              <ProductLink product={product} section="releases" />
            </BreadcrumbLink>
          </BreadcrumbList>
        </Breadcrumb>
      </SetSidebarBreadcrumbs>
      <header>
        <CreateDialog>
          <DialogTrigger asChild>
            <Button variant="outline">Create</Button>
          </DialogTrigger>
          <CreateReleaseDialogContent productId={product.id} />
        </CreateDialog>
      </header>
      <main>
        <DataTable table={table} />
      </main>
    </div>
  );
}
