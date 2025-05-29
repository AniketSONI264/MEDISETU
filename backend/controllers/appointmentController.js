
// controllers/appointmentController.js
import Appointment from "../models/appointments.js"; 
import User from "../models/userModel.js";
import Doctor from "../models/doctorModel.js";
import Razorpay from "razorpay";
import crypto from "crypto";
import { sendEmail } from "../utils/emailService.js";
import { sendSMS } from "../utils/smsService.js";
import { createCalendarEvent } from "../utils/calendarService.js";
import { validateAppointmentData } from "../utils/validators.js";
import logger from "../utils/logger.js";

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// Create appointment and Razorpay order
// export const bookAppointment = async (req, res) => {
//   try {
//     const {
//       doctorId,
//       userId,
//       appointmentDate,
//       appointmentTime,
//       reason,
//       paymentAmount,
//       vitals,
//       timeSlot,
//     } = req.body;

//     // Validate input data
//     const validationError = validateAppointmentData(req.body);
//     if (validationError) {
//       return res.status(400).json({ error: validationError });
//     }

//     // Check if doctor exists and is available
//     const doctor = await Doctor.findById(doctorId);
//     if (!doctor) {
//       return res.status(404).json({ error: "Doctor not found" });
//     }

//     // Check if user exists
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     // Check if slot is available
//     const existingAppointment = await Appointment.findOne({
//       doctorId,
//       appointmentDate,
//       appointmentTime,
//       status: { $in: ["pending", "confirmed"] },
//     });

//     if (existingAppointment) {
//       return res.status(400).json({ error: "This slot is already booked" });
//     }

//     // Create Razorpay order
//     const order = await razorpay.orders.create({
//       amount: paymentAmount * 100, // Convert to paise
//       currency: "INR",
//       receipt: `receipt_${Date.now()}`,
//       notes: {
//         doctorId,
//         userId,
//         appointmentDate,
//         appointmentTime,
//       },
//     });

//     // Create appointment
//     const newAppointment = new Appointment({
//       doctorId,
//       userId,
//       appointmentDate,
//       appointmentTime,
//       reason,
//       paymentAmount,
//       vitals,
//       timeSlot,
//       status: "pending",
//       paymentStatus: "unpaid",
//       razorpay: {
//         orderId: order.id,
//       },
//     });

//     await newAppointment.save();

//     // Log appointment creation
//     logger.info("Appointment created", {
//       appointmentId: newAppointment._id,
//       doctorId,
//       userId,
//       orderId: order.id,
//     });

//     res.status(201).json({
//       appointmentId: newAppointment._id,
//       razorpayOrder: order,
//     });
//   } catch (error) {
//     logger.error("Error in bookAppointment", {
//       error: error.message,
//       stack: error.stack,
//     });
//     res.status(500).json({ error: "Failed to book appointment" });
//   }
// };

export const bookAppointment = async (req, res) => {
  try {
    const {
      doctorId,
      userId,
      appointmentDate,
      appointmentTime,
      reason,
      consultationFees,
      paymentAmount,
      vitals,
      timeSlot,
    } = req.body;

    // Validate input data
    const validationError = validateAppointmentData(req.body);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    // Check if doctor exists and is available
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if slot is available
    const existingAppointment = await Appointment.findOne({
      doctorId,
      appointmentDate,
      appointmentTime,
      status: { $in: ["pending", "confirmed"] },
    });

    if (existingAppointment) {
      return res.status(400).json({ error: "This slot is already booked" });
    }

    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: paymentAmount * 100, // Convert to paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        doctorId,
        userId,
        appointmentDate,
        appointmentTime,
      },
    });
    console.log("Doctor ID :",doctor," \nUser ID :",user);
    // Generate Jitsi Meet link here
    const meetLink = `https://meet.jit.si/MediSetu-${Date.now()}_${doctor._id}_${user._id}`;
    console.log("Meeting Link is Generated : ",meetLink);
    // Create appointment
    const newAppointment = new Appointment({
      doctorId,
      userId,
      appointmentDate,
      appointmentTime,
      reason,
      paymentAmount,
      vitals,
      timeSlot,
      status: "pending",
      paymentStatus: "unpaid",
      meetLink,
      razorpay: {
        orderId: order.id,
      },
      
    });
    console.log('Appointment data before saving:', newAppointment);

    await newAppointment.save();

    // Log appointment creation
    logger.info("Appointment created", {
      appointmentId: newAppointment._id,
      doctorId,
      userId,
      orderId: order.id,
    });
    console.log("Meet Link:",newAppointment.meetLink);
    res.status(201).json({
      appointmentId: newAppointment._id,
      razorpayOrder: order,
      meetLink: newAppointment.meetLink,  // Send the link back to the user
    });
  } catch (error) {
    logger.error("Error in bookAppointment", {
      error: error.message,
      stack: error.stack,
    });
    res.status(500).json({ error: "Failed to book appointment" });
  }
};


