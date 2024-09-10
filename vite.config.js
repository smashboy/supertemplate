import { defineConfig } from "vite";
import ReactPlugin from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [ReactPlugin({ jsxRuntime: "automatic" })],
});
