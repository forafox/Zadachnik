import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Rocket } from "lucide-react";
import { useAnimation } from "motion/react";
import React from "react";
import { ProductLink } from "@/entities/product";
import {
  getPrincipalProductsQueryOptions,
  Product,
} from "@/entities/product/api";
import { defaultPagination } from "@/shared/api/schemas.ts";
import { BadgeAlertIcon } from "@/shared/components/ui/badge-alert.tsx";
import { RocketIcon } from "@/shared/components/ui/rocket.tsx";
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
import { useIconsWithControls } from "@/shared/hooks/use-icons-with-controls.tsx";
import { FeatureFlag } from "@/shared/lib/feature-flags.tsx";

export function ProductsSidebar() {
  const { data, isPending, error } = useQuery(
    getPrincipalProductsQueryOptions(defaultPagination),
  );

  if (error) {
    return error.message;
  }

  if (isPending) {
    return <ProductsSidebarSkeleton />;
  }

  return (
    <SidebarMenu>
      {data.values.map((product) => (
        <ProductSidebarEntry key={product.id} product={product} />
      ))}
    </SidebarMenu>
  );
}

function ProductSidebarEntry({ product }: { product: Product }) {
  const icons = useIconsWithControls({
    releases: RocketIcon,
    issues: BadgeAlertIcon,
  });

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
        {(["issues", "releases"] as const).map((section) => (
          <React.Fragment key={section}>
            <FeatureFlag key={section} flag={`products.${section}`}>
              <SidebarMenuSubItem
                onMouseEnter={() => icons[section].controls.start("animate")}
                onMouseLeave={() => icons[section].controls.start("normal")}
              >
                <SidebarMenuSubButton asChild>
                  <ProductLink
                    product={product}
                    section={section}
                    before={icons[section].icon({
                      controls: icons[section].controls,
                    })}
                  />
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            </FeatureFlag>
          </React.Fragment>
        ))}
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
