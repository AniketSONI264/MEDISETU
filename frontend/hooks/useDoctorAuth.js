import { useState, useEffect } from "react";
import { getDoctor, logoutDoctor } from "@/utils/api";

const useDoctorAuth = () => {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDoctor = async () => {
    setLoading(true);
    try {
      const res = await getDoctor();
      setDoctor(res.data.doctor || null);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to fetch doctor");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctor();
  }, []);

  const logout = async () => {
    try {
      await logoutDoctor();
      setDoctor(null);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return { doctor, loading, error, logout, refetch: fetchDoctor };
};

export default useDoctorAuth;
