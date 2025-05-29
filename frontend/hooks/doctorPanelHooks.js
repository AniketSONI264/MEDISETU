// import { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// import {
//   getDoctor,
//   getDoctorProfile,
//   updateDoctorProfile,
//   getDoctorAppointments,
//   updateAppointmentStatus,
//   uploadPrescription,
//   getPatients,
//   getEarnings,
//   getAllDoctors,
//   getDoctorById,

// } from "@/utils/api";

// // 🔐 AUTH HOOK
// export const useDoctorAuthStatus = () => {
//   const [doctor, setDoctor] = useState(null);
//   const [loggedIn, setLoggedIn] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     getDoctor()
//       .then(({ data }) => {
//         setDoctor(data.user);
//         setLoggedIn(data.loggedIn);
//       })
//       .catch(() => setLoggedIn(false))
//       .finally(() => setLoading(false));
//   }, []);

//   return { doctor, loggedIn, loading };
// };

// // 🧑‍⚕️ PROFILE HOOK
// export const useDoctorProfile = () => {
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const fetchProfile = async () => {
//     try {
//       const res = await getDoctorProfile();
//       setProfile(res.data);
//     } catch (err) {
//       console.error("Error loading profile", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateProfile = async (data) => {
//     const res = await updateDoctorProfile(data);
//     setProfile(res.data);
//     return res;
//   };

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   return { profile, loading, updateProfile };
// };

// // 📆 APPOINTMENTS HOOK
// export const useDoctorAppointments = () => {
//   const [appointments, setAppointments] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchAppointments = async () => {
//     try {
//       const res = await getDoctorAppointments();
//       console.log("res.data", res.data);
//       setAppointments(res.data);
//     } catch (err) {
//       console.error("Failed to fetch appointments");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateStatus = async (appointmentId, status) => {
//     const res = await updateAppointmentStatus(appointmentId, status);
//     await fetchAppointments(); // re-fetch after update
//     console.log("res", res);
//     return res;
//   };

//   useEffect(() => {
//     fetchAppointments();
//   }, []);

//   return { appointments, loading, updateStatus };
// };

// // 💊 PRESCRIPTION HOOK
// export const useUploadPrescription = () => {
//   const [loading, setLoading] = useState(false);

//   const upload = async (appointmentId, file) => {
//     setLoading(true);
//     try {
//       const res = await uploadPrescription(appointmentId, file);
//       return res.data;
//     } catch (err) {
//       console.error("Prescription upload failed");
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { upload, loading };
// };

// // 👥 PATIENTS HOOK
// export const useDoctorPatients = () => {
//   const [patients, setPatients] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     getPatients()
//       .then((res) => setPatients(res.data))
//       .catch((err) => console.error("Failed to load patients"))
//       .finally(() => setLoading(false));
//   }, []);

//   return { patients, loading };
// };

// // 💸 EARNINGS HOOK
// export const useDoctorEarnings = () => {
//   const [earnings, setEarnings] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     getEarnings()
//       .then((res) => setEarnings(res.data))
//       .catch((err) => console.error("Failed to load earnings"))
//       .finally(() => setLoading(false));
//   }, []);

//   return { earnings, loading };
// };

// // 🌍 PUBLIC DOCTOR LIST HOOK
// export const usePublicDoctors = () => {
//   const [doctors, setDoctors] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     getAllDoctors()
//       .then((res) => setDoctors(res.data))
//       .catch((err) => console.error("Failed to load doctors"))
//       .finally(() => setLoading(false));
//   }, []);

//   return { doctors, loading };
// };

// // 🔍 SINGLE DOCTOR HOOK
// export const useSingleDoctor = (id) => {
//   const [doctor, setDoctor] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!id) return;
//     getDoctorById(id)
//       .then((res) => setDoctor(res.data))
//       .catch((err) => console.error("Failed to load doctor"))
//       .finally(() => setLoading(false));
//   }, [id]);

//   return { doctor, loading };
// };




// /src/hooks/useDoctorApi.js
"use client"; 
import { useState, useEffect } from "react";
import {
  
  logoutDoctor,
  getDoctor,
  getDoctorProfile,
  updateDoctorProfile,
  getAllDoctors,
  getDoctorBySlug,
  getDoctorById,
  getDoctorAppointments,
  updateAppointmentStatus,
  uploadPrescription,
  getPatients,
  getEarnings
} from "@/utils/api";

export const useDoctorAuth = () => {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDoctor = async () => {
    setLoading(true);
    try {
      const res = await getDoctor();
      setDoctor(res.data.doctor);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctor(); // Auto fetch on mount
  }, []);



  const logout = async () => {
    try {
      await logoutDoctor();
      setDoctor(null);
    } catch (err) {
      console.error("Logout failed", err);
    }
  };



  return {
    doctor,
    loading,
    error,
    login,
    logout,
    register,
    refreshDoctor: fetchDoctor,
  };
};

export const useDoctorProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await getDoctorProfile();
      setProfile(res.data.profile);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (data) => {
    return await updateDoctorProfile(data);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return {
    profile,
    loading,
    updateProfile,
  };
};

export const useAppointments = (doctorId) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAppointments = async () => {
    setLoading(true);
    const res = await getDoctorAppointments(doctorId);
    if (res.success) setAppointments(res.data);
    setLoading(false);
  };

  const updateStatus = async (appointmentId, status) => {
    return await updateAppointmentStatus(appointmentId, status);
  };

  const uploadRx = async (appointmentId, file) => {
    return await uploadPrescription(appointmentId, file);
  };

  useEffect(() => {
    if (doctorId) fetchAppointments();
  }, [doctorId]);

  return {
    appointments,
    loading,
    updateStatus,
    uploadPrescription: uploadRx,
  };
};

export const useDoctorsList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const res = await getAllDoctors();
      setDoctors(res.data.doctors);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return { doctors, loading };
};

export const useDoctorDetails = (slugOrId) => {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDoctorDetails = async () => {
    setLoading(true);
    try {
      const res = slugOrId.includes("-")
        ? await getDoctorBySlug(slugOrId)
        : await getDoctorById(slugOrId);
      setDoctor(res.data.doctor);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slugOrId) fetchDoctorDetails();
  }, [slugOrId]);

  return { doctor, loading };
};

export const usePatients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPatients = async () => {
    setLoading(true);
    const res = await getPatients();
    setPatients(res.data.patients);
    setLoading(false);
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return { patients, loading };
};

export const useEarnings = () => {
  const [earnings, setEarnings] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchEarnings = async () => {
    setLoading(true);
    const res = await getEarnings();
    setEarnings(res.data.earnings);
    setLoading(false);
  };

  useEffect(() => {
    fetchEarnings();
  }, []);

  return { earnings, loading };
};
