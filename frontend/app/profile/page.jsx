// "use client";

// import {useAuth} from "../../context/AuthContext";
// import { useEffect, useState, Fragment } from "react";
// import { Dialog, Transition } from "@headlessui/react";
// import { motion } from "framer-motion"; // ✅ Import motion
// import { Upload, User, Edit, Save, LogOut, Calendar, MapPin,Phone, User, Mail } from "lucide-react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// // Dummy API functions (Replace with actual API requests)
// import { uploadAvatar, updateProfile, logoutUser } from "../../utils/api";

// export default function ProfilePage() {
//   const {user, checkAuth, loading } = useAuth();
//   const router = useRouter();
//   const [file, setFile] = useState(null);
//   const [isOpen, setIsOpen] = useState(false);

//   useEffect(() => {
//     const fetchAuth = async () => {
//       await checkAuth();
//     };
//     fetchAuth();
//   }, []);
  
//   const ProfileDetails = ({ user }) => {
//     const iconAnimation = {
//       whileHover: { scale: 1.2, rotate: 10 },
//       transition: { type: "spring", stiffness: 300 },
//     };
//   // Handle file change
//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     if (selectedFile) {
//       setFile(selectedFile);
//     }
//   };


//   const handleUpload = async () => {
//     if (!file || !user?._id) return toast.error("No file selected!");

//     const formData = new FormData();
//     formData.append("image", file);

//     try {
//       const { data } = await uploadAvatar(formData, user._id);
//       const updatedUser = { ...user, profilePic: data.profilePic };
//       await updateProfile(updatedUser);
//       setUser(updatedUser);
//       toast.success("Profile picture updated!");
//     } catch (error) {
//       console.error("Upload failed", error);
//       toast.error("Failed to upload profile picture.");
//     }
//   };

//   const handleSave = async () => {
//     if (!user?._id) return toast.error("Invalid user data!");

//     try {
//       await updateProfile({
//         firstName: user.firstName,
//         email: user.email,
//         dob: user.dob,
//         address: user.address,
//         profilePic: user.profilePic,
//       });
//       setIsOpen(false);
//       toast.success("Profile updated successfully!");
//     } catch (error) {
//       toast.error("Failed to update profile.");
//     }
//   };

//   const {setUser} = useAuth();
//   const handleLogout = async () => {
//     try {
//       await logoutUser(); // Call the API function to log out  
//       // Redirect to login page
//       setUser(null);
//       router.push("/");
  
//       // Show success toast
//       toast.success("Logged out successfully!");
//     } catch (error) {
//       console.error("Logout failed", error);
//       toast.error("Failed to logout. Try again!");
//     }
//   };
  

//   if (loading) return <p className="text-center mt-[150px]">Loading...</p>;

//   return (
//     <div className="max-w-2xl mx-auto mt-[100px] mb-[150px] p-6 bg-white shadow-lg rounded-xl">
//       <h2 className="text-2xl font-bold text-center">Profile Settings</h2>

//       {/* Avatar Upload Section */}
//       <div className="flex flex-col items-center mt-6">
//         <label htmlFor="file-upload" className="relative cursor-pointer">
//           <Image
//             src={user?.profilePic || "/MediSetu_Logo_B100.svg"}
//             alt="Avatar"
//             width={100}
//             height={100}
//             className="rounded-full border-4 border-gray-300"
//           />
//           <Upload className="absolute top-0 right-0 bg-white p-1 rounded-full shadow-md w-6 h-6" />
//         </label>
//         <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} />
//         <button onClick={handleUpload} className="mt-2 text-sm text-teal-500">
//           Upload
//         </button>
//       </div>

//       {/* Profile Fields */}
//       <div className="mt-6 space-y-4">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-2">
//             <User className="w-5 h-5 text-gray-600" />
//             <p>{(user?.firstName+" "+user?.lastName) || "Your Name"}</p>
//           </div>
//           <Edit className="w-5 h-5 text-blue-500 cursor-pointer" onClick={() => setIsOpen(true)} />
//         </div>


//         <div className="flex items-center space-x-2">
//         <motion.div {...iconAnimation}>
//           <Mail className="w-5 h-5 text-blue-600" />
//         </motion.div>
//         <p>{user?.email || "Add Your Email"}</p>
//       </div>

//       {/* Date of Birth */}
//       <div className="flex items-center space-x-2">
//         <motion.div {...iconAnimation}>
//           <CalendarDays className="w-5 h-5 text-green-600" />
//         </motion.div>
//         <p>{user?.dob || "Add Date of Birth"}</p>
//       </div>

//       {/* Address */}
//       <div className="flex items-center space-x-2">
//         <motion.div {...iconAnimation}>
//           <MapPin className="w-5 h-5 text-red-600" />
//         </motion.div>
//         <p>{user?.address || "Add Your Address"}</p>
//       </div>

//       {/* Gender */}
//       <div className="flex items-center space-x-2">
//         <motion.div {...iconAnimation}>
//           <User className="w-5 h-5 text-purple-600" />
//         </motion.div>
//         <p>{user?.gender || "Male"}</p>
//       </div>

//       {/* Phone */}
//       <div className="flex items-center space-x-2">
//         <motion.div {...iconAnimation}>
//           <Phone className="w-5 h-5 text-yellow-600" />
//         </motion.div>
//         <p>{user?.phone || "+91 XYZZYXXYZX"}</p>
//       </div>

//       </div> 

//       {/* Logout Button */}
//       <div className="mt-6 flex justify-center">
//         <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-md flex items-center space-x-2">
//           <LogOut className="w-5 h-5" />
//           <span>Logout</span>
//         </button>
//       </div>

