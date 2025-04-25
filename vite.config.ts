/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(), tailwindcss()],
// });

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {coverage: {
    provider: 'istanbul' // or 'v8'
  },
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setup.ts", // Adjust the path if needed
  },
});
