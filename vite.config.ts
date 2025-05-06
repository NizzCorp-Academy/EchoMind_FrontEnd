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
    strictPort: true,
    allowedHosts:true
  }
  
  
});
