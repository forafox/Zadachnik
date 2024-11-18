import { Layout } from "@/app/layout/layout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
  component: Layout,
});
