import { Link, Outlet } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { Suspense } from "react";
import { useTranslation } from "react-i18next";
import { PrincipalSidebarFooter } from "@/entities/principal";
import { ProductsSidebar, ProductsSidebarSkeleton } from "@/entities/product";
import { AppSidebar } from "@/shared/components/app-sidebar.tsx";
import {
  SidebarBreadcrumbs,
  SidebarBreadcrumbsProvider,
} from "@/shared/components/sidebar-breadcrumbs.tsx";
import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/shared/components/ui/sidebar.tsx";

export const Layout = () => {
  return (
    <SidebarProvider>
      <SidebarBreadcrumbsProvider>
        <AppSidebar
          principalSlot={<PrincipalSidebarFooter />}
          productsSlot={<SidebarProducts />}
        />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger />
            <SidebarBreadcrumbs />
          </header>
          <main className="p-4">
            <Outlet />
          </main>
        </SidebarInset>
      </SidebarBreadcrumbsProvider>
    </SidebarProvider>
  );
};

function SidebarProducts() {
  const { t } = useTranslation("product");
  return (
    <SidebarGroup>
      <SidebarGroupLabel asChild>
        <Link to="/products">{t("sidebar.title")}</Link>
      </SidebarGroupLabel>
      <SidebarGroupAction title={t("sidebar.actions.create.label")} asChild>
        <Link to="/products/create">
          <Plus />
          <span className="sr-only">{t("sidebar.actions.create.label")}</span>
        </Link>
      </SidebarGroupAction>
      <SidebarGroupContent>
        <Suspense fallback={<ProductsSidebarSkeleton />}>
          <ProductsSidebar />
        </Suspense>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
