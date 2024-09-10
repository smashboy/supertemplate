const isProduction = process.env.NODE_ENV === "production";

const { createServer } = await import("./src/server/createServer");

const { server } = await createServer();

await server.listen({ port: 3000 });
console.log("Server is running at port:", 3000);
