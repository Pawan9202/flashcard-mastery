import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => ({
  server: {
    host: "127.0.0.1",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    minify: "terser",
    sourcemap: mode === "development",
    chunkSizeWarningLimit: 600,
    assetsInlineLimit: 4096,
  },
  optimizeDeps: {
    include: ["react", "@vitejs/plugin-react"],
  },
}));
