import { Link } from "@tanstack/react-router";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useTranslation } from "react-i18next";
import { Release } from "@/entities/release";
import { TaskTypeBadge } from "@/entities/task";

// eslint-disable-next-line react-refresh/only-export-components
function RenderTranslation({ str }: { str: string }) {
  const { t } = useTranslation("release");
  return t(str);
}

const columnDef: Array<ColumnDef<Release>> = [
  {
    accessorKey: "version",
    header: () => <RenderTranslation str="items.version.label" />,
    cell: ({ row }) => {
      const releaseId = String(row.original.id);
      const productId = String(row.original.product.id);
      return (
        <Link
          to="/products/$productId/releases/$releaseId"
          params={{ releaseId, productId }}
        >
          {row.original.version}
        </Link>
      );
    },
  },
  {
    accessorKey: "taks",
    header: () => <RenderTranslation str="items.tasks.label" />,
    cell: ({ row }) => {
      const { tasks } = row.original;
      return (
        <>
          {tasks.map((task) => (
            <Link
              to="/products/$productId/tasks/$taskId"
              params={{
                productId: String(task.product.id),
                taskId: String(task.id),
              }}
            >
              <TaskTypeBadge type={task.type}>{task.title}</TaskTypeBadge>
            </Link>
          ))}
        </>
      );
    },
  },
];

export function useReleasesTable(data: Array<Release>) {
  return useReactTable({
    columns: columnDef,
    data,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: false,
  });
}
