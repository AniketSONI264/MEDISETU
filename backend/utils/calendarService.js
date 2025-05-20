import { google } from "googleapis";
import logger from "./logger.js";

let calendar;

// Initialize Google Calendar API only if credentials are available
if (process.env.GOOGLE_CLIENT_EMAIL && process.env.GOOGLE_PRIVATE_KEY) {
  calendar = google.calendar({
    version: "v3",
    auth: new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/calendar"],
    }),
  });
}

// Create calendar event
export const createCalendarEvent = async ({
  summary,
  description,
  start,
  end,
  attendees,
}) => {
  try {
    // If calendar is not initialized, return a mock response
    if (!calendar) {
      logger.info("Google Calendar not configured, skipping event creation", {
        summary,
        start,
        end
      });
      return {
        id: `mock-${Date.now()}`,
        hangoutLink: null,
        htmlLink: null
      };
    }

    const event = {
      summary,
      description,
      start,
      end,
      attendees,
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 24 * 60 }, // 1 day before
          { method: "popup", minutes: 30 }, // 30 minutes before
        ],
      },
      conferenceData: {
        createRequest: {
          requestId: `meet-${Date.now()}`,
          conferenceSolutionKey: { type: "hangoutsMeet" },
        },
      },
    };

    const response = await calendar.events.insert({
      calendarId: "primary",
      conferenceDataVersion: 1,
      requestBody: event,
    });

    logger.info("Calendar event created successfully", {
      eventId: response.data.id,
      meetLink: response.data.hangoutLink,
    });

    return response.data;
  } catch (error) {
    logger.error("Error creating calendar event", {
      error: error.message,
      summary,
    });
    // Return a mock response instead of throwing error
    return {
      id: `mock-${Date.now()}`,
      hangoutLink: null,
      htmlLink: null
    };
  }
};

// Update calendar event
export const updateCalendarEvent = async (eventId, updates) => {
  try {
    const response = await calendar.events.update({
      calendarId: "primary",
      eventId,
      requestBody: updates,
    });

    logger.info("Calendar event updated successfully", {
      eventId,
    });

    return response.data;
  } catch (error) {
    logger.error("Error updating calendar event", {
      error: error.message,
      eventId,
    });
    throw new Error(`Failed to update calendar event: ${error.message}`);
  }
};

// Delete calendar event
export const deleteCalendarEvent = async (eventId) => {
  try {
    await calendar.events.delete({
      calendarId: "primary",
      eventId,
    });

    logger.info("Calendar event deleted successfully", {
      eventId,
    });
  } catch (error) {
    logger.error("Error deleting calendar event", {
      error: error.message,
      eventId,
    });
    throw new Error(`Failed to delete calendar event: ${error.message}`);
  }
};

// Create appointment calendar event
export const createAppointmentCalendarEvent = async (appointment, user, doctor) => {
  const start = new Date(appointment.appointmentDate);
  const [hours, minutes] = appointment.appointmentTime.split(":");
  start.setHours(parseInt(hours), parseInt(minutes));

  const end = new Date(start);
  end.setMinutes(end.getMinutes() + 30); // 30-minute appointment

  return createCalendarEvent({
    summary: `Appointment with Dr. ${doctor.firstName} ${doctor.lastName}`,
    description: `Appointment with ${user.name}\nReason: ${appointment.reason}\nVitals:\nBP: ${appointment.vitals.bp}\nSugar: ${appointment.vitals.sugar}\nHeight: ${appointment.vitals.height}\nWeight: ${appointment.vitals.weight}`,
    start: {
      dateTime: start.toISOString(),
      timeZone: "Asia/Kolkata",
    },
    end: {
      dateTime: end.toISOString(),
      timeZone: "Asia/Kolkata",
    },
    attendees: [
      { email: user.email },
      { email: doctor.email },
    ],
  });
}; 