"use client"
import {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    if (!authChecked) {
      checkAuth();
    }
  }, [authChecked]);

  const checkAuth = async () => {
    if (authChecked) return; // Prevent multiple checks
    
    setLoading(true);
    try {
        const response = await axios.get("http://localhost:5000/api/auth/me", {
            withCredentials: true,
        });
        console.log("Set User response: ", response.data);
        setUser(response.data);
    } catch (error) {
        if (error.response?.status === 401) {
          console.warn("Guest user detected — skipping auth");
          setUser(null);
        }        
    } finally {
        setLoading(false);
        setAuthChecked(true);
    }
  };

  return(
    <AuthContext.Provider value={{ user, loading, checkAuth, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);
