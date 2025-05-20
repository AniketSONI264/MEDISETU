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


"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
// import NavDrawer from "@/components/doctorNavDrawer/navDrawer";
import NavDrawer from "@/components/navDrawer"; //
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LayoutClient({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user?.role !== "doctor") {
      router.push("/");
    }
  }, [user, loading]);

  if (loading) return <p className="text-center mt-10">Loading Doctor Dashboard...</p>;

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <NavDrawer role="doctor"> {/* 🧠 Pass the role here */}
        <main className="flex-1 p-6">{children}</main>
      </NavDrawer>
    </>
  );
}
