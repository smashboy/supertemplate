import { ViteDevServer } from "vite";
import type { FastifyReply, FastifyRequest } from "fastify";
import {
  createRequestHandler,
  defaultRenderHandler,
} from "@tanstack/start/server";
import { createRouter } from "./router/createRouter";

function createRouterRequestHandler(req: FastifyRequest) {
  const url = new URL(req.originalUrl || req.url, "https://localhost:3000")
    .href;

  const request = new Request(url, {
    method: req.method,
    headers: (() => {
      const headers = new Headers();
      for (const [key, value] of Object.entries(req.headers)) {
        headers.set(key, value as any);
      }
      return headers;
    })(),
  });

  const handler = createRequestHandler({
    request,
    createRouter: () => {
      const router = createRouter();

      // Update each router instance with the head info from vite
      router.update({
        context: {
          ...router.options.context,
        },
      });

      return router;
    },
  });

  return handler;
}

export async function render(
  req: FastifyRequest,
  res: FastifyReply,
  vite: ViteDevServer
) {
  const routerRes = await createRouterRequestHandler(req)(defaultRenderHandler);

  const body = await routerRes.text();
  const html = await vite.transformIndexHtml(req.originalUrl, body);

  res
    .status(routerRes.status)
    .headers(
      Array.from(routerRes.headers.entries()).reduce(
        (acc, [key, val]) => ({
          ...acc,
          [key]: val,
        }),
        {}
      )
    )
    .send(html);
}
