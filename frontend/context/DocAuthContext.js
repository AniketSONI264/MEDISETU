"use client"
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// Create the Doctor Auth Context
const DocAuthContext = createContext();

export const DocAuthProvider = ({ children }) => {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tokenExists = document.cookie.includes("DocToken"); 
    if (tokenExists) {
      checkDocAuth();  // If the token exists, check the doctor authentication
    } else {
      setLoading(false);  // No token, no need to check
    }
  }, []);

  // Function to check doctor authentication using DocToken
  const checkDocAuth = async () => {
    setLoading(true);
    try {
      // Make an API call to check doctor authentication status
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/doctor/auth/status`, {
        withCredentials: true,  // Make sure to include cookies (DocToken)
      });
      console.log("Doctor Auth check response: ", response.data);
      setDoctor(response.data);
    } catch (error) {
      // Handle authentication failure
      console.error("Doctor authentication check failed", error);
      setDoctor(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DocAuthContext.Provider value={{ doctor, loading, checkDocAuth }}>
      {children}
    </DocAuthContext.Provider>
  );
};

export const useDocAuth = () => useContext(DocAuthContext);
