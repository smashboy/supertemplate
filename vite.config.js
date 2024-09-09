import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const path = fileURLToPath(import.meta.url);
const root = resolve(dirname(path), "src", "app");

const plugins = [viteReact({ jsxRuntime: "automatic" })];

export default defineConfig({
  root,
  plugins,
});
