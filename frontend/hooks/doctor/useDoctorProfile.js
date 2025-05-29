import { useState, useEffect } from "react";
import { getDoctorProfile, updateDoctorProfile } from "@/utils/api";

const useDoctorProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await getDoctorProfile();
      setProfile(res.data.profile || null);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to fetch profile");
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

  return { profile, loading, error, updateProfile, refetch: fetchProfile };
};

export default useDoctorProfile;
