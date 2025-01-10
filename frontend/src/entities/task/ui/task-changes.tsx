import { useSuspenseQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { getTaskHistoryQueryOptions, Task } from "@/entities/task";
import { useTaskChangesTable } from "@/entities/task/ui/task-changes-table.tsx";
import { DataTable } from "@/shared/components/data-table.tsx";

export function TaskChanges({ task }: { task: Task }) {
  const { t } = useTranslation("task");
  const { data: changes } = useSuspenseQuery(
    getTaskHistoryQueryOptions({
      productId: task.product.id,
      taskId: task.id,
      page: 1,
      pageSize: 50,
    }),
  );
  const table = useTaskChangesTable(
    changes.values.filter((it) => it.field !== "product"),
  );

  return (
    <div>
      <h2 className="font-bold">{t("items.changes.label")}</h2>
      <DataTable table={table} />
    </div>
  );
}
