import express from "express";
import {
  register,
  login,
  logout,
  getMe
} from "../controllers/authController.js";
import auth from "../middleware/auth.js";

const authRoutes = express.Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.post("/logout", logout);
authRoutes.get("/me", auth, getMe);

export default authRoutes;
