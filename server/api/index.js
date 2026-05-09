import 'dotenv/config';
import serverless from "serverless-http";
import app from "../app.js";
import connectDB from "../config/db.js";

const appHandler = serverless(app);
let isConnected = false;
async function ensureDb() {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
}

export default async function handler(req, res) {
  try {
    await ensureDb();
    return appHandler(req, res);
  } catch (error) {
    console.error("Function initialization failed:", error.message);
    return res.status(503).json({ msg: "Database connection failed" });
  }
}
