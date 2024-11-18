import { createFileRoute, redirect } from "@tanstack/react-router";
import { Layout } from "@/app/layout/layout";

export const Route = createFileRoute("/_authenticated")({
  component: Layout,
  beforeLoad: (ctx) => {
    const isAuthenticated = true;
    if (isAuthenticated) {
      return;
    }
    throw redirect({
      to: "/sign-in",
      search: {
        from: ctx.location.pathname,
      },
    });
  },
});