// Verify payment and update appointment
// export const verifyPayment = async (req, res) => {
//   try {
//     const { orderId, paymentId, signature, appointmentId } = req.body;

//     // Validate input
//     if (!orderId || !paymentId || !signature || !appointmentId) {
//       return res.status(400).json({ error: "Missing required fields" });
//     }

//     // Find appointment
//     const appointment = await Appointment.findById(appointmentId);
//     if (!appointment) {
//       return res.status(404).json({ error: "Appointment not found" });
//     }

//     // Verify signature
//     const expected = crypto
//       .createHmac("sha256", process.env.RAZORPAY_SECRET)
//       .update(`${orderId}|${paymentId}`)
//       .digest("hex");

//     if (expected !== signature) {
//       logger.error("Payment signature verification failed", {
//         appointmentId,
//         orderId,
//         paymentId,
//       });
//       return res.status(400).json({ error: "Invalid payment signature" });
//     }

//     // Update appointment status
//     appointment.status = "confirmed";
//     appointment.paymentStatus = "paid";
//     appointment.razorpay = {
//       orderId,
//       paymentId,
//       signature,
//     };

//     // Generate Jitsi Meet link
//     const meetLink = `https://meet.jit.si/MediSetu-${appointment._id}`;
//     appointment.meetLink = meetLink;

//     await appointment.save();

//     // Get user and doctor details for notifications
//     const [user, doctor] = await Promise.all([
//       User.findById(appointment.userId),
//       Doctor.findById(appointment.doctorId),
//     ]);

//     // Send email notifications
//     await Promise.all([
//       sendEmail({
//         to: user.email,
//         subject: "Appointment Confirmed",
//         template: "appointment-confirmation",
//         data: {
//           doctorName: `${doctor.firstName} ${doctor.lastName}`,
//           date: appointment.appointmentDate,
//           time: appointment.appointmentTime,
//           meetLink,
//         },
//       }),
//       sendEmail({
//         to: doctor.email,
//         subject: "New Appointment",
//         template: "doctor-appointment-notification",
//         data: {
//           patientName: user.name,
//           date: appointment.appointmentDate,
//           time: appointment.appointmentTime,
//           meetLink,
//         },
//       }),
//     ]);

//     // Send SMS notifications
//     await Promise.all([
//       sendSMS({
//         to: user.phone,
//         message: `Your appointment with Dr. ${doctor.firstName} ${doctor.lastName} is confirmed for ${appointment.appointmentDate} at ${appointment.appointmentTime}. Meet Link: ${meetLink}`,
//       }),
//       sendSMS({
//         to: doctor.phone,
//         message: `New appointment with ${user.name} on ${appointment.appointmentDate} at ${appointment.appointmentTime}. Meet Link: ${meetLink}`,
//       }),
//     ]);

//     // Add to calendar
//     await createCalendarEvent({
//       summary: `Appointment with Dr. ${doctor.firstName} ${doctor.lastName}`,
//       description: `Appointment with ${user.name} - ${appointment.reason}`,
//       start: {
//         dateTime: new Date(appointment.appointmentDate),
//         timeZone: "Asia/Kolkata",
//       },
//       end: {
//         dateTime: new Date(new Date(appointment.appointmentDate).getTime() + 30 * 60000),
//         timeZone: "Asia/Kolkata",
//       },
//       attendees: [
//         { email: user.email },
//         { email: doctor.email },
//       ],
//     });

//     // Log successful payment
//     logger.info("Payment verified and appointment confirmed", {
//       appointmentId,
//       orderId,
//       paymentId,
//     });

//     res.status(200).json({
//       message: "Payment verified successfully",
//       appointment,
//     });
//   } catch (error) {
//     logger.error("Error in verifyPayment", {
//       error: error.message,
//       stack: error.stack,
//     });
//     res.status(500).json({ error: "Failed to verify payment" });
//   }
// };