//       {/* Edit Profile Dialog */}
//       <Transition appear show={isOpen} as={Fragment}>
//         <Dialog as="div" className="fixed inset-0 z-50 flex items-center justify-center" onClose={() => setIsOpen(false)}>
          
//           {/* Background Overlay with Fade Animation */}
//           <Transition.Child
//             as={Fragment}
//             enter="transition-opacity duration-300"
//             enterFrom="opacity-0"
//             enterTo="opacity-100"
//             leave="transition-opacity duration-300"
//             leaveFrom="opacity-100"
//             leaveTo="opacity-0"
//           >
//             <div className="fixed inset-0 bg-black opacity-50"></div>
//           </Transition.Child>

//           {/* Dialog Panel with Scale Animation */}
//           <Transition.Child
//             as={Fragment}
//             enter="transition-transform duration-300 ease-out"
//             enterFrom="scale-90 opacity-0"
//             enterTo="scale-100 opacity-100"
//             leave="transition-transform duration-200 ease-in"
//             leaveFrom="scale-100 opacity-100"
//             leaveTo="scale-90 opacity-0"
//           >
//             <Dialog.Panel className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full z-50 relative">
//               <Dialog.Title className="text-lg font-bold text-center text-gray-800">Edit Profile</Dialog.Title>
              
//               {/* Input Fields */}
//               <div className="mt-4 space-y-3">
//                 <input type="text" className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none" placeholder="Full Name" />
//               </div>

//               {/* Buttons */}
//               <div className="mt-6 flex justify-end space-x-2">
//                 <button onClick={() => setIsOpen(false)} className="px-4 py-2 bg-gray-300 rounded-md">Cancel</button>
//                 <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded-md">Save</button>
//               </div>
//             </Dialog.Panel>
//           </Transition.Child>
//         </Dialog>
//       </Transition>
//     </div>
//   );
// }
// }


"use client";

import { useAuth } from "../../context/AuthContext";
import { useEffect, useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { motion } from "framer-motion";
import { Upload,  UserCircle, Edit, Save, LogOut, CalendarDays, MapPin, Phone, Mail } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Dummy API functions (Replace with actual API requests)
import { uploadAvatar, updateProfile, logoutUser } from "../../utils/api";

export default function ProfilePage() {
  const { user, checkAuth, loading, setUser } = useAuth(); // ✅ Added setUser here
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);

  useEffect(() => {
    const fetchAuth = async () => {
      setLoadingPage(true); // Start loading
      await checkAuth();
      setLoadingPage(false); // End loading
    };
    fetchAuth();
  }, [checkAuth]);

  const iconAnimation = {
    whileHover: { scale: 1.2, rotate: 10 },
    transition: { type: "spring", stiffness: 300 },
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file || !user?._id) return toast.error("No file selected!");

    const formData = new FormData();
    formData.append("image", file);

    try {
      const { data } = await uploadAvatar(formData, user._id);
      const updatedUser = { ...user, profilePic: data.profilePic };
      setUser(updatedUser);
      toast.success("Profile picture updated!");
    } catch (error) {
      console.error("Upload failed", error);
      toast.error("Failed to upload profile picture.");
    }
  };

  const handleSave = async () => {
    if (!user?._id) return toast.error("Invalid user data!");

    try {
      await updateProfile({
        firstName: user.firstName,
        email: user.email,
        dob: user.dob,
        address: user.address,
        profilePic: user.profilePic,
      });
      setIsOpen(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile.");
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

  if (loading) return <p className="text-center mt-[150px] mb-[150px]">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-[100px] mb-[150px] p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold text-center">Profile Settings</h2>

      {/* Avatar Upload Section */}
      <div className="flex flex-col items-center mt-6">
        <label htmlFor="file-upload" className="relative cursor-pointer">
          <Image
            src={user?.profilePic || "/MediSetu_Logo_B100.svg"}
            alt="Avatar"
            width={100}
            height={100}
            className="rounded-full border-4 border-gray-300"
          />
          <Upload className="absolute top-0 right-0 bg-white p-1 rounded-full shadow-md w-6 h-6" />
        </label>
        <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} />
        <button onClick={handleUpload} className="mt-2 text-sm text-teal-500">
          Upload
        </button>
      </div>

      {/* Profile Fields */}
      <div className="mt-6 space-y-4">
        <div className="flex items-center space-x-2">
          <UserCircle className="w-5 h-5 text-gray-600" />
          <p>{(user?.firstName + " " + user?.lastName) || "Your Name"}</p>
        </div>

        <div className="flex items-center space-x-2">
          <motion.div {...iconAnimation}>
            <Mail className="w-5 h-5 text-blue-600" />
          </motion.div>
          <p>{user?.email || "Add Your Email"}</p>
        </div>

        <div className="flex items-center space-x-2">
          <motion.div {...iconAnimation}>
            <CalendarDays className="w-5 h-5 text-green-600" />
          </motion.div>
          <p>{user?.dob || "Add Date of Birth"}</p>
        </div>

        <div className="flex items-center space-x-2">
          <motion.div {...iconAnimation}>
            <MapPin className="w-5 h-5 text-red-600" />
          </motion.div>
          <p>{user?.address || "Add Your Address"}</p>
        </div>

        <div className="flex items-center space-x-2">
          <motion.div {...iconAnimation}>
            <Phone className="w-5 h-5 text-yellow-600" />
          </motion.div>
          <p>{user?.phone || "+91 XYZZYXXYZX"}</p>
        </div>
      </div>

      {/* Logout Button */}
      <div className="mt-6 flex justify-center">
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-md flex items-center space-x-2">
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
