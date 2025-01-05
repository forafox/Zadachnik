import { Link, Outlet } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { CreateProductDialogContent } from "@/widgets/create-product-dialog";
import { CreateTeamDialogContent } from "@/widgets/create-team-dialog";
import { PrincipalSidebarFooter } from "@/entities/principal";
import { ProductsSidebar } from "@/entities/product";
import { TeamsSidebar } from "@/entities/team";
import { defaultPagination } from "@/shared/api/schemas";
import { AppSidebar } from "@/shared/components/app-sidebar.tsx";
import {
  SidebarBreadcrumbs,
  SidebarBreadcrumbsProvider,
} from "@/shared/components/sidebar-breadcrumbs.tsx";
import { DialogTrigger } from "@/shared/components/ui/dialog.tsx";
import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/shared/components/ui/sidebar.tsx";
import { useDialog } from "@/shared/hooks/use-dialog.tsx";

export const Layout = () => {
  return (
    <SidebarProvider>
      <SidebarBreadcrumbsProvider>
        <AppSidebar
          principalSlot={<PrincipalSidebarFooter />}
          productsSlot={<SidebarProducts />}
          teamsSlot={<SidebarTeams />}
        />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger />
            <SidebarBreadcrumbs />
          </header>
          <main className="h-full p-4">
            <Outlet />
          </main>
        </SidebarInset>
      </SidebarBreadcrumbsProvider>
    </SidebarProvider>
  );
};

function SidebarProducts() {
  const { t } = useTranslation("product");
  const { Dialog, onClose } = useDialog();

  return (
    <SidebarGroup>
      <SidebarGroupLabel asChild>
        <Link search={defaultPagination} to="/products">
          {t("products.label")}
        </Link>
      </SidebarGroupLabel>
      <Dialog>
        <SidebarGroupAction title={t("sidebar.actions.create.label")} asChild>
          <DialogTrigger>
            <Plus />
            <span className="sr-only">{t("sidebar.actions.create.label")}</span>
          </DialogTrigger>
        </SidebarGroupAction>
        <CreateProductDialogContent onClose={onClose} />
      </Dialog>
      <SidebarGroupContent>
        <ProductsSidebar />
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

function SidebarTeams() {
  const { t } = useTranslation("team");
  const { Dialog, onClose } = useDialog();

  return (
    <SidebarGroup>
      <SidebarGroupLabel asChild>
        <Link search={defaultPagination} to="/teams">
          {t("sidebar.title")}
        </Link>
      </SidebarGroupLabel>
      <Dialog>
        <SidebarGroupAction title={t("sidebar.actions.create.label")} asChild>
          <DialogTrigger>
            <Plus />
            <span className="sr-only">{t("sidebar.actions.create.label")}</span>
          </DialogTrigger>
        </SidebarGroupAction>
        <CreateTeamDialogContent onClose={onClose} />
      </Dialog>
      <SidebarGroupContent>
        <TeamsSidebar />
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
