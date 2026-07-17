import mongoose from "mongoose";

let isConnected = false;

export function isMongoConnected(): boolean {
  return isConnected && mongoose.connection.readyState === 1;
}

export async function connectMongo(): Promise<boolean> {
  const uri = process.env.MONGODB_URI?.trim();
  if (!uri) {
    console.warn("[cms] MONGODB_URI not set — CMS features disabled; frontend will use hardcoded fallbacks.");
    return false;
  }

  if (isConnected) return true;

  try {
    await mongoose.connect(uri);
    isConnected = true;
    console.log("[cms] Connected to MongoDB");
    return true;
  } catch (error) {
    console.error("[cms] MongoDB connection failed:", error instanceof Error ? error.message : error);
    return false;
  }
}

export async function disconnectMongo(): Promise<void> {
  if (!isConnected) return;
  await mongoose.disconnect();
  isConnected = false;
}
