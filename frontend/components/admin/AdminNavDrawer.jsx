"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  Menu,
  X,
  Home,
  Users,
  Calendar,
  Settings,
  FileText,
  CreditCard,
  LogOut,
  ShieldCheck,
  Stethoscope
} from "lucide-react";

const navItems = [
  {
    label: "Dashboard",
    icon: Home,
    href: "/admin/dashboard"
  },
  {
    label: "Doctors",
    icon: Users,
    href: "/admin/doctors"
  },
  {
    label: "Appointments",
    icon: Calendar,
    href: "/admin/appointments"
  },
  {
    label: "Users",
    icon: Users,
    href: "/admin/users"
  },
  {
    label: "Blogs",
    icon: FileText,
    href: "/admin/blogs"
  },
  {
    label: "Transactions",
    icon: CreditCard,
    href: "/admin/transactions"
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/admin/settings"
  }
];

export default function AdminNavDrawer({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  const { user, logout } = useAuth();
  const router = useRouter();
  const profilePic = user?.profilePic || "/MediSetu_Logo_W100.svg";

  const closeDrawer = () => {
    if (window.innerWidth < 768) setIsOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (isOpen && !e.target.closest("aside")) setIsOpen(false);
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [isOpen]);

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
      toast.success("Logged out successfully!");
    } catch (error) {
      console.error("Logout failed", error);
      toast.error("Failed to logout. Try again!");
    }
  };

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
              <ShieldCheck className="w-full h-full" />
            </motion.div>
            <Link href="/admin" passHref legacyBehavior>
              <motion.h1
                initial={{ scale: 0.95 }}
                animate={{ scale: [0.95, 1, 0.95] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                whileHover={{ scale: 1.05 }}
                className="cursor-pointer text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-teal-300 drop-shadow-lg"
              >
                MEDISETU ADMIN
              </motion.h1>
            </Link>
          </div>

          <div className="flex items-center gap-4 md:gap-2">
            {/* Home Button */}
            <Link
              href="/admin/dashboard"
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

        {/* Main Content */}
        <div className="pt-20 p-6">
          {children}
        </div>
      </div>
    </div>
  );
} 