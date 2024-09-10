import {
  createRootRoute,
  createRoute,
  NotFoundRoute,
  Outlet,
} from "@tanstack/react-router";
import { Component } from "./Component";

const rootRoute = createRootRoute();

const rootLayout = createRoute({
  id: "root-layout",
  getParentRoute: () => rootRoute,
  component: () => (
    <>
      <Outlet />
      {/* <TanStackRouterDevtools /> */}
    </>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootLayout,
  path: "/",
  component: Component,
});

const homeSubRoute = createRoute({
  getParentRoute: () => homeRoute,
  path: "/settings",
  component: () => "Home settings",
});

const aboutRoute = createRoute({
  getParentRoute: () => rootLayout,
  path: "/about",
  component: () => <div>About</div>,
});

export const notFoundRoute = new NotFoundRoute({
  getParentRoute: () => rootRoute,
  component: () => "404 Not Found",
});

export const routeTree = rootRoute.addChildren([
  homeRoute.addChildren([homeSubRoute]),
  aboutRoute,
  rootLayout,
]);
