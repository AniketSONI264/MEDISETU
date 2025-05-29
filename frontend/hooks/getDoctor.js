// // hooks/useUser.js
// import { useEffect, useState } from "react";
// import { getDoctor } from "../utils/api.js"; // Assuming your API logic is here

// export const useUser = () => {
//   const [doctor, setDoctor] = useState(null);

//   useEffect(() => {
//     const fetchDoctor = async () => {
//       try {
//         const res = await getDoctor(); // API.get("/auth/me")
//         setDoctor(res.data);
//       } catch (err) {
//         console.error("Failed to fetch Doctor", err);
//       }
//     };

//     fetchDoctor();
//   }, []);

//   return doctor;
// };


// // src/hooks/useDoctorAuth.js
// import { useState, useEffect } from "react";
// import axios from "axios";

// const useDoctorAuth = () => {
//   const [isAuth, setIsAuth] = useState(null); // null → loading
//   const [error, setError] = useState(null);   // optional

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/doctor/auth/status`, {
//           withCredentials: true,
//         });
//         setIsAuth(res.data.loggedIn); // true / false
//       } catch (err) {
//         setError("Authentication failed.");
//         setIsAuth(false); // fallback
//       }
//     };

//     checkAuth();
//   }, []);

//   return { isAuth, error };
// };

// export default useDoctorAuth;


// // hooks/useDoctorAuth.js
// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function useDoctorAuth() {
//   const [isAuth, setIsAuth] = useState(null); // null = loading
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/doctor/auth/status", {
//           withCredentials: true,
//         });
//         setIsAuth(res.data.loggedIn); // Expecting true/false
//       } catch (err) {
//         setIsAuth(false);
//         setError(err?.response?.data?.message || "Auth check failed");
//       }
//     };

//     checkAuth();
//   }, []);

//   return { isAuth, error };
// }





// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function useDoctorAuth() {
//   const [isAuth, setIsAuth] = useState(null); // null = loading
//   const [doctor, setDoctor] = useState(null); // holds all doctor details
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/doctor/auth/status", {
//           withCredentials: true,
//         });

//         // Assuming backend returns something like:
//         // { loggedIn: true, doctor: { _id, name, email, ... } }
//         const { loggedIn, doctor } = res.data;

//         setIsAuth(loggedIn);
//         setDoctor(doctor || null);
//       } catch (err) {
//         setIsAuth(false);
//         setError(err?.response?.data?.message || "Auth check failed");
//         setDoctor(null);
//       }
//     };

//     checkAuth();
//   }, []);

//   return { isAuth, doctor, error };
// }






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
