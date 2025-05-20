import twilio from "twilio";
import logger from "./logger.js";

// Initialize Twilio client
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Send SMS
export const sendSMS = async ({ to, message }) => {
  try {
    const result = await client.messages.create({
      body: message,
      to,
      from: process.env.TWILIO_PHONE_NUMBER,
    });

    logger.info("SMS sent successfully", {
      to,
      messageId: result.sid,
    });

    return result;
  } catch (error) {
    logger.error("Error sending SMS", {
      to,
      error: error.message,
    });
    throw new Error(`Failed to send SMS: ${error.message}`);
  }
};

// Send appointment confirmation SMS
export const sendAppointmentConfirmationSMS = async (appointment, user, doctor) => {
  const message = `Your appointment with Dr. ${doctor.firstName} ${doctor.lastName} is confirmed for ${appointment.appointmentDate} at ${appointment.appointmentTime}. Meet Link: ${appointment.meetLink}`;

  await sendSMS({
    to: user.phone,
    message,
  });
};

// Send appointment reminder SMS
export const sendAppointmentReminderSMS = async (appointment, user, doctor) => {
  const message = `Reminder: Your appointment with Dr. ${doctor.firstName} ${doctor.lastName} is scheduled for ${appointment.appointmentDate} at ${appointment.appointmentTime}. Meet Link: ${appointment.meetLink}`;

  await sendSMS({
    to: user.phone,
    message,
  });
};

// Send payment confirmation SMS
export const sendPaymentConfirmationSMS = async (appointment, user, doctor) => {
  const message = `Payment of ₹${appointment.paymentAmount} for your appointment with Dr. ${doctor.firstName} ${doctor.lastName} has been confirmed. Payment ID: ${appointment.razorpay.paymentId}`;

  await sendSMS({
    to: user.phone,
    message,
  });
}; 