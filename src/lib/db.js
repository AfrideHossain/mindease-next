import mongoose from "mongoose";

// ✅ 1. Get MongoDB URI (fallback for both names)
// const MONGO_URI = process.env.MONGO_URI;

// if (!MONGO_URI) {
//   throw new Error("❌ Please define MONGO_URI in .env file");
// }

// ✅ 2. Cache connection globally to avoid re-connecting
let cacheConn = global._mongooseConnection;
if (!cacheConn) {
  cacheConn = global._mongooseConnection = { conn: null, promise: null };
}

// ✅ 3. The main function
export async function connectToDb() {
  if (cacheConn.conn) {
    console.log("✅ Using existing MongoDB connection");
    return cacheConn.conn;
  }

  if (!cacheConn.promise) {
    const MONGO_URI = process.env.MONGO_URI;

    if (!MONGO_URI) {
      throw new Error("❌ Please define MONGO_URI in .env file");
    }

    console.log("⏳ Connecting to MongoDB...");
    cacheConn.promise = mongoose
      .connect(MONGO_URI, {
        dbName: "mindease",
      })
      .then((mongoInstance) => mongoInstance.connection);
  }

  try {
    cacheConn.conn = await cacheConn.promise;
    console.log("🚀 MongoDB connected successfully");
    return cacheConn.conn;
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    cacheConn.promise = null;
    throw error;
  }
}
