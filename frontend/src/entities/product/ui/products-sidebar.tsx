import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { getProductsQueryOptions, Product } from "@/entities/product/api";
import {
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/shared/components/ui/sidebar.tsx";

export function ProductsSidebar() {
  // @TODO: infinite scroll
  const { data } = useSuspenseQuery(
    getProductsQueryOptions({
      page: 1,
      pageSize: 10,
    }),
  );

  return (
    <SidebarMenu>
      {data.values.map((product) => (
        <ProductSidebarEntry key={product.id} product={product} />
      ))}
    </SidebarMenu>
  );
}

function ProductSidebarEntry({ product }: { product: Product }) {
  const { t } = useTranslation("product");
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <Link
          to={`/products/$productId`}
          params={{ productId: String(product.id) }}
        >
          {product.title}
          <SidebarMenuBadge>[{product.ticker}]</SidebarMenuBadge>
        </Link>
      </SidebarMenuButton>
      <SidebarMenuSub>
        <SidebarMenuSubItem>
          <SidebarMenuSubButton asChild>
            <Link
              to="/products/$productId/issues"
              params={{ productId: String(product.id) }}
            >
              {t("items.issues.label")}
            </Link>
          </SidebarMenuSubButton>
          <SidebarMenuSubButton asChild>
            <Link
              to="/products/$productId/releases"
              params={{ productId: String(product.id) }}
            >
              {t("items.releases.label")}
            </Link>
          </SidebarMenuSubButton>
        </SidebarMenuSubItem>
      </SidebarMenuSub>
    </SidebarMenuItem>
  );
}

export function ProductsSidebarSkeleton() {
  return (
    <SidebarMenu>
      {Array.from({ length: 5 }).map((_, i) => (
        <SidebarMenuItem key={i}>
          <SidebarMenuSkeleton showIcon />
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
