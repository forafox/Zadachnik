import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as dayjs from "dayjs";
import { Trans } from "react-i18next";
import { Sprint } from "@/entities/sprint";

const columnDef: Array<ColumnDef<Sprint>> = [
  {
    accessorKey: "startAt",
    header: () => <Trans i18nKey="items.startAt.label" />,
  },
  {
    accessorKey: "endsAt",
    header: () => <Trans i18nKey="items.endAt.label" />,
    cell: ({ row }) => {
      const duration = row.original.length;
      const endsAt = dayjs(row.original.startAt).add(duration, "days");
      return endsAt;
    },
  },
];

export function useSprintsTable(data: Array<Sprint>) {
  return useReactTable({
    columns: columnDef,
    data,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: false,
  });
}
