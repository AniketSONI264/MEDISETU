import { useState, useEffect } from "react";
import { getEarnings } from "@/utils/api";

const useEarnings = () => {
  const [earnings, setEarnings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEarnings = async () => {
    setLoading(true);
    try {
      const res = await getEarnings();
      setEarnings(res.data.earnings || 0);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to fetch earnings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEarnings();
  }, []);

  return { earnings, loading, error, refetch: fetchEarnings };
};

export default useEarnings;
