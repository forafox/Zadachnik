import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/products/create')({
  component: RouteComponent,
})

function RouteComponent() {
  return 'Hello /_authenticated/products/create!'
}
