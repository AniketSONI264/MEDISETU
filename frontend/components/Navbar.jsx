"use client";
import { useState, useEffect, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Stethoscope,
  Home,
  Briefcase,
  Info,
  Mail,
  LogIn,
  ChevronDown,
  User,
  Video,
  FlaskConical,
  HeartPulse,
  CalendarCheck,
  UserCircle,
} from "lucide-react";
import Link from "next/link";
import AuthDialog from "./login&signUp/authDialog";
import { useAuth } from "../context/AuthContext";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, loading, checkAuth } = useAuth();
  const isLoggedIn = !!user;
  console.log("Is Logged in : ", isLoggedIn, " and User ", user);
  const pathname = usePathname();

  useEffect(() => {
    console.log("Auth Updated - User:", user);
  }, [user]);

  // const handleLogin = async (userData) => {
  //   await checkAuth();
  //   setIsAuthOpen(false);
  // };
  useEffect(() => {
    const fetchAuth = async () => {
      await checkAuth();
    };
    fetchAuth();
  }, []);

    const handleLogout = async () => {
      try {
        await logoutUser();
        setUser(null);
        router.push("/");
        toast.success("Logged out successfully!");
      } catch (error) {
        console.error("Logout failed", error);
        toast.error("Failed to logout. Try again!");
      }
    };
  
  const services = [
    {
      href: "/services/general-consultation",
      label: "General Consultation",
      Icon: User,
    },
    {
      href: "/services/online-appointments",
      label: "Online Appointments",
      Icon: CalendarCheck,
    },
    {
      href: "/services/video-consultation",
      label: "Video Consultation",
      Icon: Video,
    },
    {
      href: "/services/lab-tests",
      label: "Lab Tests & Diagnostics",
      Icon: FlaskConical,
    },
    {
      href: "/services/health-packages",
      label: "Health Packages",
      Icon: HeartPulse,
    },
  ];

  const navItems = [
    { href: "/", label: "Home", Icon: Home },
    { href: "/services", label: "Services", Icon: Briefcase, isDropdown: true },
    { href: "/about", label: "About Us", Icon: Info },
    { href: "/contact", label: "Contact Us", Icon: Mail },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      {/* Navbar Background */}
      <div className="backdrop-blur-md bg-white/50 shadow-lg rounded-b-xl border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Stethoscope className="w-7 sm:w-8 h-7 sm:h-8 text-teal-600" />
            </motion.div>
            <span className="font-bold text-lg sm:text-xl md:text-2xl text-teal-800 drop-shadow-md">
              MediSetu
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 text-sm sm:text-base font-semibold">
            {navItems.map(({ href, label, Icon, isDropdown }) => {
              const isActive = pathname === href;

              return isDropdown ? (
                // Services Dropdown
                <div
                  key={href}
                  className="relative group"
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                >
                  <Link
                    href="/services"
                    className="flex items-center space-x-2 text-gray-700 hover:text-teal-500"
                  >
                    <motion.div
                      animate={{ rotate: [0, 15, -15, 0] }}
                      transition={{ repeat: Infinity, duration: 1 }}
                    >
                      <Icon className="w-5 h-5 text-gray-500 group-hover:text-teal-500 transition-colors duration-300" />
                    </motion.div>
                    <span>Services</span>
                    <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-teal-500 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        isDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </Link>
                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 mt-2 w-52 sm:w-64 bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200"
                      >
                        {services.map(({ href, label, Icon }) => (
                          <Link
                            key={href}
                            href={href}
                            className="flex items-center px-3 py-2 text-gray-700 hover:bg-teal-300 hover:text-white transition"
                          >
                            <motion.div
                              animate={{ rotate: [0, 15, -15, 0] }}
                              transition={{ duration: 1, repeat: Infinity }}
                            >
                              <Icon className="w-5 h-5 text-teal-500 transition-colors duration-200 group-hover:text-teal-700" />
                            </motion.div>
                            <span className="ml-2">{label}</span>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={href}
                  href={href}
                  className="relative group flex items-center space-x-2"
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <Icon
                      className={`w-6 h-6 ${
                        isActive
                          ? "text-teal-700 font-bold drop-shadow-md"
                          : "text-gray-700 group-hover:text-teal-500"
                      }`}
                    />
                  </motion.div>

                  <span
                    className={`relative group-hover:text-teal-500 ${
                      isActive ? "text-teal-700 font-bold" : "text-gray-700"
                    }`}
                  >
                    {label}
                  </span>
                  <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-teal-500 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              );
            })}
          </div>

          <div className="hidden md:block">
            {loading ? (
              <span className="text-gray-500 animate-pulse pt-[150px] pb-[150px]">Loading...</span> // Show loading state while authentication is being checked
            ) : isLoggedIn ? (
              // Show Profile Icon when Logged In
              <Link href="/profile" className="flex items-center space-x-2">
  <motion.div
    animate={{ rotate: [0, 15, -15, 0] }}
    transition={{ duration: 1, repeat: Infinity }}
  >
    {user?.profilePic ? (
      <img
        src={user.profilePic}
        alt="Profile"
        className="w-9 h-9 rounded-full border-2 border-teal-600"
      />
    ) : (
      <UserCircle className="w-9 h-9 text-teal-600 animate-pulse" />
    )}
  </motion.div>
</Link>

            ) : (
              // Show Login Button when Not Logged In
              <button
                onClick={() => setIsAuthOpen(true)}
                className="flex items-center space-x-2 bg-gradient-to-r from-teal-500 to-blue-500 text-white px-5 py-2 rounded-full font-bold shadow-md hover:scale-105 duration-200"
              >
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                >
                  <LogIn className="w-5 h-5" />
                </motion.div>
                <span>Login / Signup</span>
              </button>
            )}
          </div>

          <div className="absolute top-4 right-4 md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? (
                <X size={26} className="text-teal-600" />
              ) : (
                <Menu size={26} className="text-teal-600" />
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="md:hidden fixed top-0 right-0 w-4/5 max-w-sm h-full bg-white shadow-2xl z-50 p-6 flex flex-col overflow-y-auto"
          >
            <div className="absolute top-4 right-4">
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-600 hover:text-teal-600 transition"
              >
                <X size={28} />
              </button>
            </div>

            <div className="mt-12 flex flex-col space-y-4">
              {navItems.map(({ href, label, Icon, isDropdown }) =>
                isDropdown ? (
                  <div key={href} className="relative">
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="flex items-center gap-2 w-full text-lg  text-gray-700 hover:text-teal-600 py-2"
                    >
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="flex items-center"
                      >
                        <Icon className="w-5 h-5 text-teal-600" />
                      </motion.div>
                      <span>Services</span>
                      <motion.div
                        animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                        className="flex items-center"
                      >
                        <ChevronDown className="w-4 h-4 transition-transform duration-200" />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="mt-2 pl-4 flex flex-col space-y-2"
                        >
                          {services.map(({ href, label, Icon }) => (
                            <Link
                              key={href}
                              href={href}
                              className="flex items-center space-x-3 text-gray-700 hover:text-teal-500 transition"
                            >
                              <motion.div
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{
                                  duration: 1.2,
                                  repeat: Infinity,
                                  ease: "easeInOut",
                                }}
                              >
                                <Icon className="w-5 h-5 text-teal-500" />
                              </motion.div>
                              <span>{label}</span>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={href}
                    href={href}
                    className="flex items-center space-x-3 text-lg font-medium text-gray-700 hover:text-teal-500 transition py-2"
                  >
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <Icon className="w-6 h-6 text-teal-600" />
                    </motion.div>
                    <span>{label}</span>
                  </Link>
                )
              )}
            </div>

            <div className="mt-6">
              {isLoggedIn ? (
                // <Link
                //   href="/profile"
                //   className="flex items-center space-x-2 group"
                // >
                //   <motion.img
                //     src={user?.profilePic || "/default-avatar.png"}
                //     alt="User Avatar"
                //     className="w-10 h-10 rounded-full border-2 border-teal-500 shadow-md"
                //   />
                //   <span className="text-teal-700 font-semibold group-hover:text-teal-500 transition">
                //     Profile
                //   </span>
                // </Link>
                <Link href="/profile" className="flex items-center space-x-2 group">
  <motion.div
    animate={{ rotate: [0, 15, -15, 0] }}
    transition={{ duration: 1, repeat: Infinity }}
  >
    {user?.profilePic ? (
      <motion.img
        src={user.profilePic}
        alt="User Avatar"
        className="w-10 h-10 rounded-full border-2 border-teal-500 shadow-md"
      />
    ) : (
      <UserCircle className="w-10 h-10 text-teal-500 animate-pulse" />
    )}
  </motion.div>
  <span className="text-teal-700 font-semibold group-hover:text-teal-500 transition">
    Profile
  </span>
</Link>

              ) : (
                <button
                  onClick={() => setIsAuthOpen(true)}
                  className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-teal-500 to-blue-500 text-white px-5 py-3 rounded-full font-bold shadow-md hover:scale-105 duration-200"
                >
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  >
                    <LogIn className="w-6 h-6" />
                  </motion.div>
                  <span>Login / Signup</span>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AuthDialog
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={() => {
          setUser(getUserFromLocalStorage()); // Update user state
          setIsAuthOpen(false); // Close dialog immediately
        }}
      />
    </nav>
  );
}
