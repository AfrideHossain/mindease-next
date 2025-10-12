import mongoose from "mongoose";

// check if the MONGO_URI is defined in environment variable
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  throw new Error("❌ Please define the MONGODB_URI environment variable");
}

// cache the mongodb connection to the global object;
let cacheConn = global._mongooseConnection;
// if not cached yet then create one
if (!cacheConn) {
  cacheConn = global._mongooseConnection = { conn: null, promise: null };
}

// ---------------------------------------------
// 🔌 The main function to connect to MongoDB
// ---------------------------------------------
export async function connectToDb() {
  //return cached connection if cached
  if (cacheConn.conn) {
    console.log("✅ Using existing MongoDB connection");
    return cacheConn.conn;
  }
  // If no ongoing connection promise exists,
  // start a new one and save it in the cache
  if (!cacheConn.promise) {
    console.log("⏳ Connecting to MongoDB...");
    cacheConn.promise = mongoose
      .connect(MONGO_URI)
      .then((mongoInstance) => mongoInstance.connection);
  }

  try {
    // ⏱️ 3) Wait for the connection to finish
    cacheConn.conn = await cacheConn.promise;
    console.log("🚀 MongoDB connected successfully");
    return cacheConn.conn;
  } catch (error) {
    // ❌ 4) If connection fails, reset the promise
    console.error("❌ MongoDB connection failed:", error);
    cached.promise = null;
    throw error;
  }
}
