import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import {
  DetailedProduct,
  getProductByIdQueryOptions,
} from "@/entities/product";
import { UserHoverCard } from "@/entities/user";
import { SetSidebarBreadcrumbs } from "@/shared/components/sidebar-breadcrumbs.tsx";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/shared/components/ui/breadcrumb.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card.tsx";
import { Separator } from "@/shared/components/ui/separator.tsx";

export function ProductIndexPage({
  product: initialProduct,
}: {
  product: DetailedProduct;
}) {
  const { data: product } = useQuery({
    ...getProductByIdQueryOptions(initialProduct.id),
    initialData: initialProduct,
  });
  const { t } = useTranslation("product");

  return (
    <div className="prose mx-auto">
      <SetSidebarBreadcrumbs>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbLink asChild>
              <Link to="/products">{t("products.label")}</Link>
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
            <span className="text-sm font-medium">[{product.ticker}]</span>
            <span>{product.title}</span>
          </CardTitle>
          <CardDescription>{product.description}</CardDescription>
        </CardHeader>
        <Separator orientation="horizontal" />
        <CardContent>
          <p>
            {t("items.owner.label")}
            <UserHoverCard user={product.owner} />
          </p>
          <p>
            {t("items.participants.label")}
            <ul>
              <li>TBD</li>
              <li>TBD</li>
              <li>TBD</li>
              <li>TBD</li>
            </ul>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
