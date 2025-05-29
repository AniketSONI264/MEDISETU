import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getDoctorById } from "@/utils/api";

export const useAppointmentData = () => {
  const searchParams = useSearchParams();
  const [appointmentData, setAppointmentData] = useState(null);
  const [doctorData, setDoctorData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = searchParams.get("data");
        if (data) {
          const decodedData = JSON.parse(decodeURIComponent(data));
          setAppointmentData(decodedData);
          if (decodedData.doctorId) {
            const res = await getDoctorById(decodedData.doctorId);
            setDoctorData(res.data);
          }
        }
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchParams]);

  return { appointmentData, doctorData, loading };
};