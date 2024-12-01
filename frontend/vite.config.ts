import path from "path";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";
import tsrConfig from "./tsr.config.json";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), TanStackRouterVite(tsrConfig)],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080",
      },
    },
  },
  test: {
    environment: "jsdom",
    coverage: {
      reporter: ["json-summary", "json"],
    },
    globals: true,
  },
});
