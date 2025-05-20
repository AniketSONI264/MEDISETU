import express from "express";
import {
  bookAppointment,
  verifyPayment,
  cancelAppointment,
  getUserAppointments,
  getDoctorAppointments,
  getSingleAppointment,
  createOrder,
} from "../controllers/appointmentController.js";
import { protectUser, protectDoctor } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Book appointment
router.post("/book", protectUser, bookAppointment);
router.post("/create-order",protectUser, createOrder)
// Verify payment after Razorpay success
router.post("/verify", protectUser, verifyPayment);

// Cancel appointment (both user & doctor can use it)
router.put("/cancel/:id", protectUser, cancelAppointment);

// User: Get all my appointments
router.get("/user", protectUser, getUserAppointments);

// Doctor: Get all appointments for a doctor
router.get("/doctor/:id", protectDoctor, getDoctorAppointments);

// Get specific appointment details
router.get("/:id", protectUser, getSingleAppointment);

export default router;
