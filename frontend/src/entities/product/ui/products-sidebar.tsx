import { useSuspenseQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { getProductsQueryOptions, Product } from "@/entities/product/api";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/shared/components/ui/sidebar.tsx";

export function ProductsSidebar() {
  const { t } = useTranslation("product");

  // @TODO: infinite scroll
  const { data } = useSuspenseQuery(
    getProductsQueryOptions({
      page: 1,
      pageSize: 10,
    }),
  );

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{t("sidebar.title")}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {data.values.map((product) => (
            <ProductSidebarEntry key={product.id} product={product} />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

function ProductSidebarEntry({ product }: { product: Product }) {
  const { t } = useTranslation("product");
  return (
    <SidebarMenuItem>
      <SidebarMenuButton>
        {product.title}
        <span className="ml-auto text-muted-foreground">
          [{product.ticker}]
        </span>
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
