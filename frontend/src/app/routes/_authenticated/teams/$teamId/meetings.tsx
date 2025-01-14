import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { CirclePlus } from "lucide-react";
import {
  CreateMeetingDialogContent,
  getTeamMeetingsQueryOptions,
  useMeetingsTable,
} from "@/entities/meeting";
import { getTeamQueryOptions, useTeamsBreadcrumbs } from "@/entities/team";
import { defaultPagination } from "@/shared/api/schemas.ts";
import { DataTable } from "@/shared/components/data-table.tsx";
import { Button } from "@/shared/components/ui/button.tsx";
import { DialogTrigger } from "@/shared/components/ui/dialog.tsx";
import { useDialog } from "@/shared/hooks/use-dialog.tsx";

export const Route = createFileRoute("/_authenticated/teams/$teamId/meetings")({
  component: RouteComponent,
  loader: async ({ params, context }) => {
    return context.queryClient.prefetchQuery(
      getTeamQueryOptions(Number(params.teamId)),
    );
  },
});

function RouteComponent() {
  const teamId = parseInt(Route.useParams().teamId);
  const { data: team } = useSuspenseQuery(getTeamQueryOptions(teamId));
  useTeamsBreadcrumbs(team, "meetings");
  const { data: meetings } = useSuspenseQuery(
    getTeamMeetingsQueryOptions({ teamId, ...defaultPagination }),
  );
  const table = useMeetingsTable(meetings);
  const { Dialog: CreateDialog } = useDialog();

  return (
    <div className="space-y-4">
      <header>
        <CreateDialog>
          <DialogTrigger asChild>
            <Button>
              <CirclePlus />
              Create
            </Button>
          </DialogTrigger>
          <CreateMeetingDialogContent team={team} />
        </CreateDialog>
      </header>
      <main>
        <DataTable table={table} />
      </main>
    </div>
  );
}
