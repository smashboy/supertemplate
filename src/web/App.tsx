import { json, useLoaderData } from "react-router-dom";

export const routes = [
  {
    path: "/",
    loader() {
      return json({ message: "Welcome to React Router!" });
    },
    Component() {
      let data = useLoaderData();
      return <h1>{data?.message}</h1>;
    },
  },
];
