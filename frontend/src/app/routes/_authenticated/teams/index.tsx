import { createFileRoute } from '@tanstack/react-router'
import { getTeamsQueryOptions, getTeamsRequestSchema, useTeamsTable } from '@/entities/team'
import { DataTable } from '@/shared/components/data-table'
import { PaginationFooter } from '@/shared/components/pagination'

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

  return <div className="flex flex-col gap-4">
    <DataTable table={table} />
    <PaginationFooter query={search} setQuery={(query) => navigate({search: query})} total={data.total} />
  </div>
}