// export const verifyPayment = async (req, res) => {
//   try {
//     const { orderId, paymentId, signature, appointmentId } = req.body;

//     // Validate input
//     if (!orderId || !paymentId || !signature || !appointmentId) {
//       return res.status(400).json({ error: "Missing required fields" });
//     }

//     // Find appointment
//     const appointment = await Appointment.findById(appointmentId);
//     if (!appointment) {
//       return res.status(404).json({ error: "Appointment not found" });
//     }

//     // Verify signature
//     const expected = crypto
//       .createHmac("sha256", process.env.RAZORPAY_SECRET)
//       .update(`${orderId}|${paymentId}`)
//       .digest("hex");

//     if (expected !== signature) {
//       logger.error("Payment signature verification failed", {
//         appointmentId,
//         orderId,
//         paymentId,
//       });
//       return res.status(400).json({ error: "Invalid payment signature" });
//     }

//     // Update appointment status
//     appointment.status = "confirmed";
//     appointment.paymentStatus = "paid";
//     appointment.razorpay = {
//       orderId,
//       paymentId,
//       signature,
//     };

//     // Generate Jitsi Meet link
//     const meetLink = `https://meet.jit.si/MediSetu-${appointment._id}`;
//     appointment.meetLink = meetLink;

//     await appointment.save();

//     // Log successful payment
//     logger.info("Payment verified and appointment confirmed", {
//       appointmentId,
//       orderId,
//       paymentId,
//     });

//     // Respond to client with success message
//     res.status(200).json({
//       message: "Payment verified successfully",
//       appointment,
//     });
//   } catch (error) {
//     logger.error("Error in verifyPayment", {
//       error: error.message,
//       stack: error.stack,
//     });
//     res.status(500).json({ error: "Failed to verify payment" });
//   }
// };
export const verifyPayment = async (req, res) => {
  try {
    const { orderId, paymentId, signature, appointmentId } = req.body;

    // Validate input
    if (!orderId || !paymentId || !signature || !appointmentId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Find appointment
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    // Verify signature
    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(`${orderId}|${paymentId}`)
      .digest("hex");

    if (expected !== signature) {
      logger.error("Payment signature verification failed", {
        appointmentId,
        orderId,
        paymentId,
      });
      return res.status(400).json({ error: "Invalid payment signature" });
    }

    // Update appointment status
    appointment.status = "confirmed";
    appointment.paymentStatus = "paid";
    appointment.razorpay = {
      orderId,
      paymentId,
      signature,
    };

    // If meetLink is null or undefined, regenerate it
    if (!appointment.meetLink) {
      const meetLink = `https://meet.jit.si/MediSetu-${appointment._id}`;
      appointment.meetLink = meetLink;
      console.log("Verify MeetLink :",meetLink);
    }
    
    await appointment.save();

    // Log successful payment
    logger.info("Payment verified and appointment confirmed", {
      appointmentId,
      orderId,
      paymentId,
    });

    // Respond to client with success message
    res.status(200).json({
      message: "Payment verified successfully",
      appointment,
    });
  } catch (error) {
    logger.error("Error in verifyPayment", {
      error: error.message,
      stack: error.stack,
    });
    res.status(500).json({ error: "Failed to verify payment" });
  }
};



// Handle Razorpay webhook
export const handleRazorpayWebhook = async (req, res) => {
  try {
    const { event, payload } = req.body;

    // Verify webhook signature
    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
      .update(JSON.stringify(req.body))
      .digest("hex");

    if (expected !== req.headers["x-razorpay-signature"]) {
      return res.status(400).json({ error: "Invalid webhook signature" });
    }

    switch (event) {
      case "payment.captured":
        await handleSuccessfulPayment(payload);
        break;
      case "payment.failed":
        await handleFailedPayment(payload);
        break;
      case "order.paid":
        await handleOrderPaid(payload);
        break;
      default:
        logger.info("Unhandled webhook event", { event });
    }

    res.status(200).json({ received: true });
  } catch (error) {
    logger.error("Error in handleRazorpayWebhook", {
      error: error.message,
      stack: error.stack,
    });
    res.status(500).json({ error: "Webhook processing failed" });
  }
};

// Handle successful payment
const handleSuccessfulPayment = async (payload) => {
  const { payment } = payload;
  const appointment = await Appointment.findOne({
    "razorpay.orderId": payment.order_id,
  });

  if (appointment) {
    appointment.paymentStatus = "paid";
    appointment.razorpay.paymentId = payment.id;
    await appointment.save();

    logger.info("Payment successful", {
      appointmentId: appointment._id,
      paymentId: payment.id,
    });
  }
};

// Handle failed payment
const handleFailedPayment = async (payload) => {
  const { payment } = payload;
  const appointment = await Appointment.findOne({
    "razorpay.orderId": payment.order_id,
  });

  if (appointment) {
    appointment.paymentStatus = "failed";
    appointment.paymentAttempts = (appointment.paymentAttempts || 0) + 1;
    await appointment.save();

    logger.info("Payment failed", {
      appointmentId: appointment._id,
      paymentId: payment.id,
      error: payment.error_code,
    });
  }
};

// Handle order paid
const handleOrderPaid = async (payload) => {
  const { order } = payload;
  const appointment = await Appointment.findOne({
    "razorpay.orderId": order.id,
  });

  if (appointment) {
    appointment.status = "confirmed";
    await appointment.save();

    logger.info("Order paid", {
      appointmentId: appointment._id,
      orderId: order.id,
    });
  }
};

// Get appointment details
export const getAppointmentDetails = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    const appointment = await Appointment.findById(appointmentId)
      .populate("doctorId", "firstName lastName specialization email phone")
      .populate("userId", "name email phone");

    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    res.status(200).json({ appointment });
  } catch (error) {
    logger.error("Error in getAppointmentDetails", {
      error: error.message,
      stack: error.stack,
    });
    res.status(500).json({ error: "Failed to get appointment details" });
  }
};


