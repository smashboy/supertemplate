import ReactDOMServer from "react-dom/server";
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from "react-router-dom/server";
import { routes } from "../web/App";
import { FastifyReply, FastifyRequest } from "fastify";

function createFetchRequest(req: FastifyRequest, _: FastifyReply) {
  const origin = `${req.protocol}://${req.hostname}`;
  // Note: This had to take originalUrl into account for presumably vite's proxying
  const url = new URL(req.originalUrl || req.url, origin);

  const controller = new AbortController();
  const headers = new Headers();

  for (let [key, values] of Object.entries(req.headers)) {
    if (values) {
      if (Array.isArray(values)) {
        for (let value of values) {
          headers.append(key, value);
        }
      } else {
        headers.set(key, values);
      }
    }
  }

  const init = {
    method: req.method,
    headers,
    signal: controller.signal,
  };

  // if (req.method !== "GET" && req.method !== "HEAD") {
  //   // @ts-expect-error
  //   init.body = req.body;
  // }

  return new Request(url.href, init);
}

const handler = createStaticHandler(routes);

export async function initStaticApp(req: FastifyRequest, res: FastifyReply) {
  const fetchRequest = createFetchRequest(req, res);
  const ctx = await handler.query(fetchRequest);

  const router = createStaticRouter(handler.dataRoutes, ctx);

  return ReactDOMServer.renderToString(
    <StaticRouterProvider router={router} context={ctx} />
  );
}
