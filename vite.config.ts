import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "node:path";

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), tailwindcss()],
  resolve: { alias: { "@": resolve(import.meta.dirname) } },
  base: "./",
  server: {
    host: "127.0.0.1",
    port: 5173,
    strictPort: true,
    fs: { deny: ["**/STYED/**", "**/.archive/**", "**/.env*", "**/*.md"] },
  },
  build: {
    target: "es2022",
    sourcemap: false,
    ...(isSsrBuild
      ? {}
      : {
          rolldownOptions: {
            input: {
              home: resolve(import.meta.dirname, "index.html"),
              about: resolve(import.meta.dirname, "about.html"),
              programs: resolve(import.meta.dirname, "programs.html"),
              involved: resolve(import.meta.dirname, "get-involved.html"),
              donate: resolve(import.meta.dirname, "donate.html"),
              contact: resolve(import.meta.dirname, "contact.html"),
              mentorship: resolve(import.meta.dirname, "mentorship.html"),
            },
          },
        }),
  },
}));
