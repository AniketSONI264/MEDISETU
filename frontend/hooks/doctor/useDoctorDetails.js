import { useState, useEffect } from "react";
import { getDoctorBySlug, getDoctorById } from "@/utils/api";

const useDoctorDetails = (slugOrId) => {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDetails = async () => {
    if (!slugOrId) return;
    setLoading(true);
    try {
      const res = slugOrId.includes("-")
        ? await getDoctorBySlug(slugOrId)
        : await getDoctorById(slugOrId);
      setDoctor(res.data.doctor || null);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to fetch doctor details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [slugOrId]);

  return { doctor, loading, error, refetch: fetchDetails };
};

export default useDoctorDetails;
