import { useSuspenseQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { getProductsQueryOptions, Product } from "@/entities/product/api";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
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
      <SidebarMenuButton>
        {product.title}
        <SidebarMenuBadge>[{product.ticker}]</SidebarMenuBadge>
      </SidebarMenuButton>
      <SidebarMenuSub>
        <SidebarMenuSubItem>
          <SidebarMenuSubButton>{t("items.issues.label")}</SidebarMenuSubButton>
          <SidebarMenuSubButton>
            {t("items.releases.label")}
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
