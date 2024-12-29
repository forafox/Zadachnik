import { createFileRoute } from "@tanstack/react-router";
import { getTeamQueryOptions, useTeamsBreadcrumbs } from "@/entities/team";

export const Route = createFileRoute("/_authenticated/teams/$teamId/sprints")({
  component: RouteComponent,
  loader: async ({ params, context }) => {
    return context.queryClient.prefetchQuery(
      getTeamQueryOptions(Number(params.teamId)),
    );
  },
});

function RouteComponent() {
  const team = Route.useLoaderData();
  useTeamsBreadcrumbs(team, "sprints");

  return "Hello /_authenticated/teams/$teamId/sprints!";
}
