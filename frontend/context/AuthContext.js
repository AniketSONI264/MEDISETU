// "use client";

// import { createContext, useContext, useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const router = useRouter();

//   const getUserFromStorage = () => {
//     if (typeof window !== "undefined") {
//       const token = localStorage.getItem("token");
//       const userData = localStorage.getItem("user");
//       return token && userData ? JSON.parse(userData) : null;
//     }
//     return null;
//   };

//   const [user, setUser] = useState(getUserFromStorage());

//   useEffect(() => {
//     const syncAuthState = () => setUser(getUserFromStorage());
//     window.addEventListener("storage", syncAuthState);
//     return () => window.removeEventListener("storage", syncAuthState);
//   }, []);

//   const login = (userData) => {
//     localStorage.setItem("token", userData.token);
//     localStorage.setItem("user", JSON.stringify(userData));
//     setUser(userData);
//     window.dispatchEvent(new Event("storage"));
//     router.push("/profile"); // Redirect to profile after login
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setUser(null);
//     window.dispatchEvent(new Event("storage"));
//     router.push("/login"); // Redirect to login after logout
//   };

//   return (
//     <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);


"use client"
import {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
  const [user,setUser ] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    checkAuth();
  },[]);

  const checkAuth = async () => {
    setLoading(true);
    try {
        const response = await axios.get("http://localhost:5000/api/auth/me", {
            withCredentials: true,
        });
        console.log("Set User response: ", response.data);
        setUser(response.data);
    } catch (error) {
        console.error("Auth check failed", error);
        setUser(null);
    } finally {
        setLoading(false);
    }
};
  return(

    <AuthContext.Provider value = {{user,loading,checkAuth}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);


// "use client";
// import { createContext, useContext, useState, useEffect } from "react";
// import axios from "axios";

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     checkAuth();
//   }, []);

//   const checkAuth = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get("http://localhost:5000/api/auth/me", {
//         withCredentials: true,
//       });
//       console.log("User data:", response.data.user);
//       setUser(response.data.user); // ✅ Corrected this line
//     } catch (error) {
//       console.error("Auth check failed", error);
//       setUser(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ user, loading, checkAuth }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   return useContext(AuthContext);
// }
