// import { useState, useEffect } from "react";
// import { getDoctorAppointments, updateAppointmentStatus, uploadPrescription } from "@/utils/api";

// const useAppointments = (doctorId) => {
//   const [appointments, setAppointments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchAppointments = async () => {
//     if (!doctorId) return;
//     setLoading(true);
//     try {
//       const res = await getDoctorAppointments(doctorId);
//       setAppointments(res.data || []);
//     } catch (err) {
//       setError(err?.response?.data?.message || "Failed to fetch appointments");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAppointments();
//   }, [doctorId]);

//   const updateStatus = async (appointmentId, status) => {
//     return await updateAppointmentStatus(appointmentId, status);
//   };

//   const uploadRx = async (appointmentId, file) => {
//     return await uploadPrescription(appointmentId, file);
//   };

//   return {
//     appointments,
//     loading,
//     error,
//     updateStatus,
//     uploadPrescription: uploadRx,
//     refetch: fetchAppointments
//   };
// };

// export default useAppointments;





// import { useState, useEffect } from "react";
// import API from "@/utils/api.js";

// const useAppointments = (doctorId) => {
//   const [appointments, setAppointments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchAppointments = async () => {
//     if (!doctorId) return;
//     setLoading(true);
//     try {
//       const res = await API.get(`/doctor/auth/appointments/${doctorId}`);
//       // const res = await API.get(`/appointments/${doctorId}`);
//       setAppointments(res.data || []);
//     } catch (err) {
//       setError(err?.response?.data?.message || "Failed to fetch appointments");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAppointments();
//   }, [doctorId]);

//   const updateStatus = async (appointmentId, status) => {
//     try {
//       const res = await API.patch(`/appointments/${appointmentId}/status`, {
//         status,
//       });
//       return res.data;
//     } catch (err) {
//       throw new Error(
//         err?.response?.data?.message || "Failed to update appointment status"
//       );
//     }
//   };

//   const uploadRx = async (appointmentId, file) => {
//     try {
//       const formData = new FormData();
//       formData.append("prescription", file);

//       const res = await API.post(
//         `/appointments/${appointmentId}/upload-prescription`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       return res.data;
//     } catch (err) {
//       throw new Error(
//         err?.response?.data?.message || "Failed to upload prescription"
//       );
//     }
//   };

//   return {
//     appointments,
//     loading,
//     error,
//     updateStatus,
//     uploadPrescription: uploadRx,
//     refetch: fetchAppointments,
//   };
// };

// export default useAppointments;







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
