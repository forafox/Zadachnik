import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
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
import { Button } from "@/shared/components/ui/button.tsx";
import { Pencil } from "lucide-react";
import { Badge } from "@/shared/components/ui/badge.tsx";
import { getPrincipalQueryOptions } from "@/entities/principal";

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
  const {data: principal} = useSuspenseQuery(getPrincipalQueryOptions)

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
            <span className="text-xl">{product.title}</span>
            <span className="text-sm font-medium">[{product.ticker}]</span>
          </CardTitle>
          <CardDescription>{product.description}</CardDescription>
        </CardHeader>
        <Separator orientation="horizontal" />
        <CardContent className="py-4 gap-4 flex items-center">

          <UserHoverCard user={product.owner} />
          <Badge className="bg-orange-200 text-orange-500 hover:bg-orange-100">
            {t('indexPage.closedIssues', {val: product.openIssues/product.totalIssues})}
          </Badge>
          <div className="ml-auto">
            {principal.id == product.owner.id &&
              <Button size="sm" variant="outline">
                <Pencil />
                {t('actions.edit.label')}
              </Button>
            }
          </div>
        </CardContent>
        <Separator orientation="horizontal" />
        <CardContent>
          <div>
            <h6>{t("items.participants.label")}</h6>
            <ul>
              <li>TBD</li>
              <li>TBD</li>
              <li>TBD</li>
              <li>TBD</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
