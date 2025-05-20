"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import {
  Menu, X, Home, CalendarCheck, User, Video,
  MessageSquare, LogOut, Stethoscope, ClipboardList,
  ShieldCheck, Settings
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import{ logoutDoctor} from "../utils/api.js"
import {useAuth } from "../context/AuthContext.js"
import {useRouter} from "next/navigation";
import {useUser} from "../hooks/getUser.js"        
import toast from "react-hot-toast";

// 🧠 Role-based menu config
const menusByRole = {
  doctor: [
    { label: "Dashboard", icon: Home, href: "/doctor" },
    { label: "Appointments", icon: CalendarCheck, href: "/doctor/appointments" },
    { label: "Patients", icon: User, href: "/doctor/patients" },
    { label: "Profile", icon: ClipboardList, href: "/doctor/profile" },
    { label: "Chat", icon: MessageSquare, href: "/doctor/chat" },
    { label: "Video Call", icon: Video, href: "/doctor/video" },
  ],
  admin: [
    { label: "Admin Panel", icon: ShieldCheck, href: "/admin" },
    { label: "Manage Doctors", icon: User, href: "/admin/doctors" },
    { label: "Manage Users", icon: User, href: "/admin/users" },
    { label: "Settings", icon: Settings, href: "/admin/settings" },
  ],
  user: [
    { label: "Home", icon: Home, href: "/patient" },
    { label: "My Appointments", icon: CalendarCheck, href: "/patient/appointments" },
    { label: "Chat with Doctor", icon: MessageSquare, href: "/patient/chat" },
    { label: "Video Consultation", icon: Video, href: "/patient/video" },
  ],
};



