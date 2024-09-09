import fastify from "fastify";
import fs from "node:fs/promises";
import { createServer } from "vite";
import { initFastifyPlugins } from "./src/server/plugins";
import { getPort } from "./src/server/utils";

const isProduction = process.env.NODE_ENV === "production";

const server = fastify({
  maxParamLength: 5000,
  logger: {
    enabled: !isProduction,
    transport: {
      target: "@fastify/one-line-logger",
    },
  },
});

const PORT = getPort();

const vite = await createServer({
  server: {
    middlewareMode: {
      server: server.server,
    },
  },
  appType: "custom",
  base: "/",
});

async function initServer() {
  await initFastifyPlugins(server, import.meta.url);

  server.get("*", async (req, res) => {
    if (req.url.startsWith("/app")) {
      return res.html();
    }

    let htmlTemplate = await fs.readFile("./src/app/index.html", "utf-8");

    htmlTemplate = await vite.transformIndexHtml(
      req.originalUrl.replace("/", ""),
      htmlTemplate
    );

    const initStaticApp = (
      await vite.ssrLoadModule("./src/server/initStaticApp.tsx")
    ).initStaticApp;

    let html = await initStaticApp(req, res);

    html = htmlTemplate
      .replace("<!--app-html-->", html)
      .replace('<script type="module" src="/mount.ts"></script>', "");

    res.status(200).headers({ "Content-Type": "text/html" }).send(html);
  });

  await server.vite.ready();
  await server.listen({ port: PORT });
  console.log("Server is running at port:", PORT);
}

await initServer();
