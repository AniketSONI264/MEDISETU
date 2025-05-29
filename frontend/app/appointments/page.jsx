

// // app/appointments/page.jsx
// "use client";
// import { useEffect, useState } from "react";
// import { getUserAppointments } from "@/utils/api";
// import { Loader2 } from "lucide-react";
// import { motion } from "framer-motion";
// import UserAppointmentsCard from "./AppointmentCard";

// const AppointmentsPage = () => {
//   const [appointments, setAppointments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [errorMsg, setErrorMsg] = useState(null);

//   useEffect(() => {
//     const fetchAppointments = async () => {
//       const res = await getUserAppointments();
//       if (res.success) {
//         setAppointments(res.data || []);
//       } else {
//         setErrorMsg(res.message);
//       }
//       setLoading(false);
//     };
//     fetchAppointments();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-10 mt-10 mb-[120px]">
//       <motion.h1
//         initial={{ opacity: 0, y: -10 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="text-3xl font-bold text-primary text-center mb-8"
//       >
//         Your Appointments
//       </motion.h1>

//       {loading ? (
//         <div className="flex justify-center items-center h-40">
//           <Loader2 className="animate-spin text-primary h-10 w-10" />
//         </div>
//       ) : errorMsg ? (
//         <p className="text-red-600 text-center">{errorMsg}</p>
//       ) : appointments.length === 0 ? (
//         <p className="text-gray-600 text-center">You have no appointments yet.</p>
//       ) : (
//         <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
//           {appointments.map((appointment) => (
//             <UserAppointmentsCard
//               key={appointment._id}
//               appointment={appointment}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AppointmentsPage;



// app/appointments/page.jsx
"use client";
import { motion } from "framer-motion";
import AppointmentList from "./AppointmentList";

const AppointmentsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-10 mt-10 mb-[120px]">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-primary text-center mb-8"
      >
        Your Appointments
      </motion.h1>

      <AppointmentList />
    </div>
  );
};

export default AppointmentsPage;
