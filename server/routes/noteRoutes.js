import express from "express";
import {
  createNote,
  getMyNotes,
  getAllNotes,
  deleteNote
} from "../controllers/noteController.js";

import auth from "../middleware/auth.js";
import authorize from "../middleware/authorize.js";

const noteRoutes = express.Router();

noteRoutes.post("/", auth, createNote);
noteRoutes.get("/my", auth, getMyNotes);

// admin only
noteRoutes.get("/all", auth, authorize(["admin"]), getAllNotes);
noteRoutes.delete("/:id", auth, authorize(["admin"]), deleteNote);

export default noteRoutes;