import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import {
  getTeamQueryOptions,
  TeamParticipants,
  useTeamsBreadcrumbs,
} from "@/entities/team";
import { TeamPendingInvitations } from "@/entities/team";
import { UserHoverCard } from "@/entities/user";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card.tsx";
import { Separator } from "@/shared/components/ui/separator.tsx";
import { TeamProductsInvitations } from "@/entities/team/ui/product-invitations.tsx";

export const Route = createFileRoute("/_authenticated/teams/$teamId/")({
  component: RouteComponent,
  loaderDeps: ({ search }) => search,
  loader: async ({ params, context }) => {
    const teamId = Number(params.teamId);
    await context.queryClient.prefetchQuery(getTeamQueryOptions(teamId));
  },
});

function RouteComponent() {
  const teamId = parseInt(Route.useParams().teamId);
  const { data: team } = useSuspenseQuery(getTeamQueryOptions(teamId));
  useTeamsBreadcrumbs(team);

  return (
    <Card className="prose mx-auto">
      <CardHeader>
        <CardTitle>
          <h3 className="m-auto">{team.title}</h3>
        </CardTitle>
      </CardHeader>
      <Separator orientation="horizontal" />
      <CardContent className="flex items-center gap-4 py-4">
        <UserHoverCard user={team.scrumMaster} />
      </CardContent>
      <Separator orientation="horizontal" />
      <CardContent className="space-y-6 px-0 py-4 [&>section]:px-6">
        <TeamParticipants team={team} />
        <TeamPendingInvitations team={team} />
        <TeamProductsInvitations team={team} />
      </CardContent>
    </Card>
  );
}
