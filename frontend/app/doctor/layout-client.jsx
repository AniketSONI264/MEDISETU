// // app/doctor/layout-client.jsx

// "use client"; // 🔥 Required for useEffect, useRouter, etc.

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useAuth } from "@/context/AuthContext";
// import NavDrawer from "@/components/doctorNavDrawer/navDrawer";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function LayoutClient({ children }) {
//   const { user, loading } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (!loading && user?.role !== "doctor") {
//       router.push("/");
//     }
//   }, [user, loading]);

//   if (loading) return <p className="text-center mt-10">Loading Doctor Dashboard...</p>;

//   return (
//     <>
//       <ToastContainer position="top-right" autoClose={3000} />
//       <NavDrawer role="doctor">
//         <main className="flex-1 p-6">{children}</main>
//       </NavDrawer>
//     </>
//   );
// }


// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useAuth } from "@/context/AuthContext";
// // import NavDrawer from "@/components/doctorNavDrawer/navDrawer";
// import NavDrawer from "@/components/navDrawer"; //
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import AuthPage from "@/components/login&signUp/authPage.jsx"

// export default function LayoutClient({ children }) {
//   const { user, loading } = useAuth();
//   const router = useRouter();

//   // useEffect(() => {
//   //   if (!loading && user?.role !== "doctor") {
//   //     router.push("/");
//   //   }
//   // }, [user, loading]);
//   if (!user || user?.role !== "doctor") {
//     return <AuthPage message="Only verified doctors can access this page." />;
//   }

//   if (loading) return <p className="text-center mt-10">Loading Doctor Dashboard...</p>;

//   return (
//     <>
//       <ToastContainer position="top-right" autoClose={3000} />
//       <NavDrawer role="doctor"> {/* 🧠 Pass the role here */}
//         <main className="flex-1 p-6">{children}</main>
//       </NavDrawer>
//     </>
//   );
// }

// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useAuth } from "@/context/AuthContext";
// import NavDrawer from "@/components/navDrawer";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import AuthPage from "@/components/login&signUp/authPage.jsx";

// export default function LayoutClient({ children }) {
//   const { user, loading } = useAuth();
//   const router = useRouter();
//   const [hasToken, setHasToken] = useState(null);

//   // ✅ Check for DocToken in cookies
//   useEffect(() => {
//     const cookies = document.cookie
//       .split("; ")
//       .find((row) => row.startsWith("DocToken="));
    
//     setHasToken(!!cookies); // true if found, false otherwise
//   }, []);

//   // 🌀 Still checking token or loading auth context
//   if (hasToken === null || loading) {
//     return <p className="text-center mt-10">Loading Doctor Dashboard...</p>;
//   }

//   // ❌ No token or invalid user
//   if (!hasToken || !user || user?.role !== "doctor") {
//     return <AuthPage message="Only verified doctors can access this page." />;
//   }

//   // ✅ Verified and token present
//   return (
//     <>
//       <ToastContainer position="top-right" autoClose={3000} />
//       <NavDrawer role="doctor">
//         <main className="flex-1 p-6">{children}</main>
//       </NavDrawer>
//     </>
//   );
// }





// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { isDoctorAuthenticated } from "@/utils/checkDocAuth"; // 🔥 reusable!
// import AuthPage from "@/components/login&signUp/authPage";
// import NavDrawer from "@/components/navDrawer";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function LayoutClient({ children }) {
//   const router = useRouter();
//   const [isAuth, setIsAuth] = useState(null);

//   useEffect(() => {
//     const checkAuth = () => {
//       const authenticated = isDoctorAuthenticated();
//       setIsAuth(authenticated);
//     };

//     checkAuth();
//   }, []);

//   // Still verifying or loading stuff
//   if (isAuth === null) {
//     return <p className="text-center mt-10">Checking authentication...</p>; // or a fancy loader
//   }

//   // Not authenticated
//   if (!isAuth) {
//     return <AuthPage message="Only verified doctors can access this page." />;
//   }

//   // Authenticated and token present
//   return (
//     <>
//       <ToastContainer position="top-right" autoClose={3000} />
//       <NavDrawer role="doctor">
//         <main className="flex-1 p-6">{children}</main>
//       </NavDrawer>
//     </>
//   );
// }







// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import AuthPage from "@/components/login&signUp/authPage";
// import NavDrawer from "@/components/navDrawer";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";

// export default function LayoutClient({ children }) {
//   const router = useRouter();
//   const [isAuth, setIsAuth] = useState(null); // null = loading, false = not logged in, true = logged in

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/doctor/auth/status", {
//           withCredentials: true, // so the cookie goes with the request
//         });
//         setIsAuth(res.data.loggedIn); // true or false from backend
//       } catch (err) {
//         console.error("Auth check failed:", err.message);
//         setIsAuth(false);
//       }
//     };

//     checkAuth();
//   }, []);

//   if (isAuth === null) {
//     return <p className="text-center mt-10">Checking authentication...</p>;
//   }

//   if (!isAuth) {
//     return <AuthPage message="Only verified doctors can access this page." />;
//   }

//   return (
//     <>
//       <ToastContainer position="top-right" autoClose={3000} />
//       <NavDrawer role="doctor">
//         <main className="flex-1 p-6">{children}</main>
//       </NavDrawer>
//     </>
//   );
// }



"use client";

import useDoctorAuth from "@/hooks/getDoctor";
import AuthPage from "@/components/login&signUp/authPage";
import NavDrawer from "@/components/navDrawer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function LayoutClient({ children }) {
  const { isAuth, error } = useDoctorAuth();

  if (isAuth === null) {
    // return <p className="text-center mt-10">Checking authentication...</p>;
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-teal-50 to-white text-teal-700">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="flex flex-col items-center gap-4"
        >
          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <Loader2 className="w-12 h-12 text-teal-600" />
          </motion.div>
  
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-lg font-semibold"
          >
            Checking authentication...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  if (!isAuth) {
    return <AuthPage message="Only verified doctors can access this page." />;
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <NavDrawer role="doctor">
        <main className="flex-1 p-6">{children}</main>
      </NavDrawer>
    </>
  );
}
