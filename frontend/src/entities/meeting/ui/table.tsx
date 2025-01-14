import { Link } from "@tanstack/react-router";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { CirclePlus, ExternalLink } from "lucide-react";
import { Translation } from "react-i18next";
import { useCreateMeetingNotes } from "@/entities/meeting";
import { Meeting } from "@/entities/meeting/model.ts";
import { Button } from "@/shared/components/ui/button.tsx";
import { getDefaultColumn } from "@/shared/components/ui/default-column.tsx";

// eslint-disable-next-line react-refresh/only-export-components
function MeetingMinutes({ meeting }: { meeting: Meeting }) {
  const { mutate } = useCreateMeetingNotes();

  return (
    <div className="flex space-x-2">
      {meeting.articles.map((article) => (
        <Button
          variant="outline"
          key={article.id}
          size="icon"
          className="size-8"
          asChild
        >
          <Link
            to="/articles/$articleId"
            params={{ articleId: String(article.id) }}
          >
            <ExternalLink />
          </Link>
        </Button>
      ))}
      <Button
        variant="outline"
        size="icon"
        className="size-8"
        onClick={() => {
          mutate({
            meetingId: meeting.id,
            teamId: meeting.team.id,
            content: "",
          });
        }}
      >
        <CirclePlus />
      </Button>
    </div>
  );
}

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
  {
    id: "articles",
    cell: ({ row }) => <MeetingMinutes meeting={row.original} />,
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
