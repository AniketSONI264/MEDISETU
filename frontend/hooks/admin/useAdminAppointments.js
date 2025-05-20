// // hooks/admin/useAdminAppointments.js
// import { useEffect, useState } from "react";
// import API from "@/utils/api";

// const useAdminAppointments = () => {
//   const [appointments, setAppointments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchAppointments = async () => {
//     try {
//       const res = await API.get("/admin/appointments");
//       setAppointments(res.data.appointments || []);
//     } catch (err) {
//       setError(err?.response?.data?.message || "Failed to fetch appointments.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAppointments();
//   }, []);

//   return { appointments, loading, error, refetch: fetchAppointments };
// };

// export default useAdminAppointments;






// hooks/admin/useAdminAppointments.js
import { useEffect, useState, useMemo } from "react";
import API from "@/utils/api";

const useAdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all"); // e.g. 'all', 'pending', 'completed', etc.

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const res = await API.get("/admin/appointments");
      setAppointments(res.data.appointments || []);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to fetch appointments.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Logic for search + filter
  const filteredAppointments = useMemo(() => {
    return appointments.filter((appt) => {
      const matchesSearch =
        appt.patientName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        appt.doctorName?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFilter =
        filter === "all" || appt.status?.toLowerCase() === filter.toLowerCase();

      return matchesSearch && matchesFilter;
    });
  }, [appointments, searchQuery, filter]);

  return {
    appointments,
    filteredAppointments,
    loading,
    error,
    refetch: fetchAppointments,
    searchQuery,
    setSearchQuery,
    filter,
    setFilter,
  };
};

export default useAdminAppointments;