export const cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    if (appointment.status === "cancelled") {
      return res.status(400).json({ error: "Appointment already cancelled" });
    }

    appointment.status = "cancelled";
    appointment.paymentStatus = "refunded";
    await appointment.save();

    res.status(200).json({ message: "Appointment cancelled successfully" });
  } catch (error) {
    logger.error("Error cancelling appointment", { error: error.message });
    res.status(500).json({ error: "Failed to cancel appointment" });
  }
};

export const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({ error: "Amount is required" });
    }

    const order = await razorpay.orders.create({
      amount: amount * 100, // Convert to paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    logger.info("Razorpay order created", {
      orderId: order.id,
      amount: amount
    });

    res.status(200).json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency
    });
  } catch (error) {
    logger.error("Error creating Razorpay order", {
      error: error.message,
      amount: req.body.amount
    });
    res.status(500).json({ error: "Failed to create order" });
  }
};

export const getUserAppointments = async (req, res) => {
  try {
    const userId = req.user._id;

    const appointments = await Appointment.find({ userId })
      .populate("doctorId", "firstName lastName specialization email phone profilePic")
      .sort({ appointmentDate: -1 });

    logger.info("User appointments fetched", {
      userId,
      count: appointments.length
    });

    res.status(200).json({ appointments });
  } catch (error) {
    logger.error("Error fetching user appointments", {
      error: error.message,
      userId: req.user._id
    });
    res.status(500).json({ error: "Failed to fetch user appointments" });
  }
};

export const getDoctorAppointments = async (req, res) => {
  try {
    const doctorId = req.params.id;

    const appointments = await Appointment.find({ doctorId })
      .populate("userId", "name email phone profilePic")
      .sort({ appointmentDate: -1 });

    logger.info("Doctor appointments fetched", {
      doctorId,
      count: appointments.length
    });

    res.status(200).json({ appointments });
  } catch (error) {
    logger.error("Error fetching doctor appointments", {
      error: error.message,
      doctorId: req.params.id
    });
    res.status(500).json({ error: "Failed to fetch doctor appointments" });
  }
};

export const getSingleAppointment = async (req, res) => {
  try {
    const appointmentId = req.params.id;

    const appointment = await Appointment.findById(appointmentId)
      .populate("doctorId", "firstName lastName specialization email phone")
      .populate("userId", "name email phone");

    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    logger.info("Single appointment fetched", {
      appointmentId
    });

    res.status(200).json({ appointment });
  } catch (error) {
    logger.error("Error fetching single appointment", {
      error: error.message,
      appointmentId: req.params.id
    });
    res.status(500).json({ error: "Failed to fetch appointment details" });
  }
};