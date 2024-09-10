import { Link, Outlet } from "@tanstack/react-router";

export function Component() {
  return (
    <div>
      <h1>Hello World</h1>
      <Link to="/about">About Us</Link> <br />
      <Link to="/settings">Settings</Link>
      <Outlet />
    </div>
  );
}
