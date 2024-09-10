import { initTRPC } from "@trpc/server";

export const t = initTRPC.create();
export const appRouter = t.router({
  test: t.procedure.query(() => {
    return "hello world";
  }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
