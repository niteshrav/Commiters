import dotenv from "dotenv";
import mongoose from "mongoose";
import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";

dotenv.config();

const uri = process.env.MONGODB_URI?.trim();
if (!uri) {
  console.error("MONGODB_URI not set");
  process.exit(1);
}

await mongoose.connect(uri);
const db = mongoose.connection.db;
if (!db) {
  console.error("MongoDB connection has no database handle");
  process.exit(1);
}

const stats = await db.stats();
const cols = await db.listCollections().toArray();
const byCollection: Array<{
  collection: string;
  documents: number;
  dataSizeKB: number;
  storageKB: number;
  indexes: number;
}> = [];

let totalDocs = 0;
for (const c of cols.sort((a, b) => a.name.localeCompare(b.name))) {
  const cs = (await db.command({ collStats: c.name })) as {
    count?: number;
    size?: number;
    storageSize?: number;
    nindexes?: number;
  };
  const documents = cs.count ?? 0;
  totalDocs += documents;
  byCollection.push({
    collection: c.name,
    documents,
    dataSizeKB: Math.round((cs.size ?? 0) / 1024),
    storageKB: Math.round((cs.storageSize ?? 0) / 1024),
    indexes: cs.nindexes ?? 0,
  });
}

let uploadBytes = 0;
try {
  const uploadDir = process.env.CMS_UPLOAD_DIR || "./uploads";
  const abs = join(process.cwd(), uploadDir);
  const walk = (dir: string) => {
    for (const f of readdirSync(dir, { withFileTypes: true })) {
      const p = join(dir, f.name);
      if (f.isDirectory()) walk(p);
      else uploadBytes += statSync(p).size;
    }
  };
  walk(abs);
} catch {
  uploadBytes = 0;
}

const report: Record<string, unknown> = {
  database: db.databaseName,
  mongo: {
    dataSizeMB: Math.round(((stats.dataSize as number) ?? 0) / 1024 / 1024 * 100) / 100,
    storageSizeMB: Math.round(((stats.storageSize as number) ?? 0) / 1024 / 1024 * 100) / 100,
    indexSizeMB: Math.round(((stats.indexSize as number) ?? 0) / 1024 / 1024 * 100) / 100,
    totalDocuments: totalDocs,
    collectionCount: byCollection.length,
    byCollection,
  },
  cmsUploadsOnDiskMB: Math.round(uploadBytes / 1024 / 1024 * 100) / 100,
};

const pg = process.env.DATABASE_URL?.trim();
if (pg) {
  try {
    const { PrismaClient } = await import("@prisma/client");
    const prisma = new PrismaClient();
    const leadCount = await prisma.lead.count();
    report.postgres = { leads: leadCount, note: "Lead table only (Prisma/PostgreSQL)" };
    await prisma.$disconnect();
  } catch (error) {
    report.postgres = { error: error instanceof Error ? error.message : String(error) };
  }
} else {
  report.postgres = { status: "not configured", note: "DATABASE_URL empty — PostgreSQL not in use" };
}

console.log(JSON.stringify(report, null, 2));
await mongoose.disconnect();
