import { useState, useEffect } from "react";
import { getAllDoctors } from "@/utils/api";

const useDoctorsList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const res = await getAllDoctors();
      setDoctors(res.data.doctors || []);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to fetch doctors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return { doctors, loading, error, refetch: fetchDoctors };
};

export default useDoctorsList;
