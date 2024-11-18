import { createFileRoute, redirect } from "@tanstack/react-router";
import { Layout } from "@/app/layout/layout";
import { getPrincipalQueryOptions } from "@/entities/principal";

export const Route = createFileRoute("/_authenticated")({
  component: Layout,
  beforeLoad: async (ctx) => {
    try {
      await ctx.context.queryClient.ensureQueryData(getPrincipalQueryOptions);
    } catch {
      throw redirect({
        to: "/sign-in",
        search: {
          from: ctx.location.pathname,
        },
      });
    }
  },
});
