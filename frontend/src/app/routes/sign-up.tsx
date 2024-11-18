import { createFileRoute } from "@tanstack/react-router";
import z from "zod";
import { SignUpPage } from "@/pages/sign-up";

const search = z.object({
  from: z.string().optional(),
});

export const Route = createFileRoute("/sign-up")({
  component: RouteComponent,
  validateSearch: search,
});

function RouteComponent() {
  const { from } = Route.useSearch();

  return <SignUpPage path={from} />;
}
