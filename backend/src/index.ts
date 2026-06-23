import "dotenv/config";
import { createApp } from "./app";
import { getServerHost } from "./serverBind";

const port = Number(process.env.PORT ?? 4000);
const host = getServerHost();
const app = createApp();

app.listen(port, host, () => {
  console.log(`Commiters API listening on http://${host}:${port}`);
});

