import nodemailer from "nodemailer";
import pkg from 'handlebars';
const { compile } = pkg;
import fs from "fs/promises";
import path from "path";
import logger from "./logger.js";

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Load email templates
const loadTemplate = async (templateName) => {
  try {
    const templatePath = path.join(process.cwd(), "templates", "emails", `${templateName}.hbs`);
    const template = await fs.readFile(templatePath, "utf-8");
    return compile(template);
  } catch (error) {
    logger.error("Error loading email template", {
      template: templateName,
      error: error.message,
    });
    throw new Error(`Failed to load email template: ${templateName}`);
  }
};

// Send email
export const sendEmail = async ({ to, subject, template, data }) => {
  try {
    // Load and compile template
    const compiledTemplate = await loadTemplate(template);
    const html = compiledTemplate(data);

    // Send email
    const info = await transporter.sendMail({
      from: `"MediSetu" <${process.env.SMTP_FROM}>`,
      to,
      subject,
      html,
    });

    logger.info("Email sent successfully", {
      to,
      subject,
      template,
      messageId: info.messageId,
    });

    return info;
  } catch (error) {
    logger.error("Error sending email", {
      to,
      subject,
      template,
      error: error.message,
    });
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

// Send appointment confirmation email
export const sendAppointmentConfirmation = async (appointment, user, doctor) => {
  const data = {
    userName: user.name,
    doctorName: `${doctor.firstName} ${doctor.lastName}`,
    appointmentDate: appointment.appointmentDate,
    appointmentTime: appointment.appointmentTime,
    meetLink: appointment.meetLink,
    reason: appointment.reason,
    vitals: appointment.vitals,
  };

  await sendEmail({
    to: user.email,
    subject: "Appointment Confirmed - MediSetu",
    template: "appointment-confirmation",
    data,
  });
};

// Send appointment reminder email
export const sendAppointmentReminder = async (appointment, user, doctor) => {
  const data = {
    userName: user.name,
    doctorName: `${doctor.firstName} ${doctor.lastName}`,
    appointmentDate: appointment.appointmentDate,
    appointmentTime: appointment.appointmentTime,
    meetLink: appointment.meetLink,
  };

  await sendEmail({
    to: user.email,
    subject: "Appointment Reminder - MediSetu",
    template: "appointment-reminder",
    data,
  });
};

// Send payment confirmation email
export const sendPaymentConfirmation = async (appointment, user, doctor) => {
  const data = {
    userName: user.name,
    doctorName: `${doctor.firstName} ${doctor.lastName}`,
    appointmentDate: appointment.appointmentDate,
    appointmentTime: appointment.appointmentTime,
    amount: appointment.paymentAmount,
    paymentId: appointment.razorpay.paymentId,
  };

  await sendEmail({
    to: user.email,
    subject: "Payment Confirmation - MediSetu",
    template: "payment-confirmation",
    data,
  });
}; 