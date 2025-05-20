import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import Doctor from "../models/doctorModel.js";

// 🧑‍💼 Admin-Only Access
export const protectAdmin = async (req, res, next) => {
  try {
    let token = req.cookies.jwt || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "Admin not logged in" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized admin access" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Admin Auth Error:", error);
    res.status(401).json({ message: "Invalid or expired token for admin" });
  }
};

// 🥼 Doctor-Only Access
export const protectDoctor = async (req, res, next) => {
  try {
    let token = req.cookies.DocToken || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "Doctor not logged in" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const doctor = await Doctor.findById(decoded.id).select("-password");

    if (!doctor || doctor.role !== "doctor") {
      return res.status(403).json({ message: "Unauthorized doctor access" });
    }

    req.doctor = doctor;
    next();
  } catch (error) {
    console.error("Doctor Auth Error:", error);
    res.status(401).json({ message: "Invalid or expired token for doctor" });
  }
};

// 🔒 Protect Routes for Admins Only
export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }
  return res.status(403).json({ message: "Admins only access" });
};

// 🧑‍⚕️ Protect Routes for Doctors Only
export const doctorOnly = (req, res, next) => {
  if (req.doctor && req.doctor.role === "doctor") {
    return next();
  }
  return res.status(403).json({ message: "Doctors only access" });
};
