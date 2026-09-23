import "dotenv/config";
import { createApp } from "./app";
import { assertProductionEmailDeliveryReady } from "./lib/smtpConfig";
import { getServerHost } from "./serverBind";
import { connectMongo } from "./cms/config/database";
import { ensureMissingCmsProjects } from "./cms/seedProjects";
import { failInterruptedJobs } from "./crawler/service";

assertProductionEmailDeliveryReady();

const port = Number(process.env.PORT ?? 4000);
const host = getServerHost();

async function start() {
  await connectMongo();
  try {
    const interrupted = await failInterruptedJobs();
    if (interrupted) {
      console.log(`Crawler: marked ${interrupted} interrupted crawl job(s) as failed.`);
    }
  } catch (error) {
    console.error("Crawler job recovery failed:", error);
  }
  try {
    const added = await ensureMissingCmsProjects();
    if (added) {
      console.log(`CMS: added ${added} missing case study project(s).`);
    }
  } catch (error) {
    console.error("CMS project ensure failed:", error);
  }
  const app = createApp();
  app.listen(port, host, () => {
    console.log(`Commiters API listening on http://${host}:${port}`);
  });
}

start().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});

