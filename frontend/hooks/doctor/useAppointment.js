import { useEffect, useState } from "react";
import { toast } from "react-hot-toast"; // or any toast library you use
import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  withCredentials: true, // THIS IS IMPORTANT for cookies/sessions!
  headers: {
    "Content-Type": "application/json",
  },
});

const useAppointments = (doctorId) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const res = await API.get("/doctor/appointments"); // assuming this route is protected with doctor auth
      setAppointments(res.data.appointments);
    } catch (err) {
      console.error("Failed to fetch appointments:", err);
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await API.put(`/doctor/appointment/${id}`, { status });
      toast.success("Status updated successfully");
      fetchAppointments(); // refresh
    } catch (err) {
      toast.error("Could not update status");
    }
  };

  useEffect(() => {
    if (doctorId) fetchAppointments();
  }, [doctorId]);

  return {
    appointments,
    loading,
    updateStatus,
  };
};

export default useAppointments;
