// import express from "express";
// import { registerDoctor, loginDoctor,getDoctorById } from "../controllers/docAuthController.js";
// import { protectDoctor } from "../middlewares/docAuthMiddleware.js";
// import Doctor from "../models/doctorModel.js";
// import jwt from "jsonwebtoken";

// const router = express.Router();

// const logoutDoctor = (req, res) => {
//   res.cookie("DocToken", "", {
//     httpOnly: true,
//     expires: new Date(0),
//   });
//   res.json({ message: "Doctor logged out successfully" });
// };

// // 🔐 Auth Routes for Doctors
// router.post("/register", registerDoctor);
// router.post("/login", loginDoctor);
// router.get("/me", protectDoctor, (req, res) => res.json(req.doctor));
// router.post("/logout", logoutDoctor);
// // router.get('/:id',getDoctorById);
// // /api/doctor/auth/status

// router.get("/status", async (req, res) => {
//   const token = req.cookies.DocToken;
//   console.log("DocToken :",token);
//   if (!token) return res.status(200).json({ loggedIn: false, user: null });
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     // console.log("Decode :", decoded );
//     const doctor = await Doctor.findById(decoded.id).select("-password");
//     // console.log("Doctor",doctor);
//     if (!doctor) return res.status(200).json({ loggedIn: false, user: null });

//     return res.status(200).json({ loggedIn: true, user: doctor });
//   } catch (err) {
//     return res.status(200).json({ loggedIn: false, user: null });
//   }
// });
// router.get("/allDoctors", async (req, res) => {
//   try {
//     const doctors = await Doctor.find();
//     res.status(200).json(doctors);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error fetching doctors" });
//   }
// });
// router.get('/:id',getDoctorById);


// export default router;






import express from "express";
import {
  registerDoctor,
  loginDoctor,
  getDoctorById,
  getDoctorAppointments,
  updateAppointmentStatus,
  getDoctorProfile,
  updateDoctorProfile,
  uploadPrescription,
  getPatients,
  getEarnings
} from "../controllers/docAuthController.js";




import { protectDoctor } from "../middlewares/docAuthMiddleware.js";
import Doctor from "../models/doctorModel.js";
import jwt from "jsonwebtoken";
import multer from "multer";

// ===== Multer setup =====
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/prescriptions/');
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split('.').pop();
    cb(null, `presc_${Date.now()}.${ext}`);
  },
});
const upload = multer({ storage });

const router = express.Router();

// === Auth Routes ===
router.post("/register", registerDoctor);
router.post("/login", loginDoctor);
router.post("/logout", (req, res) => {
  res.cookie("DocToken", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.json({ message: "Doctor logged out successfully" });
});

router.get("/me", protectDoctor, (req, res) => res.json(req.doctor));

// === Auth Status ===
router.get("/status", async (req, res) => {
  const token = req.cookies.DocToken;
  if (!token) return res.status(200).json({ loggedIn: false, user: null });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const doctor = await Doctor.findById(decoded.id).select("-password");
    if (!doctor) return res.status(200).json({ loggedIn: false, user: null });

    return res.status(200).json({ loggedIn: true, user: doctor });
  } catch {
    return res.status(200).json({ loggedIn: false, user: null });
  }
});

// === Doctor Public Routes ===
router.get("/allDoctors", async (req, res) => {
  try {
    const doctors = await Doctor.find().select("firstName lastName specialization profilePic");
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching doctors" });
  }
});
router.get("/:id", getDoctorById);

// === Protected Doctor Routes ===
router.use(protectDoctor);

router.get("/appointments", getDoctorAppointments);
router.patch("/appointments/:id/status", updateAppointmentStatus);
router.post("/appointments/:id/prescription", upload.single("prescription"), uploadPrescription);

router.get("/profile", getDoctorProfile);
router.put("/profile", updateDoctorProfile);

router.get("/patients", getPatients);
router.get("/earnings", getEarnings);

export default router;
