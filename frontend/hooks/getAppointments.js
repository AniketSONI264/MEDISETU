import { useEffect, useState } from "react";
import { getUserAppointments } from "@/utils/api";

export const useUserAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchAppointments = async () => {
      try {
        const res = await getUserAppointments(); // this hits `/appointments/user`
        if (isMounted) {
          setAppointments(res.data?.appointments || []);
        }
      } catch (err) {
        if (isMounted) {
          setError("Could not fetch appointments");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchAppointments();
    return () => {
      isMounted = false;
    };
  }, []);

  return { appointments, loading, error };
};
