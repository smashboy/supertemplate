import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <div>
          <h1>Hello World</h1>
          <Link to="about">About Us</Link>
        </div>
      ),
    },
    {
      path: "about",
      element: <div>About</div>,
    },
  ],
  {
    basename: "/app",
  }
);

export function createApp() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
