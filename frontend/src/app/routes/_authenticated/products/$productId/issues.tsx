import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { KanbanBoard } from "@/widgets/kanban-board";
import { getProductByIdQueryOptions } from "@/entities/product";
import { CreateTaskDialogContent } from "@/entities/task";
import { defaultPagination } from "@/shared/api/schemas.ts";
import { SetSidebarBreadcrumbs } from "@/shared/components/sidebar-breadcrumbs.tsx";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/shared/components/ui/breadcrumb.tsx";
import { Button } from "@/shared/components/ui/button.tsx";
import { DialogTrigger } from "@/shared/components/ui/dialog.tsx";
import { useDialog } from "@/shared/hooks/use-dialog.tsx";

export const Route = createFileRoute(
  "/_authenticated/products/$productId/issues",
)({
  component: RouteComponent,
  loader: ({ context, params }) => {
    return context.queryClient.prefetchQuery(
      getProductByIdQueryOptions(Number(params.productId)),
    );
  },
});

function RouteComponent() {
  const productId = parseInt(Route.useParams().productId);

  const { data: product } = useSuspenseQuery(
    getProductByIdQueryOptions(productId),
  );
  const { t } = useTranslation("product");
  const { Dialog, onClose } = useDialog();

  return (
    <div className="h-full space-y-8">
      {/** TODO: extract to useProductsBreadcrumbs */}
      <SetSidebarBreadcrumbs>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbLink asChild>
              <Link search={defaultPagination} to="/products">
                {t("products.label")}
              </Link>
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
            <BreadcrumbSeparator />
            <BreadcrumbItem>{t("items.issues.label")}</BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </SetSidebarBreadcrumbs>
      <header>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Create</Button>
          </DialogTrigger>
          <CreateTaskDialogContent productId={product.id} onClose={onClose} />
        </Dialog>
      </header>
      <main>
        <KanbanBoard productId={product.id} />
      </main>
    </div>
  );
}
