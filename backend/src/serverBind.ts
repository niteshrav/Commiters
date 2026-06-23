export function getServerHost(): string {
  return process.env.HOST ?? "0.0.0.0";
}
