import { createRouter as createReactRouter } from "@tanstack/react-router";
import { notFoundRoute, routeTree } from "./router";

export function createRouter() {
  return createReactRouter({
    routeTree,
    notFoundRoute,
  });
}

declare module "@tanstack/react-router" {
  interface Register {
    // This infers the type of our router and registers it across your entire project
    router: ReturnType<typeof createRouter>;
  }
}
