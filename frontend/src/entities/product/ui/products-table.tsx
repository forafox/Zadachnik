import { Link } from "@tanstack/react-router";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useTranslation } from "react-i18next";
import { Product } from "@/entities/product";
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { UserHoverCard } from "@/entities/user";

// eslint-disable-next-line react-refresh/only-export-components
function RenderTranslation({ str }: { str: string }) {
  const { t } = useTranslation("product");
  return t(str);
}

const columnDef: Array<ColumnDef<Product>> = [
  {
    accessorKey: "title",
    header: () => <RenderTranslation str="items.title.label" />,
    cell: ({ row }) => (
      <Link
        to="/products/$productId"
        params={{ productId: String(row.original.id) }}
      >
        {row.original.title}
      </Link>
    ),
  },
  {
    accessorKey: "owner",
    header: () => <RenderTranslation str="items.owner.label" />,
    cell: ({ row }) => {
      return <UserHoverCard user={row.original.owner} />;
    },
  },
  {
    accessorKey: "openIssues",
    header: () => <RenderTranslation str="items.openIssues.label" />,
  },
  {
    accessorKey: "totalIssues",
    header: () => <RenderTranslation str="items.openIssues.label" />,
  },
  {
    accessorKey: "description",
    header: () => <RenderTranslation str="items.description.label" />,
  },
];

export function useProductsTable(data: Array<Product>) {
  return useReactTable({
    columns: columnDef,
    data,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: false,
  });
}
