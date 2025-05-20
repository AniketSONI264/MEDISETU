// import express from 'express';
// import { protectUser, adminOnly } from '../middlewares/authMiddleware.js';
// import * as doctorController from '../controllers/admin/doctorController.js';
// import * as appointmentController from '../controllers/admin/appointmentController.js';
// import Doctor from '../models/doctorModel.js';

// const router = express.Router();

// // Apply admin auth middleware to all routes
// router.use(protectUser, adminOnly);
// router.get('/doctors', doctorController.getAllDoctors);

// // Get doctor by ID
// router.get('/doctors/:id', doctorController.getDoctorById);

// // Toggle verification status
// router.put('/doctors/:id/verify', doctorController.toggleVerification);
// // Doctor management routes
// // router.get('/doctors', async (req, res) => {
// //   try {
// //     const doctors = await Doctor.find()
// //       .select('-password')
// //       .sort({ createdAt: -1 });
// //     res.json({ success: true, doctors });
// //   } catch (error) {
// //     res.status(500).json({ success: false, message: 'Server error' });
// //   }
// // });

// // router.get('/doctors/:id', async (req, res) => {
// //   try {
// //     const doctor = await Doctor.findById(req.params.id).select('-password');
// //     if (!doctor) {
// //       return res.status(404).json({ success: false, message: 'Doctor not found' });
// //     }
// //     res.json({ success: true, doctor });
// //   } catch (error) {
// //     res.status(500).json({ success: false, message: 'Server error' });
// //   }
// // });

// // router.put('/doctors/:id/verify', async (req, res) => {
// //   try {
// //     const doctor = await Doctor.findById(req.params.id);
// //     if (!doctor) {
// //       return res.status(404).json({ success: false, message: 'Doctor not found' });
// //     }

// //     doctor.isVerified = !doctor.isVerified;
// //     await doctor.save();

// //     res.json({ success: true, doctor });
// //   } catch (error) {
// //     res.status(500).json({ success: false, message: 'Server error' });
// //   }
// // });

// // Appointment management routes
// router.get('/appointments', appointmentController.getAllAppointments);
// router.patch('/appointments/:id/status', appointmentController.updateAppointmentStatus);

// export default router; 

// // routes/adminRoutes.js
// import express from "express";
// import getAllDoctors from "../controllers/admin/adminUserController.js";
// import getAllAppointments from "../controllers/admin/appointmentController.js";
// import getAllDoctors from "../controllers/admin/doctorController.js";
// import {
//     createBlog,
//     getAllBlogs,
//     getBlogBySlug,
//     updateBlog,
//     deleteBlog,
//     togglePublishBlog,
// } from "../../controllers/admin/blogController.js";
// import { adminOnly } from "../middleware/authMiddleware.js";

// const router = express.Router();

// router.get("/doctors", adminOnly, getAllDoctors);
// router.get("/users", adminOnly, getAllUsers);
// router.get("/appointments", adminOnly, getAllAppointments);
// // router.get("/blogs", adminOnly, getAllBlogs);


// router.post("/", adminOnly, createBlog); // Create
// router.get("/", adminOnly, getAllBlogs); // Read all
// router.get("/:slug", adminOnly, getBlogBySlug); // Read by slug
// router.put("/:id", adminOnly, updateBlog); // Update
// router.delete("/:id", adminOnly, deleteBlog); // Delete
// router.patch("/toggle-publish/:id", adminOnly, togglePublishBlog); // Toggle publish

// export default router;


// routes/adminRoutes.js
// routes/adminRoutes.js
import express from "express";
import { getAllUsers } from "../controllers/admin/adminUserController.js";
import { getAllAppointments, updateAppointmentStatus } from "../controllers/admin/appointmentController.js";
import { getAllDoctors, toggleVerification } from "../controllers/admin/doctorController.js"; // ✅ import it
import { adminOnly } from "../middlewares/authMiddleware.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

router.get("/doctors", adminAuth, getAllDoctors);
router.put("/doctors/:id/verify", adminAuth, toggleVerification); // ✅ ADD this route
router.get("/users", adminAuth, getAllUsers);
router.get("/appointments", adminAuth, getAllAppointments);
router.patch("/:id/status", adminAuth, updateAppointmentStatus);

export default router;

