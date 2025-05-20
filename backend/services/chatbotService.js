import logger from "../utils/logger.js";
import Doctor from "../models/doctorModel.js";
import Appointment from "../models/appointmentModel.js";

// Define common intents and their responses
const intents = {
  greeting: {
    patterns: ["hi", "hello", "hey", "good morning", "good afternoon", "good evening"],
    responses: [
      "Hello! How can I help you today?",
      "Hi there! How may I assist you?",
      "Welcome to MediSetu! How can I help you?",
    ],
  },
  appointment: {
    patterns: ["book appointment", "schedule", "make appointment", "consultation"],
    responses: [
      "To book an appointment, please visit our website and select a doctor from the list. You can then choose your preferred date and time.",
      "You can schedule an appointment by selecting a doctor and choosing an available time slot.",
    ],
  },
  doctor: {
    patterns: ["find doctor", "doctor list", "specialist", "specialization"],
    responses: [
      "You can find doctors by their specialization on our website. We have specialists in various fields.",
      "To find a doctor, please visit our website and use the search filters to find the right specialist for you.",
    ],
  },
  payment: {
    patterns: ["payment", "fees", "cost", "price", "consultation fees"],
    responses: [
      "Consultation fees vary by doctor and specialization. You can view the fees when booking an appointment.",
      "The consultation fees are displayed when you select a doctor for appointment booking.",
    ],
  },
  video: {
    patterns: ["video call", "online consultation", "virtual visit", "meet link"],
    responses: [
      "After booking an appointment, you'll receive a video consultation link via email and SMS.",
      "The video consultation link will be sent to you before your appointment time.",
    ],
  },
  emergency: {
    patterns: ["emergency", "urgent", "immediate", "critical"],
    responses: [
      "For medical emergencies, please call emergency services immediately or visit the nearest hospital.",
      "This is an online consultation platform. For emergencies, please seek immediate medical attention.",
    ],
  },
};

// Function to find the best matching intent
const findIntent = (message) => {
  const words = message.toLowerCase().split(" ");
  let bestMatch = null;
  let highestScore = 0;

  for (const [intent, data] of Object.entries(intents)) {
    let score = 0;
    for (const pattern of data.patterns) {
      if (message.toLowerCase().includes(pattern)) {
        score += 1;
      }
    }
    if (score > highestScore) {
      highestScore = score;
      bestMatch = intent;
    }
  }

  return bestMatch;
};

// Function to get a random response from the intent
const getRandomResponse = (intent) => {
  const responses = intents[intent].responses;
  return responses[Math.floor(Math.random() * responses.length)];
};

// Function to get doctor information
const getDoctorInfo = async (specialization) => {
  try {
    const doctors = await Doctor.find({
      specialization: { $regex: specialization, $options: "i" },
    }).select("firstName lastName specialization consultationFees");

    if (doctors.length === 0) {
      return "I couldn't find any doctors with that specialization. Please try a different search term.";
    }

    return `I found ${doctors.length} doctor(s) in ${specialization}:\n${doctors
      .map(
        (doc) =>
          `Dr. ${doc.firstName} ${doc.lastName} - Consultation Fee: ₹${doc.consultationFees}`
      )
      .join("\n")}`;
  } catch (error) {
    logger.error("Error fetching doctor information", error);
    return "Sorry, I encountered an error while searching for doctors.";
  }
};

// Function to get appointment status
const getAppointmentStatus = async (userId) => {
  try {
    const appointments = await Appointment.find({ userId })
      .populate("doctorId", "firstName lastName specialization")
      .sort({ appointmentDate: -1 })
      .limit(1);

    if (appointments.length === 0) {
      return "You don't have any upcoming appointments.";
    }

    const appointment = appointments[0];
    return `Your next appointment is with Dr. ${appointment.doctorId.firstName} ${
      appointment.doctorId.lastName
    } on ${new Date(appointment.appointmentDate).toLocaleDateString()} at ${
      appointment.appointmentTime
    }.`;
  } catch (error) {
    logger.error("Error fetching appointment status", error);
    return "Sorry, I encountered an error while checking your appointments.";
  }
};

// Main chatbot function
export const processMessage = async (message, userId = null) => {
  try {
    // Check for specific queries
    if (message.toLowerCase().includes("doctor") && message.toLowerCase().includes("find")) {
      const specialization = message.toLowerCase().split("find")[1].trim();
      return await getDoctorInfo(specialization);
    }

    if (message.toLowerCase().includes("appointment") && message.toLowerCase().includes("status")) {
      if (!userId) {
        return "Please log in to check your appointment status.";
      }
      return await getAppointmentStatus(userId);
    }

    // Find matching intent
    const intent = findIntent(message);
    if (intent) {
      return getRandomResponse(intent);
    }

    // Default response if no intent matches
    return "I'm not sure I understand. Could you please rephrase your question? You can ask me about booking appointments, finding doctors, or checking appointment status.";
  } catch (error) {
    logger.error("Error processing chatbot message", error);
    return "Sorry, I encountered an error. Please try again later.";
  }
}; 