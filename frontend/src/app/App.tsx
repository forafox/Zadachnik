import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import i18n from "i18next";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { initReactI18next } from "react-i18next";
import auth from "@/shared/locales/en/auth.json";
import principal from "@/shared/locales/en/principal.json";
import product from "@/shared/locales/en/product.json";
import { routeTree } from "@/routeTree.gen";

const queryClient = new QueryClient();

const router = createRouter({ routeTree, context: { queryClient } });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export const defaultNS = "common";
export const resources = {
  en: {
    auth,
    principal,
    product,
  },
} as const;

i18n.use(initReactI18next).init({
  lng: "en",
  defaultNS,
  resources,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
);
