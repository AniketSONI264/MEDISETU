 



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
