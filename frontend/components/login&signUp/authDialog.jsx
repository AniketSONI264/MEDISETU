// "use client";
// import { useState } from "react";
// import { X, Mail, Lock, User, Eye, EyeOff } from "lucide-react";

// export default function AuthDialog({ isOpen, onClose }) {
//   const [isLogin, setIsLogin] = useState(true);
//   const [showPassword, setShowPassword] = useState(false);

//   return (
//     isOpen && (
//       <div className="fixed inset-0 flex items-center justify-center bg-opacity-20 backdrop-blur-lg z-50 px-4 sm:px-6 md:px-8">
//         <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 w-full max-w-md shadow-2xl relative transition-all duration-300 border border-teal-500">
//           {/* Close Button */}
//           <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-red-500">
//             <X size={24} />
//           </button>

//           {/* Title */}
//           <h2 className="text-2xl font-bold text-center flex items-center justify-center gap-2">
//             {isLogin ? "🔑 Login to MediSetu" : "📝 Create an Account"}
//           </h2>

//           {/* Toggle Between Login & Signup */}
//           <div className="mt-6 flex justify-center space-x-4">
//             <button
//               className={`px-6 py-2 rounded-lg text-lg transition-all ${isLogin ? "bg-teal-500 text-white" : "bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-white"}`}
//               onClick={() => setIsLogin(true)}
//             >
//               Login
//             </button>
//             <button
//               className={`px-6 py-2 rounded-lg text-lg transition-all ${!isLogin ? "bg-teal-500 text-white" : "bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-white"}`}
//               onClick={() => setIsLogin(false)}
//             >
//               Signup
//             </button>
//           </div>

//           {/* Form */}
//           <form className="mt-6 space-y-5">
//             {!isLogin && (
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="relative">
//                   <User className="absolute left-3 top-3 text-gray-500" />
//                   <input
//                     type="text"
//                     placeholder="First Name"
//                     className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
//                   />
//                 </div>
//                 <div className="relative">
//                   <User className="absolute left-3 top-3 text-gray-500" />
//                   <input
//                     type="text"
//                     placeholder="Last Name"
//                     className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
//                   />
//                 </div>
//               </div>
//             )}
//             <div className="relative">
//               <Mail className="absolute left-3 top-3 text-gray-500" />
//               <input
//                 type="email"
//                 placeholder="Email Address"
//                 className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
//               />
//             </div>
//             <div className="relative">
//               <Lock className="absolute left-3 top-3 text-gray-500" />
//               <input
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Password"
//                 className="w-full pl-10 pr-10 p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-3 text-gray-500 hover:text-teal-500"
//               >
//                 {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//               </button>
//             </div>
//             <button className="w-full bg-teal-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-teal-600 transition">
//               {isLogin ? "Login" : "Signup"}
//             </button>
//           </form>

//           {/* Extra Actions */}
//           {isLogin && (
//             <p className="mt-4 text-center text-gray-500">
//               Forgot Password? <a href="#" className="text-teal-500">Reset Here</a>
//             </p>
//           )}
//           <p className="mt-4 text-center text-gray-500">
//             {isLogin ? "Don't have an account?" : "Already have an account?"} {" "}
//             <button className="text-teal-500" onClick={() => setIsLogin(!isLogin)}>
//               {isLogin ? "Sign Up" : "Login"}
//             </button>
//           </p>
//         </div>
//       </div>
//     )
//   );
// }




"use client";
import { useState } from "react";
import { X, Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { registerUser, loginUser } from "../../utils/api";
import { toast } from "react-toastify"; // ✅ Import Toast
import "react-toastify/dist/ReactToastify.css"; // ✅ Import Toast Styles

export default function AuthDialog({ isOpen, onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", password: "" });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission (Login/Signup)
const handleSubmit = async(e) =>{
  e.preventDefault();
  try{
    const response = isLogin ? await loginUser(formData) : await registerUser(formData);
    toast.success(`${isLogin ? "Logged In": "Registered & Logged In"} successfully!`);
    console.log("Response : ",response)
    onClose();  
  }catch(error){
    toast.error(error.response ?.data?.message || "Something Went Wrong");
  }

}

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-opacity-20 backdrop-blur-lg z-50 px-4 sm:px-6 md:px-8">
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 w-full max-w-md shadow-2xl relative transition-all duration-300 border border-teal-500">
          {/* Close Button */}
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-red-500">
            <X size={24} />
          </button>

          {/* Title */}
          <h2 className="text-2xl font-bold text-center flex items-center justify-center gap-2">
            {isLogin ? "🔑 Login to MediSetu" : "📝 Create an Account"}
          </h2>

          {/* Toggle Between Login & Signup */}
          <div className="mt-6 flex justify-center space-x-4">
            <button className={`px-6 py-2 rounded-lg text-lg transition-all ${isLogin ? "bg-teal-500 text-white" : "bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-white"}`} onClick={() => setIsLogin(true)}>
              Login
            </button>
            <button className={`px-6 py-2 rounded-lg text-lg transition-all ${!isLogin ? "bg-teal-500 text-white" : "bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-white"}`} onClick={() => setIsLogin(false)}>
              Signup
            </button>
          </div>

          {/* Form */}
          <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <User className="absolute left-3 top-3 text-gray-500" />
                  <input type="text" name="firstName" placeholder="First Name" className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none" onChange={handleChange} required />
                </div>
                <div className="relative">
                  <User className="absolute left-3 top-3 text-gray-500" />
                  <input type="text" name="lastName" placeholder="Last Name" className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none" onChange={handleChange} required />
                </div>
              </div>
            )}
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-500" />
              <input type="email" name="email" placeholder="Email Address" className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none" onChange={handleChange} required />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-500" />
              <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" className="w-full pl-10 pr-10 p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none" onChange={handleChange} required />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-gray-500 hover:text-teal-500">
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <button className="w-full bg-teal-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-teal-600 transition">
              {isLogin ? "Login" : "Signup"}
            </button>
          </form>
        </div>
      </div>
    )
  );
}
