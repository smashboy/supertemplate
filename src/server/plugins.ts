import fastifyVite from "@fastify/vite";
import {
  CreateFastifyContextOptions,
  fastifyTRPCPlugin,
  FastifyTRPCPluginOptions,
} from "@trpc/server/adapters/fastify";
import { FastifyInstance } from "fastify";
import { AppRouter, appRouter } from "./trpc";

export async function initFastifyPlugins(
  server: FastifyInstance,
  root: string
) {
  await server.register(fastifyVite, {
    root,
    dev: process.argv.includes("--dev"),
    spa: true,
  });

  await server.register(fastifyTRPCPlugin, {
    prefix: "/api/trpc",
    trpcOptions: {
      router: appRouter,
      createContext: (ctx: CreateFastifyContextOptions) => ctx,
      onError({ path, error }) {
        // report to error monitoring
        console.error(`Error in tRPC handler on path '${path}':`, error);
      },
    } satisfies FastifyTRPCPluginOptions<AppRouter>["trpcOptions"],
  });
}
