import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import {
  getTeamMeetingsQueryOptions,
  useMeetingsTable,
} from "@/entities/meeting";
import { getTeamQueryOptions, useTeamsBreadcrumbs } from "@/entities/team";
import { DataTable } from "@/shared/components/data-table.tsx";

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
    getTeamMeetingsQueryOptions({ teamId, page: 1, pageSize: 50 }),
  );
  const table = useMeetingsTable(meetings.values);

  return (
    <div>
      <header></header>
      <main>
        <DataTable table={table} />
      </main>
    </div>
  );
}
