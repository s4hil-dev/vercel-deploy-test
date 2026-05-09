import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js"

const isProd = process.env.NODE_ENV === "production";
const cookieOptions = {
  httpOnly: true,
  secure: isProd,
  sameSite: isProd ? "none" : "lax",
  maxAge: 24 * 60 * 60 * 1000,
  path: "/"
};

// REGISTER
export const register = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      email,
      password: hashedPassword,
      role
    });

    res.json({ msg: "User registered" });
  } catch {
    res.status(500).json({ msg: "Server error" });
  }
};


// LOGIN (sets cookie)
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ msg: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, cookieOptions);

    res.json({
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      }
    });
  } catch {
    res.status(500).json({ msg: "Server error" });
  }
};


// CURRENT USER
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("email role");

    if (!user) return res.sendStatus(404);

    res.json({
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      }
    });
  } catch {
    res.status(500).json({ msg: "Server error" });
  }
};


// LOGOUT
export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    path: "/"
  });
  res.json({ msg: "Logged out" });
};
