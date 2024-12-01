import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import {
  getTeamsQueryOptions,
  getTeamsRequestSchema,
  useTeamsTable,
} from "@/entities/team";
import { defaultPagination } from "@/shared/api/schemas";
import { DataTable } from "@/shared/components/data-table";
import { PaginationFooter } from "@/shared/components/pagination.tsx";
import { SetSidebarBreadcrumbs } from "@/shared/components/sidebar-breadcrumbs";
import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/shared/components/ui/breadcrumb";

export const Route = createFileRoute("/_authenticated/teams/")({
  component: RouteComponent,
  validateSearch: getTeamsRequestSchema,
  loaderDeps: ({ search }) => search,
  loader: async ({ deps, context }) => {
    return context.queryClient.ensureQueryData(getTeamsQueryOptions(deps));
  },
});

function RouteComponent() {
  const initialData = Route.useLoaderData();
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const { data } = useQuery({ ...getTeamsQueryOptions(search), initialData });
  const table = useTeamsTable(data.values);
  const { t } = useTranslation("team");

  return (
    <div className="flex flex-col gap-4">
      <SetSidebarBreadcrumbs>
        <SetSidebarBreadcrumbs>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbLink asChild>
                <Link search={defaultPagination} to="/teams">
                  {t("teams.label")}
                </Link>
              </BreadcrumbLink>
              <BreadcrumbSeparator />
            </BreadcrumbList>
          </Breadcrumb>
        </SetSidebarBreadcrumbs>
      </SetSidebarBreadcrumbs>
      <DataTable table={table} />
      <PaginationFooter
        query={search}
        total={data.total}
        setQuery={(search) => navigate({ search })}
      />
    </div>
  );
}
