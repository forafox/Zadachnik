import { createFileRoute } from "@tanstack/react-router";
import { ProfilePage } from "@/pages/profile";
import { getPrincipalQueryOptions } from "@/entities/principal";

export const Route = createFileRoute("/_authenticated/me/")({
  component: RouteComponent,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(getPrincipalQueryOptions),
});

function RouteComponent() {
  const principal = Route.useLoaderData();
  return <ProfilePage principal={principal} />;
}
