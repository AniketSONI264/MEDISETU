"use client";

import { useAuth } from "../../context/AuthContext";
import { useEffect, useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { motion } from "framer-motion";
import { Upload, UserCircle, Edit, Save, LogOut, CalendarDays, MapPin, Phone, Mail, Loader2, Shield, Heart, Activity } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { uploadAvatar, updateProfile, logoutUser } from "../../utils/api";
import AvatarUpload from "./components/AvatarUpload";

export default function ProfilePage() {
  const { user, loading, setUser } = useAuth();
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false); 
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    address: {
      street: "",
      city: "",
      state: "",
      country: "India",
      zipCode: ""
    },
    phone: "",
    gender: ""
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        dateOfBirth: user.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split('T')[0] : "",
        address: {
          street: user.address?.street || "",
          city: user.address?.city || "",
          state: user.address?.state || "",
          country: user.address?.country || "India",
          zipCode: user.address?.zipCode || ""
        },
        phone: user.phone || "",
        gender: user.gender || ""
      });
    }
  }, [user]);

  const iconAnimation = {
    whileHover: { scale: 1.2, rotate: 10 },
    transition: { type: "spring", stiffness: 300 },
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error("File size should be less than 5MB");
        return;
      }
      if (!selectedFile.type.startsWith("image/")) {
        toast.error("Please upload an image file");
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file || !user?._id) {
      toast.error("No file selected!");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const { data } = await uploadAvatar(formData, user._id);
      const updatedUser = { ...user, profilePic: data.profilePic };
      setUser(updatedUser);
      toast.success("Profile picture updated!");
      setFile(null);
    } catch (error) {
      console.error("Upload failed", error);
      toast.error(error.response?.data?.message || "Failed to upload profile picture.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      const [, addressPart] = name.split(".");
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressPart]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSave = async () => {
    if (!user?._id) {
      toast.error("Invalid user data!");
      return;
    }

    // Validate required fields
    if (!formData.firstName || !formData.lastName) {
      toast.error("First name and last name are required!");
      return;
    }

    if (!formData.phone) {
      toast.error("Phone number is required!");
      return;
    }

    setIsUpdating(true);
    try {
      const dataToUpdate = {
        ...formData,
        _id: user._id
      };
      const response = await updateProfile(dataToUpdate);
      const updatedUser = { ...user, ...response.data.user };
      setUser(updatedUser);
      setIsOpen(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Update failed", error);
      toast.error(error.response?.data?.message || "Failed to update profile.");
    } finally {
      setIsUpdating(false);
    }
  };

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-white">
        <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <>
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#333',
            color: '#fff',
            borderRadius: '8px',
            padding: '16px',
          },
          success: {
            duration: 3000,
            theme: {
              primary: '#4aed88',
            },
            icon: '✅',
          },
          error: {
            duration: 3000,
            theme: {
              primary: '#ff4b4b',
            },
            icon: '❌',
          },
        }}
      />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8 mt-[50px] mb-[100px]">
        <div className="max-w-4xl mx-auto">
          {/* <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Profile</h1>
            <p className="text-lg text-gray-600">Manage your personal information and preferences</p>
          </motion.div> */}

<motion.div
  initial={{ opacity: 0, y: -30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
  className="text-center mb-16"
>
  <h1 className="text-5xl font-extrabold bg-gradient-to-r from-teal-800 via-teal-500 to-teal-200 bg-clip-text text-transparent drop-shadow-md mb-4">
    Your Profile
  </h1>
  <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
    Manage your personal information, customize preferences, and make your profile truly yours.
  </p>
  
</motion.div>

            
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-teal-800 via-teal-500 to-teal-200  p-8 text-white">
              <motion.div 
                variants={itemVariants}
                className="flex flex-col items-center"
              >
                <AvatarUpload avatar={user?.profilePic} setAvatar={(url) => setUser({ ...user, profilePic: url })} />
                <h2 className="mt-4 text-2xl font-bold">{(user?.firstName + " " + user?.lastName) || "Your Name"}</h2>
                <p className="text-blue-100">{user?.email || "Add Your Email"}</p>
              </motion.div>
            </div>

            {/* Profile Content */}
            <div className="p-8">
              <motion.div 
                variants={containerVariants}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-blue-100 rounded-full">
                      <UserCircle className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Full Name</p>
                      <p className="font-medium text-gray-900">{(user?.firstName + " " + user?.lastName) || "Your Name"}</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-green-100 rounded-full">
                      <Mail className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium text-gray-900">{user?.email || "Add Your Email"}</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-purple-100 rounded-full">
                      <CalendarDays className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Date of Birth</p>
                      <p className="font-medium text-gray-900">
                        {user?.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString() : "Add Date of Birth"}
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-red-100 rounded-full">
                      <MapPin className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="font-medium text-gray-900">
                        {user?.address ? 
                          `${user.address.street}, ${user.address.city}, ${user.address.state}, ${user.address.country} - ${user.address.zipCode}` 
                          : "Add Your Address"}
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-yellow-100 rounded-full">
                      <Phone className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium text-gray-900">{user?.phone || "+91 XYZZYXXYZX"}</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-pink-100 rounded-full">
                      <Heart className="w-6 h-6 text-pink-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Gender</p>
                      <p className="font-medium text-gray-900">{user?.gender || "Not Specified"}</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div 
                variants={itemVariants}
                className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 mt-8"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsOpen(true)}
                  className="px-8 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                >
                  <Edit className="w-5 h-5" />
                  <span>Edit Profile</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="px-8 py-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Edit Profile Dialog */}
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="fixed inset-0 z-50 flex items-center justify-center p-4" onClose={() => setIsOpen(false)}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black opacity-50"></div>
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="transition-transform duration-300 ease-out"
              enterFrom="scale-90 opacity-0"
              enterTo="scale-100 opacity-100"
              leave="transition-transform duration-200 ease-in"
              leaveFrom="scale-100 opacity-100"
              leaveTo="scale-90 opacity-0"
            >
              <Dialog.Panel className="bg-white p-6 sm:p-8 rounded-2xl shadow-2xl max-w-md w-full z-50 relative max-h-[90vh] overflow-y-auto">
                <Dialog.Title className="text-2xl font-bold text-center text-gray-800 mb-6">Edit Profile</Dialog.Title>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition-colors duration-300"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition-colors duration-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      readOnly
                      disabled
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed text-gray-500"
                      title="Email cannot be changed"
                    />
                    <p className="mt-1 text-xs text-gray-500">Email address cannot be changed</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition-colors duration-300"
                    />
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-700">Address</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Street</label>
                        <input
                          type="text"
                          name="address.street"
                          value={formData.address.street}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition-colors duration-300"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                        <input
                          type="text"
                          name="address.city"
                          value={formData.address.city}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition-colors duration-300"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                        <input
                          type="text"
                          name="address.state"
                          value={formData.address.state}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition-colors duration-300"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
                        <input
                          type="text"
                          name="address.zipCode"
                          value={formData.address.zipCode}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition-colors duration-300"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition-colors duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition-colors duration-300"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(false)}
                    className="w-full sm:w-auto px-6 py-3 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors duration-300 shadow-md hover:shadow-lg"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSave}
                    disabled={isUpdating}
                    className="w-full sm:w-auto px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isUpdating ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        <span>Save Changes</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </Dialog>
        </Transition>
      </div>
    </>
  );
}
