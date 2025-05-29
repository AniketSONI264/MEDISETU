import { useState, useEffect } from "react";
import { getPatients } from "@/utils/api";

const usePatients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPatients = async () => {
    setLoading(true);
    try {
      const res = await getPatients();
      setPatients(res.data.patients || []);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to fetch patients");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return { patients, loading, error, refetch: fetchPatients };
};

export default usePatients;
