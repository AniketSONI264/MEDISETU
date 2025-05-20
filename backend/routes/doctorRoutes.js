import express from "express";
import { registerDoctor, loginDoctor,getDoctorById } from "../controllers/docAuthController.js";
import { protectDoctor } from "../middlewares/docAuthMiddleware.js";
import Doctor from "../models/doctorModel.js";
import jwt from "jsonwebtoken";

const router = express.Router();

const logoutDoctor = (req, res) => {
  res.cookie("DocToken", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.json({ message: "Doctor logged out successfully" });
};

// 🔐 Auth Routes for Doctors
router.post("/register", registerDoctor);
router.post("/login", loginDoctor);
router.get("/me", protectDoctor, (req, res) => res.json(req.doctor));
router.post("/logout", logoutDoctor);
// router.get('/:id',getDoctorById);
// /api/doctor/auth/status

router.get("/status", async (req, res) => {
  const token = req.cookies.DocToken;
  console.log("DocToken :",token);
  if (!token) return res.status(200).json({ loggedIn: false, user: null });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("Decode :", decoded );
    const doctor = await Doctor.findById(decoded.id).select("-password");
    // console.log("Doctor",doctor);
    if (!doctor) return res.status(200).json({ loggedIn: false, user: null });

    return res.status(200).json({ loggedIn: true, user: doctor });
  } catch (err) {
    return res.status(200).json({ loggedIn: false, user: null });
  }
});
router.get("/allDoctors", async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching doctors" });
  }
});
router.get('/:id',getDoctorById);


export default router;
