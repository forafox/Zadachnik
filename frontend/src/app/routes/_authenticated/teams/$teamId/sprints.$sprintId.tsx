import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/teams/$teamId/sprints/$sprintId',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return 'Hello /_authenticated/teams/$teamId/sprints/$sprintId!'
}
