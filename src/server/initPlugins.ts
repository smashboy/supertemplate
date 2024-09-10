import type { ViteDevServer } from "vite";
import middie from "@fastify/middie";
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import type { FastifyInstance } from "fastify";
import { appRouter } from "./trpc";

export async function initFastifyPlugins(
  server: FastifyInstance,
  vite: ViteDevServer
) {
  await server.register(middie);
  server.use(vite.middlewares);

  await server.register(fastifyTRPCPlugin, {
    prefix: "/api/trpc",
    trpcOptions: {
      router: appRouter,
      createContext: (ctx) => ctx,
      onError({ path, error }) {
        // report to error monitoring
        console.error(`Error in tRPC handler on path '${path}':`, error);
      },
    },
  });
}
