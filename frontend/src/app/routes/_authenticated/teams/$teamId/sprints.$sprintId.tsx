import { createFileRoute } from "@tanstack/react-router";
import { SprintKanbanBoard } from "@/widgets/kanban-board";

export const Route = createFileRoute(
  "/_authenticated/teams/$teamId/sprints/$sprintId",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const teamId = parseInt(Route.useParams().teamId);
  const sprintId = parseInt(Route.useParams().teamId);
  // const { data: team } = useSuspenseQuery(getTeamQueryOptions(teamId));
  // const { data: sprint } = useSuspenseQuery(
  //   getSprintByIdQueryOptions({ sprintId, teamId }),
  // );

  return (
    <div>
      <main>
        <SprintKanbanBoard sprintId={sprintId} teamId={teamId} />
      </main>
    </div>
  );
}
