import { createFileRoute } from "@tanstack/react-router";
import z from "zod";
import { SignInPage } from "@/pages/sign-in";

const search = z.object({
  from: z.string().optional(),
});

export const Route = createFileRoute("/sign-in")({
  component: RouteComponent,
  validateSearch: search,
});

function RouteComponent() {
  const { from } = Route.useSearch();

  return <SignInPage path={from} />;
}
