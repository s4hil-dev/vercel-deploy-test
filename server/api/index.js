import 'dotenv/config';
import serverless from "serverless-http";
import app from "../app.js";
import connectDB from "../config/db.js";

let isConnected = false;
async function ensureDb() {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
}

export default async function handler(req, res) {
  await ensureDb();
  return serverless(app)(req, res);
}
