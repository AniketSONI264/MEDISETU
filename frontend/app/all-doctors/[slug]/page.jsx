// import { getDoctorBySlug } from "@/utils/api";
// import DoctorProfilePage from "@/components/AppointmentComps/docProfile";
// import {motion} from "framer-motion";
// import {UserCircle2, AlertCircle} from "lucide-react";

// const DoctorPage = async (props) => {
//   const { slug } = await props.params; // 💥 Await this bad boi

//   console.log("Slug:", slug);
//   let doctorData;

//   try {
//     const res = await getDoctorBySlug(slug);
//     doctorData = res.data.data;
//   } catch (error) {
//     console.error("Error fetching doctor data:", error);
//     doctorData = null;
//   }

//   // return (
//   //   <div className="mt-[100px] mb-[150px] sm:mt-[50px]">
//   //     {doctorData ? (
//   //       <DoctorProfilePage doctor={doctorData} />
//   //     ) : (
//   //       <div className="text-center text-red-500 font-semibold">
//   //         Doctor not found 🚫
//   //       </div>
//   //     )}
//   //   </div>
//   // );

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 60 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6, ease: "easeOut" }}
//       className="min-h-screen pt-24 pb-32 px-4 sm:px-8 md:px-16 bg-gradient-to-b from-white via-gray-50 to-gray-100"
//     >
//       <div className="text-center mb-10">
//         <motion.h1
//           initial={{ scale: 0.9, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           transition={{ delay: 0.3, duration: 0.5 }}
//           className="text-3xl sm:text-4xl font-bold text-blue-600 flex items-center justify-center gap-3"
//         >
//           <UserCircle2 className="w-8 h-8 text-blue-500" />
//           Doctor Profile
//         </motion.h1>
//         <p className="text-sm sm:text-base mt-2 text-gray-600">
//           Get to know your specialist better
//         </p>
//       </div>

//       {doctorData ? (
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.5, duration: 0.6 }}
//         >
//           <DoctorProfilePage doctor={doctorData} />
//         </motion.div>
//       ) : (
//         <motion.div
//           initial={{ scale: 0.95, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           transition={{ delay: 0.4, duration: 0.5 }}
//           className="flex flex-col items-center justify-center text-center py-20 rounded-xl bg-red-50 border border-red-200"
//         >
//           <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
//           <h2 className="text-xl font-semibold text-red-600">Doctor not found 🚫</h2>
//           <p className="text-sm mt-2 text-gray-500 max-w-sm">
//             The profile you're looking for might have been removed or doesn’t exist. Please check the URL or try again.
//           </p>
//         </motion.div>
//       )}
//     </motion.div>
//   );
// }


// export default DoctorPage;




// app/doctor/[slug]/page.jsx

import { getDoctorBySlug } from "@/utils/api";
import DoctorPageContent from "@/components/AppointmentComps/docPageComp.jsx";

// ✅ Server Component – fetches data based on slug
const DoctorPage = async ({ params }) => {
  // const { slug } = params;
  // console.log("Doctor Slug:", slug);

  // let doctorData = null;

  const { slug } =await params; // 💥 Await this bad boi

    console.log("Slug:", slug);
    let doctorData;

  try {
    // const res =  getDoctorBySlug(slug);
    const res = await getDoctorBySlug(slug);
    doctorData = res?.data?.data || null;
  } catch (error) {
    console.error("Error fetching doctor data:", error);
  }

   return <DoctorPageContent doctorData={doctorData} />;
  // return (
  //   <div className="mb-[100px]">
  //     <DoctorPageContent doctorData={doctorData} />
  //   </div>
  // );
   
};

export default DoctorPage;
