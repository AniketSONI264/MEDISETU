"use client"; 

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RazorPay from "@/components/RazorPay.jsx"
export default function LayoutClient({ children }) {
  const pathname = usePathname();
  const isDocRoute = pathname?.startsWith("/doctor");
  const isAdminRoute = pathname?.startsWith("/admin");
  const isUserRoute = pathname?.startsWith("/user");

  return (
    <>
    <RazorPay />
      {!isDocRoute && !isAdminRoute && <Navbar />} 
      {/* <Navbar /> */}
      <ToastContainer position="top-right" autoClose={3000} />
      <main className="container mx-auto lg:p-6 sm:px-0">{children}</main>
      {/* <main className="px-0 -ml-10 -mr-4">{children}</main> */}

      {!isDocRoute && !isAdminRoute && <Footer />} 
      {/* <Footer /> */}
    </>
  );
}
