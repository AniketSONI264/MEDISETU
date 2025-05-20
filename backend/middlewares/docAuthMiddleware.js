// doctorAuthMiddleware.js
import jwt from "jsonwebtoken";
import Doctor from "../models/doctorModel.js";

// ✅ Middleware to protect doctor-specific routes
export const protectDoctor = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const doctor = await Doctor.findById(decoded.id).select("-password");

    if (!doctor) {
      return res.status(401).json({ message: "Doctor not found or token invalid" });
    }

    // ✅ Attach doctor to request object
    req.doctor = doctor;
    next();
  } catch (error) {
    console.error("Doctor auth error:", error);
    res.status(401).json({ message: "Token failed or expired" });
  }
};

// ✅ Middleware to allow only verified doctors
export const verifiedDoctorOnly = (req, res, next) => {
  if (req.doctor && req.doctor.isVerified) {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Doctor not verified" });
  }
};
