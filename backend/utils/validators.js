import { body, validationResult } from "express-validator";
import mongoose from 'mongoose';

export const validateAppointmentData = (data) => {
  const errors = [];

  if (!data.doctorId) {
    errors.push("Doctor ID is required");
  }

  if (!data.userId) {
    errors.push("User ID is required");
  }

  if (!data.appointmentDate) {
    errors.push("Appointment date is required");
  } else {
    const date = new Date(data.appointmentDate);
    if (isNaN(date.getTime())) {
      errors.push("Invalid appointment date");
    }
  }

  if (!data.appointmentTime) {
    errors.push("Appointment time is required");
  } else {
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(data.appointmentTime)) {
      errors.push("Invalid appointment time format");
    }
  }

  if (!data.reasonForVisit) {
    errors.push("Reason for appointment is required");
  }

  if (!data.paymentAmount) {
    errors.push("Payment amount is required");
  } else if (isNaN(data.paymentAmount) || data.paymentAmount <= 0) {
    errors.push("Invalid payment amount");
  }

  if (!data.vitals) {
    errors.push("Vitals information is required");
  } else {
    const { bp, sugar, height, weight } = data.vitals;
    
    if (!bp) errors.push("Blood pressure is required");
    if (!sugar) errors.push("Blood sugar is required");
    if (!height) errors.push("Height is required");
    if (!weight) errors.push("Weight is required");

    // Validate vitals format
    const bpRegex = /^\d{2,3}\/\d{2,3}$/;
    if (bp && !bpRegex.test(bp)) {
      errors.push("Invalid blood pressure format (e.g., 120/80)");
    }

    if (sugar && (isNaN(sugar) || sugar < 0 || sugar > 1000)) {
      errors.push("Invalid blood sugar value");
    }

    if (height && (isNaN(height) || height < 0 || height > 300)) {
      errors.push("Invalid height value");
    }

    if (weight && (isNaN(weight) || weight < 0 || weight > 500)) {
      errors.push("Invalid weight value");
    }
  }

  return errors.length > 0 ? errors.join(", ") : null;
};

export const validatePaymentVerification = (data) => {
  const errors = [];

  if (!data.orderId) {
    errors.push("Order ID is required");
  }

  if (!data.paymentId) {
    errors.push("Payment ID is required");
  }

  if (!data.signature) {
    errors.push("Payment signature is required");
  }

  if (!data.appointmentId) {
    errors.push("Appointment ID is required");
  }

  return errors.length > 0 ? errors.join(", ") : null;
};

export const validateObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  // At least 6 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
  return passwordRegex.test(password);
};

export const validatePhone = (phone) => {
  // Basic phone number validation (can be customized based on requirements)
  const phoneRegex = /^\+?[\d\s-]{10,}$/;
  return phoneRegex.test(phone);
}; 