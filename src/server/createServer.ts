import { createServer as createViteServer } from "vite";
import fastify from "fastify";
import { initFastifyPlugins } from "./initPlugins";

export async function createServer() {
  const server = fastify({
    maxParamLength: 5000,
    logger: {
      enabled: true,
      transport: {
        target: "@fastify/one-line-logger",
      },
    },
  });

  const vite = await createViteServer({
    root: process.cwd(),
    server: {
      middlewareMode: true,
      watch: {
        usePolling: true,
        interval: 100,
      },
    },
    appType: "custom",
  });

  await initFastifyPlugins(server, vite);

  server.get("*", async (req, res) => {
    try {
      const entry = await vite.ssrLoadModule("./src/app/entry.server.ts");
      await entry.render(req, res, vite);
      console.info("Rendering: ", req.originalUrl);
    } catch (error) {
      // @ts-expect-error
      vite.ssrFixStacktrace(error);
      // @ts-expect-error
      console.info(error.stack);
      // @ts-expect-error
      res.status(500).send(error.stack);
    }
  });

  return { server, vite };
}
