import { createFileRoute, Link } from '@tanstack/react-router'
import { getTeamsQueryOptions, getTeamsRequestSchema, useTeamsTable } from '@/entities/team'
import { DataTable } from '@/shared/components/data-table'
import { SetSidebarBreadcrumbs } from '@/shared/components/sidebar-breadcrumbs'
import { Breadcrumb, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/shared/components/ui/breadcrumb'
import { defaultPagination } from '@/shared/api/schemas'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/_authenticated/teams/')({
  component: RouteComponent,
  validateSearch: getTeamsRequestSchema,
  loaderDeps: ({search}) => search,
  loader: async ({deps, context}) => {
    return context.queryClient.ensureQueryData(getTeamsQueryOptions(deps))
  }
})

function RouteComponent() {
  const data = Route.useLoaderData()
  const table = useTeamsTable(data.values)
  const search = Route.useSearch()
  const navigate = Route.useNavigate()
  const { t } = useTranslation("team");

  return <div className="flex flex-col gap-4">
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
  </div>
}
