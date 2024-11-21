import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { SetSidebarBreadcrumbs } from "@/shared/components/sidebar-breadcrumbs.tsx";
import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/shared/components/ui/breadcrumb.tsx";

export const Route = createFileRoute("/_authenticated/products")({
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useTranslation("product");

  return (
    <>
      <SetSidebarBreadcrumbs>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbLink asChild>
              <Link to="/products">{t("products.label")}</Link>
            </BreadcrumbLink>
          </BreadcrumbList>
        </Breadcrumb>
      </SetSidebarBreadcrumbs>
      <Outlet />
    </>
  );
}
