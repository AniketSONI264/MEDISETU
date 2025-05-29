
import { useEffect, useState } from "react";
import { getDoctor } from "../utils/api"; // Adjust the path if needed

export default function useDoctorAuth() {
  const [isAuth, setIsAuth] = useState(null); // null = loading
  const [doctor, setDoctor] = useState(null); // holds all doctor details
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await getDoctor(); // Using wrapped API call now
        const { loggedIn, user } = res.data;
        // console.log("Details of the user :",user);
        setIsAuth(loggedIn);
        setDoctor(user || null);
      } catch (err) {
        setIsAuth(false);
        setError(err?.response?.data?.message || "Auth check failed");
        setDoctor(null);
      }
    };

    checkAuth();
  }, []);

  return { isAuth, doctor, error };
}
