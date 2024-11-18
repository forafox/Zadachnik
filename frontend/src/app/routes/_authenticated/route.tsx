import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/app/layout/layout";

export const Route = createFileRoute("/_authenticated")({
  component: Layout,
});
