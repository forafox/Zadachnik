import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { addDays } from "date-fns";
import { Trans, useTranslation } from "react-i18next";
import { Sprint } from "@/entities/sprint";
import { defaultColumn } from "@/shared/components/ui/default-column.tsx";

function SprintTrans(props: React.ComponentProps<typeof Trans>) {
  const { t } = useTranslation("sprint");

  return <Trans t={t} {...props} />;
}

const columnDef: Array<ColumnDef<Sprint>> = [
  {
    accessorKey: "startAt",
    header: () => <SprintTrans i18nKey="items.startsAt.label" />,
  },
  {
    accessorKey: "endsAt",
    header: () => <SprintTrans i18nKey="items.endsAt.label" />,
    accessorFn: (row) => {
      const duration = row.length;
      const endsAt = addDays(row.startAt, duration);
      return endsAt;
    },
  },
  {
    accessorKey: "planningDateTime",
    header: () => <SprintTrans i18nKey="items.planningMeeting.label" />,
  },
  {
    accessorKey: "reviewDateTime",
    header: () => <SprintTrans i18nKey="items.reviewMeeting.label" />,
  },
  {
    accessorKey: "retroDateTime",
    header: () => <SprintTrans i18nKey="items.retroMeeting.label" />,
  },
];

export function useSprintsTable(data: Array<Sprint>) {
  return useReactTable({
    columns: columnDef,
    data,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: false,
    defaultColumn,
  });
}
