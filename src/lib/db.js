import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("❌ Please define the MONGODB_URI environment variable");
}

// Create or reuse a global cache
// (In dev mode, this survives hot reloads)
let cached = global._mongooseConnection;

if (!cached) {
  cached = global._mongooseConnection = { conn: null, promise: null };
}

export async function connectToDb() {
  if (cached.conn) {
    console.log("✅ Using existing MongoDB connection");
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("⏳ Connecting to MongoDB...");
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: "myDatabaseName", // optional but good to set
      })
      .then((mongooseInstance) => {
        return mongooseInstance.connection;
      });
  }

  try {
    cached.conn = await cached.promise;
    console.log("🚀 MongoDB connected successfully");
    return cached.conn;
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    cached.promise = null;
    throw err;
  }
}
