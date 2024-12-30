import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import {
  getPrincipalTeamsQueryOptions,
  getTeamsRequestSchema,
  useTeamsBreadcrumbs,
  useTeamsTable,
} from "@/entities/team";
import { DataTable } from "@/shared/components/data-table";
import { PaginationFooter } from "@/shared/components/pagination.tsx";

export const Route = createFileRoute("/_authenticated/teams/")({
  component: RouteComponent,
  validateSearch: getTeamsRequestSchema,
  loaderDeps: ({ search }) => search,
  loader: async ({ deps, context }) => {
    return context.queryClient.prefetchQuery(
      getPrincipalTeamsQueryOptions(deps),
    );
  },
});

function RouteComponent() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const { data } = useSuspenseQuery(getPrincipalTeamsQueryOptions(search));
  const table = useTeamsTable(data.values);
  useTeamsBreadcrumbs();

  return (
    <div className="flex flex-col gap-4">
      <DataTable table={table} />
      <PaginationFooter
        query={search}
        total={data.total}
        setQuery={(search) => navigate({ search })}
      />
    </div>
  );
}
