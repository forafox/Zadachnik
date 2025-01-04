import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import {
  getTeamSprintsQueryOptions,
  getTeamSprintsRequestSchema,
  useSprintsTable,
} from "@/entities/sprint";
import { CreateSprintDialogContent } from "@/entities/sprint";
import { getTeamQueryOptions, useTeamsBreadcrumbs } from "@/entities/team";
import { DataTable } from "@/shared/components/data-table.tsx";
import { PaginationFooter } from "@/shared/components/pagination.tsx";
import { Button } from "@/shared/components/ui/button.tsx";
import { DialogTrigger } from "@/shared/components/ui/dialog.tsx";
import { useDialog } from "@/shared/hooks/use-dialog.tsx";

const validateSearch = getTeamSprintsRequestSchema.omit({ teamId: true });

export const Route = createFileRoute("/_authenticated/teams/$teamId/sprints")({
  component: RouteComponent,
  validateSearch,
  loaderDeps: ({ search }) => search,
  loader: async ({ params, context, deps }) => {
    const teamId = Number(params.teamId);
    // TODO: fix waterfall
    await context.queryClient.prefetchQuery(getTeamQueryOptions(teamId));
    await context.queryClient.prefetchQuery(
      getTeamSprintsQueryOptions({ teamId, ...deps }),
    );
  },
});

function RouteComponent() {
  const navigate = Route.useNavigate();
  const search = Route.useSearch();
  const teamId = parseInt(Route.useParams().teamId);
  const { data: team } = useSuspenseQuery(getTeamQueryOptions(teamId));
  const { data: sprints } = useSuspenseQuery(
    getTeamSprintsQueryOptions({ teamId, ...search }),
  );
  useTeamsBreadcrumbs(team, "sprints");
  const table = useSprintsTable(sprints.values);
  const { Dialog, onClose } = useDialog();

  return (
    <div className="flex flex-col gap-4">
      <header>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Create Sprint</Button>
          </DialogTrigger>
          <CreateSprintDialogContent onClose={onClose} teamId={teamId} />
        </Dialog>
      </header>
      <DataTable table={table} />
      <PaginationFooter
        query={search}
        total={sprints.total}
        setQuery={(search) => navigate({ search })}
      />
    </div>
  );
}
