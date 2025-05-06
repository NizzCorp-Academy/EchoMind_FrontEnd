/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // 🛠️ ADD THIS
    },
  },
  test: {
    coverage: {
      provider: "istanbul", // or 'v8'
    },
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setup.ts",
  },
  server: {
    host: true,
    allowedHosts: ["ip172-18-0-83-d0cu720l2o90009e3f20-5173.direct.labs.play-with-docker.com"]
  }
  
});
