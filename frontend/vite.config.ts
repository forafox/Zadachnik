import path from "path";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsrConfig from "./tsr.config.json";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), TanStackRouterVite(tsrConfig)],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