export default function NavDrawer({ role = "doctor" }) {

  const user = useUser();
  const profilePic = user?.profilePic || "/MediSetu_Logo_W100.svg";
  const [isOpen, setIsOpen] = useState(true);
  const { setUser} = useAuth();
  const router = useRouter();
  const closeDrawer = () => {
    if (window.innerWidth < 768) setIsOpen(false);
  };
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (isOpen && !e.target.closest("aside")) setIsOpen(false);
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [isOpen]);

  const navItems = menusByRole[role] || []; 

   const handleLogout = async () => {
      try {
        await logoutDoctor();
        router.push("/");
        toast.success("Logged out successfully!");
      } catch (error) {
        console.error("Logout failed", error);
        toast.error("Failed to logout. Try again!");
      }
    };
  // const handleLogout = async () => {
  //   try {
  //     setIsLoggingOut(true);
  //     toast.loading("Logging out...", { id: "logout" });
  
  //     await logoutDoctor();
  //       setTimeout(() => {
  //       router.push("/doctor");
  //     }, 500);
  
  //     toast.success("Logged out successfully!", { id: "logout" });
  //   } catch (error) {
  //     console.error("Logout failed ❌", error);
  //     toast.error("Oops! Failed to logout. Please try again.", { id: "logout" });
  //   } finally {
  //     setIsLoggingOut(false);
  //   }
  // };

  
  
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: 0 }}
        animate={{ x: isOpen ? 0 : -275 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="fixed inset-y-0 left-0 w-70 bg-gradient-to-b from-teal-800 to-teal-600 text-white p-10 pt-20 shadow-xl flex flex-col space-y-8 z-40 h-full"
      >
        <div className="w-full flex justify-center items-center pt-6 animate-fade-in">
          <div className="w-20 h-20 md:w-24 md:h-24 relative">
            <Image
              src={profilePic}
              alt="Profile"
              fill
              className="rounded-full object-contain border-2 border-yellow-400 shadow-md"
            />
          </div>
        </div>

        <nav>
          {/* <ul className="space-y-6"> */}
          <ul className="space-y-4 sm:space-y-5 md:space-y-6">
            {navItems.map(({ label, icon: Icon, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  onClick={closeDrawer}
                  className="flex items-center gap-3 p-4 rounded-lg bg-teal-700 hover:bg-teal-500 transition-all shadow-md whitespace-nowrap w-full"
                >
                  <motion.div
                    animate={{ rotate: [-10, 10, -10] }}
                    transition={{ repeat: Infinity, duration: 0.5, ease: "easeInOut" }}
                    whileHover={{ scale: 1.05 }}
                    className="w-5 h-5 text-white"
                  >
                    <Icon />
                  </motion.div>
                  <span className="truncate">{label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </motion.aside>

      {/* Top Navbar */}
    <div className="flex-grow">
        <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-teal-700 to-teal-500 shadow-lg py-4 px-6 flex justify-between items-center z-50 text-white">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 bg-white text-teal-600 rounded-lg shadow-xl hover:bg-gray-200 transition-all md:p-3"
          >
            {isOpen ? (
              <motion.div
                animate={{ rotate: [-10, 10, -10] }}
                transition={{ repeat: Infinity, duration: 0.5, ease: "easeInOut" }}
                whileHover={{ scale: 1.05 }}
                className="w-6 h-6 text-teal-600"
              >
                <X />
              </motion.div>
            ) : (
              <motion.div
                animate={{ rotate: [-10, 10, -10] }}
                transition={{ repeat: Infinity, duration: 0.5, ease: "easeInOut" }}
                whileHover={{ scale: 1.05 }}
                className="w-6 h-6 text-teal-600"
              >
                <Menu />
              </motion.div>
            )}
          </button>

         <div className="flex items-center gap-2 font-extrabold text-white tracking-wide">
  <motion.div
    animate={{ rotate: [-15, 15, -15] }}
    transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
    whileHover={{ scale: 1.2 }}
    className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-teal-300 drop-shadow-lg"
  >
    <Stethoscope  className="w-full h-full"/>
  </motion.div>
<Link href="/" passHref legacyBehavior>
  <motion.h1
    initial={{ scale: 0.95 }}
    animate={{ scale: [0.95, 1, 0.95] }}
    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
    whileHover={{ scale: 1.05 }}
     className="cursor-pointer text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-teal-300 drop-shadow-lg"
  >
    MEDISETU
  </motion.h1>
  </Link>
</div>

          <div className="flex items-center gap-4 md:gap-2">
  {/* Home Button */}
  <Link
    href={`/${role}`}
    onClick={closeDrawer}
    className="group relative overflow-hidden rounded-xl shadow-2xl transition-transform transform hover:scale-105 bg-gradient-to-r from-emerald-400 to-cyan-500 text-white px-4 py-2 flex items-center gap-2 md:px-3 md:py-2"
  >
    <motion.div
      animate={{ rotate: [-10, 10, -10] }}
      transition={{ repeat: Infinity, duration: 0.5, ease: "easeInOut" }}
      whileHover={{ scale: 1.2 }}
      className="w-6 h-6 text-white drop-shadow-md"
    >
      <Home />
    </motion.div>
    <span className="hidden md:inline font-semibold tracking-wide">Home</span>
  </Link>

  {/* Logout Button */}
  <button
    onClick={handleLogout}
    className="group relative overflow-hidden rounded-xl shadow-2xl transition-transform transform hover:scale-105 bg-gradient-to-r from-rose-500 via-red-500 to-pink-500 text-white px-4 py-2 flex items-center gap-2 md:px-3 md:py-2"
  >
    <motion.div
      animate={{ rotate: [-10, 10, -10] }}
      transition={{ repeat: Infinity, duration: 0.5, ease: "easeInOut" }}
      whileHover={{ scale: 1.2 }}
      className="w-6 h-6 text-white drop-shadow-md"
    >
      <LogOut />
    </motion.div>
    <span className="hidden md:inline font-semibold tracking-wide">Logout</span>
  </button>
</div>

        </header>
      </div> 
      </div>
  );
}