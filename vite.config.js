import { defineConfig } from "vite";
import ReactPlugin from "@vitejs/plugin-react";
import ViteRestart from "vite-plugin-restart";

export default defineConfig({
  plugins: [
    ReactPlugin({ jsxRuntime: "automatic" }),
    ViteRestart({
      restart: ["./src/server/*"],
    }),
  ],
});
