import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { getProductByIdQueryOptions, ProductLink } from "@/entities/product";
import {
  getTaskByIdQueryOptions,
  TaskTypeBadge,
  useUpdateTaskMutation,
} from "@/entities/task";
import { TaskStatusBadge } from "@/entities/task";
import { SelectAssignee } from "@/entities/task";
import { TaskDescription } from "@/entities/task";
import { User } from "@/entities/user";
import { defaultPagination } from "@/shared/api/schemas.ts";
import { SetSidebarBreadcrumbs } from "@/shared/components/sidebar-breadcrumbs.tsx";
import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/shared/components/ui/breadcrumb.tsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card.tsx";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/shared/components/ui/table.tsx";

export const Route = createFileRoute(
  "/_authenticated/products/$productId/tasks/$taskId",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useTranslation("task");
  const { t: tProduct } = useTranslation("product");
  const { productId, taskId } = Route.useParams();
  const { data: product } = useSuspenseQuery(
    getProductByIdQueryOptions(Number(productId)),
  );
  const { data: task } = useSuspenseQuery(
    getTaskByIdQueryOptions({
      productId: Number(productId),
      taskId: Number(taskId),
    }),
  );

  const { mutate } = useUpdateTaskMutation();

  function handleSetAssignee(assignee: User | undefined) {
    mutate({
      ...task,
      productId: Number(productId),
      assignee,
    });
  }

  return (
    <Card className="mx-auto max-w-lg">
      <SetSidebarBreadcrumbs>
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
              <ProductLink product={product} section={"tasks"} />
            </BreadcrumbLink>
            <BreadcrumbSeparator />
            <BreadcrumbLink asChild>
              <Link
                to="/products/$productId/tasks/$taskId"
                params={{ productId, taskId }}
              >
                {task.title}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbList>
        </Breadcrumb>
      </SetSidebarBreadcrumbs>
      <CardHeader className="space-y-2">
        <CardTitle className="flex flex-row items-center gap-2 text-xl">
          {task.title}
        </CardTitle>
        <TaskDescription task={task} />
      </CardHeader>
      <CardContent className="p-4">
        <h2 className="p-2 font-bold">{t("items.label")}</h2>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="w-[200px]">
                {t("items.status.label")}
              </TableCell>
              <TableCell>
                <TaskStatusBadge status={task.status} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{t("items.type.label")}</TableCell>
              <TableCell>
                <TaskTypeBadge type={task.type} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{t("items.assignee.label")}</TableCell>
              <TableCell>
                <SelectAssignee
                  value={task.assignee}
                  onChange={handleSetAssignee}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
