export function getPort() {
  if (process.env.PORT) {
    return Number(process.env.PORT);
  }

  const str = process.argv
    .find((arg) => arg.startsWith("--port"))
    ?.split("=")[1];

  if (!str) {
    return 4000;
  }

  return Number(str);
}
