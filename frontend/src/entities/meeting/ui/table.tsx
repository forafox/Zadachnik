import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Translation } from "react-i18next";
import { Meeting } from "@/entities/meeting/model.ts";
import { getDefaultColumn } from "@/shared/components/ui/default-column.tsx";

const columns: Array<ColumnDef<Meeting>> = [
  {
    accessorKey: "date",
    header: () => (
      <Translation ns="meeting">{(t) => t("items.date.label")}</Translation>
    ),
  },
  {
    accessorKey: "type",
    header: () => (
      <Translation ns="meeting">{(t) => t("items.type.label")}</Translation>
    ),
    cell: ({ row }) => (
      <Translation ns="meeting">
        {(t) => t(`items.type.items.${row.original.type}.label`)}
      </Translation>
    ),
  },
];

export function useMeetingsTable(data: Array<Meeting>) {
  return useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: false,
    defaultColumn: getDefaultColumn<Meeting>(),
  });
}
