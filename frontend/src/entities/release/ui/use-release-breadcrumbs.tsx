import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Product, ProductLink } from "@/entities/product";
import { Release } from "@/entities/release";
import { ReleaseLink } from "@/entities/release/ui/release-link.tsx";
import { Section, Team, TeamLink } from "@/entities/team";
import { defaultPagination } from "@/shared/api/schemas.ts";
import { useBreadcrumbs } from "@/shared/components/sidebar-breadcrumbs.tsx";
import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/shared/components/ui/breadcrumb.tsx";

export function useReleaseBreadcrumbs(product: Product, release?: Release) {
  const { t: tProduct } = useTranslation("product");

  return useBreadcrumbs(
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbLink asChild>
          <Link search={defaultPagination} to="/products">
            {tProduct("products.label")}
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
        {release && (
          <>
            <BreadcrumbSeparator />
            <ReleaseLink release={release} />
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>,
  );
}
