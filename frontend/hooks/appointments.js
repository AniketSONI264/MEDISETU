// /hooks/appointment.js

import { useState } from "react";
import { bookAppointment, verifyPayment, cancelAppointment, getUserAppointments, getDoctorAppointments, getSingleAppointment, createOrder } from "../api";  // Import API calls

const useAppointments = () => {
  // State to track appointment data
  const [appointments, setAppointments] = useState([]);
  const [appointmentDetails, setAppointmentDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Book an appointment
  const handleBookAppointment = async (appointmentData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await bookAppointment(appointmentData);

      if (response.data) {
        console.log("Appointment booked successfully", response.data);
        return response.data;  // Contains appointmentId, razorpayOrder, and jitsiMeetLink
      }
    } catch (error) {
      console.error("Error booking appointment", error);
      setError("Failed to book appointment, please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Verify Razorpay payment
  const handleVerifyPayment = async (orderId, paymentId, signature, appointmentId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await verifyPayment({ orderId, paymentId, signature, appointmentId });

      if (response.data) {
        console.log("Payment verified successfully", response.data);
        return response.data;
      }
    } catch (error) {
      console.error("Error verifying payment", error);
      setError("Payment verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Cancel an appointment
  const handleCancelAppointment = async (appointmentId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await cancelAppointment(appointmentId);

      if (response.data) {
        console.log("Appointment cancelled successfully", response.data);
        return response.data;
      }
    } catch (error) {
      console.error("Error canceling appointment", error);
      setError("Failed to cancel appointment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Get all user appointments
  const handleGetUserAppointments = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getUserAppointments();

      if (response.data) {
        console.log("User appointments fetched successfully", response.data);
        setAppointments(response.data.appointments);
        return response.data.appointments;  // List of appointments for the user
      }
    } catch (error) {
      console.error("Error fetching user appointments", error);
      setError("Failed to fetch appointments. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Get all appointments for a specific doctor
  const handleGetDoctorAppointments = async (doctorId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await getDoctorAppointments(doctorId);

      if (response.data) {
        console.log("Doctor appointments fetched successfully", response.data);
        setAppointments(response.data.appointments);
        return response.data.appointments;  // List of appointments for the doctor
      }
    } catch (error) {
      console.error("Error fetching doctor appointments", error);
      setError("Failed to fetch doctor appointments. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Get details of a single appointment
  const handleGetSingleAppointment = async (appointmentId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await getSingleAppointment(appointmentId);

      if (response.data) {
        console.log("Single appointment fetched successfully", response.data);
        setAppointmentDetails(response.data.appointment);
        return response.data.appointment;  // Detailed appointment information
      }
    } catch (error) {
      console.error("Error fetching single appointment", error);
      setError("Failed to fetch appointment details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Create Razorpay order for manual payment
  const handleCreateOrder = async (paymentAmount) => {
    try {
      setLoading(true);
      setError(null);
      const response = await createOrder({ paymentAmount });

      if (response.data) {
        console.log("Razorpay order created successfully", response.data);
        return response.data.razorpayOrder;  // Razorpay order details
      }
    } catch (error) {
      console.error("Error creating Razorpay order", error);
      setError("Failed to create order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return {
    appointments,
    appointmentDetails,
    loading,
    error,
    handleBookAppointment,
    handleVerifyPayment,
    handleCancelAppointment,
    handleGetUserAppointments,
    handleGetDoctorAppointments,
    handleGetSingleAppointment,
    handleCreateOrder,
  };
};

export default useAppointments;
