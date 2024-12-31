import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { UserCog } from "lucide-react";
import { useTranslation } from "react-i18next";
import { getTeamQueryOptions, useTeamsBreadcrumbs } from "@/entities/team";
import { UserHoverCard } from "@/entities/user";
import { Button } from "@/shared/components/ui/button.tsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card.tsx";
import { Separator } from "@/shared/components/ui/separator.tsx";

export const Route = createFileRoute("/_authenticated/teams/$teamId/")({
  component: RouteComponent,
  loader: async ({ params, context }) => {
    return context.queryClient.prefetchQuery(
      getTeamQueryOptions(Number(params.teamId)),
    );
  },
});

function RouteComponent() {
  const teamId = parseInt(Route.useParams().teamId);
  const { data } = useSuspenseQuery(getTeamQueryOptions(teamId));
  const { t } = useTranslation("team");
  useTeamsBreadcrumbs(data);

  return (
    <Card className="prose mx-auto">
      <CardHeader>
        <CardTitle>
          <h3 className="m-auto">{data.title}</h3>
        </CardTitle>
      </CardHeader>
      <Separator orientation="horizontal" />
      <CardContent className="flex items-center gap-4 py-4">
        <UserHoverCard user={data.scrumMaster} />
      </CardContent>
      <Separator orientation="horizontal" />
      <CardContent className="space-y-6 px-0 py-4 [&>section]:px-6">
        <section>
          <header className="flex items-center">
            <h4 className="my-auto">{t("items.participants.label")}</h4>
          </header>
          <main>
            <ul>
              <li>TBD</li>
              <li>TBD</li>
              <li>TBD</li>
              <li>TBD</li>
            </ul>
          </main>
          <footer>
            <Button variant="outline">
              <UserCog /> {t("actions.manage.label")}
            </Button>
          </footer>
        </section>
      </CardContent>
    </Card>
  );
}
