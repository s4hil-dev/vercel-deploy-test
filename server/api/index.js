import 'dotenv/config';
import app from "../app.js";
import connectDB from "../config/db.js";

let dbPromise;

export default async function handler(req, res) {
  try {
    if (!dbPromise) {
      dbPromise = connectDB();
    }
    await dbPromise;
    return app(req, res);
  } catch (error) {
    dbPromise = null;
    console.error("Function initialization failed:", error.message);
    return res.status(503).json({ msg: "Database connection failed" });
  }
}
