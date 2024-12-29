import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { getProductByIdQueryOptions } from "@/entities/product";
import { defaultPagination } from "@/shared/api/schemas.ts";
import { SetSidebarBreadcrumbs } from "@/shared/components/sidebar-breadcrumbs.tsx";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/shared/components/ui/breadcrumb.tsx";

export const Route = createFileRoute(
  "/_authenticated/products/$productId/issues",
)({
  component: RouteComponent,
  loader: ({ context, params }) => {
    return context.queryClient.ensureQueryData(
      getProductByIdQueryOptions(Number(params.productId)),
    );
  },
});

function RouteComponent() {
  const productId = parseInt(Route.useParams().productId);

  const { data: product } = useSuspenseQuery(
    getProductByIdQueryOptions(productId),
  );
  const { t } = useTranslation("product");

  return (
    <div>
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
            <BreadcrumbSeparator />
            <BreadcrumbItem>{t("items.issues.label")}</BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </SetSidebarBreadcrumbs>
      <main>Tasks will be here</main>
    </div>
  );
}
