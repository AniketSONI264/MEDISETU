// // hooks/admin/useAdminDoctors.js
// import { useEffect, useState } from "react";
// import API from "@/utils/api";

// const useAdminDoctors = () => {
//   const [doctors, setDoctors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchDoctors = async () => {
//     try {
//       const res = await API.get("/admin/doctors");
//       setDoctors(res.data.doctors || []);
//     } catch (err) {
//       setError(err?.response?.data?.message || "Failed to fetch doctors.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDoctors();
//   }, []);

//   return { doctors, loading, error, refetch: fetchDoctors };
// };

// export default useAdminDoctors;






// import { useEffect, useState } from "react";
// import API from "@/utils/api";

// const useAdminDoctors = () => {
//   const [doctors, setDoctors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch the list of doctors
//   const fetchDoctors = async () => {
//     try {
//       const res = await API.get("/admin/doctors");
//       setDoctors(res.data.doctors || []);
//     } catch (err) {
//       setError(err?.response?.data?.message || "Failed to fetch doctors.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Verify doctor by ID and status
//   const verifyDoctor = async (id, isVerified) => {
//     try {
//       setLoading(true);
//       const res = await API.put(`/admin/doctors/${id}/verify`, { isVerified });
//       // After successful verification, refetch the list of doctors
//       fetchDoctors();
//       return res.data; // Return the response (success message or data)
//     } catch (err) {
//       setError(err?.response?.data?.message || "Failed to verify doctor.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDoctors();
//   }, []);

//   return { doctors, loading, error, refetch: fetchDoctors, verifyDoctor };
// };

// export default useAdminDoctors;



import { useEffect, useState } from "react";
import API from "@/utils/api";

const useAdminDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch doctors from API
  const fetchDoctors = async () => {
    try {
      const res = await API.get("/admin/doctors");
      setDoctors(res.data.doctors || []);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to fetch doctors.");
    } finally {
      setLoading(false);
    }
  };

  // Toggle verification
  const toggleVerification = async (id, currentStatus) => {
    try {
      setLoading(true);
      const res = await API.put(`/admin/doctors/${id}/verify`, {
        isVerified: !currentStatus, // toggle value
      });

      // Update the local state immediately instead of full refetch
      setDoctors(prev =>
        prev.map(doc =>
          doc._id === id ? { ...doc, isVerified: !currentStatus } : doc
        )
      );

      return res.data;
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to toggle verification.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return {
    doctors,
    loading,
    error,
    refetch: fetchDoctors,
    toggleVerification,
  };
};

export default useAdminDoctors;
