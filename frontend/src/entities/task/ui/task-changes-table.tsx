import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Translation } from "react-i18next";
import { TaskChangeEntry, taskStatus, TaskStatusBadge } from "@/entities/task";
import { UserHoverCard } from "@/entities/user";
import { getDefaultColumn } from "@/shared/components/ui/default-column.tsx";
import { RichTextEditor } from "@/shared/components/ui/editor.tsx";

const taskChangesTable: Array<ColumnDef<TaskChangeEntry>> = [
  {
    accessorKey: "user",
    header: () => (
      <Translation ns="task">
        {(t) => t("items.changes.items.changedBy")}
      </Translation>
    ),
    cell: ({ row }) => <UserHoverCard user={row.original.changedBy} />,
  },
  {
    accessorKey: "changedAt",
    header: () => (
      <Translation ns="task">
        {(t) => t("items.changes.items.changedAt")}
      </Translation>
    ),
  },
  {
    accessorKey: "field",
    header: () => (
      <Translation ns="task">
        {(t) => t("items.changes.items.changedAt")}
      </Translation>
    ),
    cell: ({ row }) => (
      <Translation ns="task">
        {(t) => t(`items.${row.original.field}.label`)}
      </Translation>
    ),
  },
  {
    accessorKey: "previousValue",
    header: "Previous Value",
    cell: ({ row }) => {
      const { field, previousValue } = row.original;
      if (field == "description") {
        return (
          <RichTextEditor
            value={previousValue}
            onChange={() => {}}
            editable={false}
          />
        );
      }
      if (field == "status") {
        const status = taskStatus.parse(row.original.previousValue);
        return <TaskStatusBadge status={status} />;
      }
      return previousValue;
    },
  },
  {
    accessorKey: "newValue",
    header: "New Value",
    cell: ({ row }) => {
      const { field, newValue } = row.original;
      if (field == "description") {
        return (
          <RichTextEditor
            value={newValue}
            onChange={() => {}}
            editable={false}
          />
        );
      }
      if (field == "status") {
        const status = taskStatus.parse(row.original.newValue);
        return <TaskStatusBadge status={status} />;
      }
      return newValue;
    },
  },
];

export function useTaskChangesTable(data: Array<TaskChangeEntry>) {
  const table = useReactTable({
    columns: taskChangesTable,
    data,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: false,
    defaultColumn: getDefaultColumn<TaskChangeEntry>(),
  });
  return table;
}
