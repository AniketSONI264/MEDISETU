// "use client";
// import { useEffect, useState } from 'react';
// import { useSearchParams } from 'next/navigation';
// import { motion } from 'framer-motion';
// import { CheckCircle } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import Link from 'next/link';
// import {getDoctorById} from "@/utils/api"
// import jsPDF from 'jspdf';
// import domtoimage from 'dom-to-image-more';
// import html2canvas from 'html2canvas';
// import { toast } from 'react-hot-toast'; // Import the toast module
// import Receipt from './Receipt';




// const SuccessPage = () => {
//   const searchParams = useSearchParams();
//   const [appointmentData, setAppointmentData] = useState(null);
//   const [doctorData, setDoctorData] = useState(null);
//   const [loading, setLoading] = useState(true);

 
//   useEffect(() => {
//     const fetchAppointmentAndDoctor = async () => {
//       try {
//         const data = searchParams.get('data');
//         if (data) {
//           const decodedData = JSON.parse(decodeURIComponent(data));
//           setAppointmentData(decodedData);
//           console.log("Decoded Data :",decodedData)
//           if (decodedData.doctorId) {
//             const res = await getDoctorById(decodedData.doctorId);
//             setDoctorData(res.data);
//           }
//         }
//       } catch (error) {
//         console.error('Error loading appointment or doctor data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAppointmentAndDoctor();
//   }, [searchParams]);

// const handleDownloadReceipt = async () => {
//   const element = document.getElementById('receipt-content');
//   if (!element) return toast.error("Receipt element not found.");

//   try {
//     const blob = await domtoimage.toBlob(element);

//     // Load image into PDF
//     const img = new Image();
//     img.src = URL.createObjectURL(blob);
//     img.onload = () => {
//       const pdf = new jsPDF('p', 'mm', 'a4');
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = (img.height * pdfWidth) / img.width;

//       pdf.addImage(img, 'PNG', 0, 0, pdfWidth, pdfHeight);
//       pdf.save(`Appointment_Receipt_${appointmentData?.razorpay?.paymentId || 'unknown'}.pdf`);
//       toast.success('Receipt downloaded successfully!');
//     };
//   } catch (error) {
//     console.error('Error generating receipt:', error);
//     toast.error('Failed to download receipt. Try again later.');
//   }
// };



//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
//       </div>
//     );
//   }

//   if (!appointmentData || !doctorData) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center p-4">
//         <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
//         <p className="text-gray-600 mb-4">Unable to load appointment or doctor details</p>
//         <Link href="/">
//           <Button className="bg-teal-600 hover:bg-teal-700">Return to Home</Button>
//         </Link>
//       </div>
//     );
//   }
 
//   return (
//     <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mb-[100px]">
      
//       <motion.div
//   id="receipt-content"
//   initial={{ opacity: 0, y: 20 }}
//   animate={{ opacity: 1, y: 0 }}
//   transition={{ duration: 0.5 }}
//   className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8"
// >

//         <div className="text-center mb-8">
//           <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">Appointment Confirmed!</h1>
//           <p className="text-gray-600">Your appointment has been successfully booked</p>
//         </div>

//         <div className="space-y-6">
//           {/* Doctor Details */}
//           <div className="bg-gray-50 p-4 rounded-lg">
//             <h2 className="text-xl font-semibold text-gray-900 mb-4">Doctor Details</h2>
//             <div className="grid grid-cols-2 gap-4">
//               <p><span className="font-medium">Name:</span> Dr. {doctorData.firstName} {doctorData.lastName}</p>
//               <p><span className="font-medium">Specialization:</span> {doctorData.specialization}</p>
//             </div>
//           </div>

//           {/* Appointment Details */}
//           <div className="bg-gray-50 p-4 rounded-lg">
//             <h2 className="text-xl font-semibold text-gray-900 mb-4">Appointment Details</h2>
//             <div className="grid grid-cols-2 gap-4">
//             <p><span className="font-medium">Appointment Id:</span> {appointmentData._id}</p>
             
//               <p><span className="font-medium">Time:</span> {appointmentData.timeSlot}</p>
//               <p><span className="font-medium">Date:</span> {new Date(appointmentData.appointmentDate).toLocaleDateString('en-US', {
//                 weekday: 'long',
//                 year: 'numeric',
//                 month: 'long',
//                 day: 'numeric'
//               })}</p>
//               <p><span className="font-medium">Status:</span> <span className="text-green-600 font-medium">Confirmed</span></p>
//             </div>
//           </div>

//           {/* Vitals */}
//           <div className="bg-gray-50 p-4 rounded-lg">
//             <h2 className="text-xl font-semibold text-gray-900 mb-4">Vitals</h2>
//             <div className="grid grid-cols-2 gap-4">
//               <p><span className="font-medium">Blood Pressure:</span> {appointmentData.vitals?.bp}</p>
//               <p><span className="font-medium">Blood Sugar:</span> {appointmentData.vitals?.sugar}</p>
//               <p><span className="font-medium">Height:</span> {appointmentData.vitals?.height} cm</p>
//               <p><span className="font-medium">Weight:</span> {appointmentData.vitals?.weight} kg</p>
//             </div>
//           </div>

         
//          <div className="bg-gray-50 p-4 rounded-lg">
//   <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Details</h2>

//   <div className="flex flex-col sm:grid sm:grid-cols-2 gap-4">
//     <p>
//       <span className="font-medium">Amount:</span>{' '}
//       ₹{appointmentData.payment?.amount?.toLocaleString('en-IN') || '---'}
//     </p>

//     <p>
//       <span className="font-medium">Status:</span>{' '}
//       <span className="text-green-600 font-medium">Paid</span>
//     </p>

//     <div className="flex flex-col break-all sm:col-span-2">
//       <span className="font-medium">Order ID:</span>
//       <span className="text-sm text-gray-700 font-mono">
//         {appointmentData.razorpay?.orderId || '---'}
//       </span>
//     </div>

//     <div className="flex flex-col break-all sm:col-span-2">
//       <span className="font-medium">Payment ID:</span>
//       <span className="text-sm text-gray-700 font-mono">
//         {appointmentData.razorpay?.paymentId || '---'}
//       </span>
//     </div>
//   </div>
// </div>


//           {/* Video Consultation */}
//           {appointmentData.meetLink && (
//             <div className="bg-gray-50 p-4 rounded-lg">
//               <h2 className="text-xl font-semibold text-gray-900 mb-4">Video Consultation</h2>
//               <p className="mb-4">Your video consultation link will be available 15 minutes before the appointment time.</p>
//               <Button
//                 className="w-full bg-teal-600 hover:bg-teal-700"
//                 onClick={() => window.open(appointmentData.meetLink, '_blank')}
//               >
//                 Join Video Consultation
//               </Button>
//             </div>
//           )}
//         </div>

      
//         <div className="mt-8 w-full flex flex-col sm:flex-row sm:justify-center sm:space-x-4 space-y-3 sm:space-y-0">
//   <Button
//     onClick={handleDownloadReceipt}
//     className="bg-indigo-600 hover:bg-indigo-700 w-full sm:w-auto"
//   >
//     Download Receipt (PDF)
//   </Button>

//   <Link href="/" className="w-full sm:w-auto">
//     <Button
//       variant="outline"
//       className="w-full sm:w-auto border-teal-600 text-teal-600 hover:bg-teal-50"
//     >
//       Return to Home
//     </Button>
//   </Link>

//   <Link href="/appointments" className="w-full sm:w-auto">
//     <Button className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700">
//       View My Appointments
//     </Button>
//   </Link>
// </div>

//       </motion.div>
//     </div>
//   );
// };

// export default SuccessPage;


// "use client";
// import { useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";
// import { motion } from "framer-motion";
// import { CheckCircle } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { getDoctorById } from "@/utils/api";
// import jsPDF from "jspdf";
// import domtoimage from "dom-to-image-more";
// import { toast } from "react-hot-toast";
// import Receipt from "./Receipt";
// import { Suspense } from "react";

// const SuccessPage = () => {
//   const searchParams = useSearchParams();
//   const [appointmentData, setAppointmentData] = useState(null);
//   const [doctorData, setDoctorData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchAppointmentAndDoctor = async () => {
//       try {
//         const data = searchParams.get("data");
//         if (data) {
//           const decodedData = JSON.parse(decodeURIComponent(data));
//           setAppointmentData(decodedData);
//           console.log("Decoded Data:", decodedData);
//           if (decodedData.doctorId) {
//             const res = await getDoctorById(decodedData.doctorId);
//             setDoctorData(res.data);
//           }
//         }
//       } catch (error) {
//         console.error("Error loading appointment or doctor data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAppointmentAndDoctor();
//   }, [searchParams]);

//   const handleDownloadReceipt = async () => {
//     const element = document.getElementById("receipt-content");
//     if (!element) return toast.error("Receipt element not found.");

//     try {
//       const blob = await domtoimage.toBlob(element);
//       const img = new Image();
//       img.src = URL.createObjectURL(blob);
//       img.onload = () => {
//         const pdf = new jsPDF("p", "mm", "a4");
//         const pdfWidth = pdf.internal.pageSize.getWidth();
//         const pdfHeight = (img.height * pdfWidth) / img.width;
//         pdf.addImage(img, "PNG", 0, 0, pdfWidth, pdfHeight);
//         pdf.save(`Appointment_Receipt_${appointmentData?.razorpay?.paymentId || "unknown"}.pdf`);
//         toast.success("Receipt downloaded successfully!");
//       };
//     } catch (error) {
//       console.error("Error generating receipt:", error);
//       toast.error("Failed to download receipt. Try again later.");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
//       </div>
//     );
//   }

//   if (!appointmentData || !doctorData) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center p-4">
//         <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
//         <p className="text-gray-600 mb-4">Unable to load appointment or doctor details</p>
//         <Link href="/">
//           <Button className="bg-teal-600 hover:bg-teal-700">Return to Home</Button>
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mb-[100px]">
//       <motion.div
//         id="receipt-content"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8"
//       >
//         <div className="text-center mb-8">
//           <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">Appointment Confirmed!</h1>
//           <p className="text-gray-600">Your appointment has been successfully booked</p>
//         </div>

//         <div className="space-y-6">
//           <div className="bg-gray-50 p-4 rounded-lg">
//             <h2 className="text-xl font-semibold text-gray-900 mb-4">Doctor Details</h2>
//             <div className="grid grid-cols-2 gap-4">
//               <p>
//                 <span className="font-medium">Name:</span> Dr. {doctorData.firstName} {doctorData.lastName}
//               </p>
//               <p>
//                 <span className="font-medium">Specialization:</span> {doctorData.specialization}
//               </p>
//             </div>
//           </div>

//           <div className="bg-gray-50 p-4 rounded-lg">
//             <h2 className="text-xl font-semibold text-gray-900 mb-4">Appointment Details</h2>
//             <div className="grid grid-cols-2 gap-4">
//               <p>
//                 <span className="font-medium">Appointment Id:</span> {appointmentData._id}
//               </p>
//               <p>
//                 <span className="font-medium">Time:</span> {appointmentData.timeSlot}
//               </p>
//               <p>
//                 <span className="font-medium">Date:</span>{" "}
//                 {new Date(appointmentData.appointmentDate).toLocaleDateString("en-US", {
//                   weekday: "long",
//                   year: "numeric",
//                   month: "long",
//                   day: "numeric",
//                 })}
//               </p>
//               <p>
//                 <span className="font-medium">Status:</span>{" "}
//                 <span className="text-green-600 font-medium">Confirmed</span>
//               </p>
//             </div>
//           </div>

//           <div className="bg-gray-50 p-4 rounded-lg">
//             <h2 className="text-xl font-semibold text-gray-900 mb-4">Vitals</h2>
//             <div className="grid grid-cols-2 gap-4">
//               <p>
//                 <span className="font-medium">Blood Pressure:</span> {appointmentData.vitals?.bp}
//               </p>
//               <p>
//                 <span className="font-medium">Blood Sugar:</span> {appointmentData.vitals?.sugar}
//               </p>
//               <p>
//                 <span className="font-medium">Height:</span> {appointmentData.vitals?.height} cm
//               </p>
//               <p>
//                 <span className="font-medium">Weight:</span> {appointmentData.vitals?.weight} kg
//               </p>
//             </div>
//           </div>

//           <div className="bg-gray-50 p-4 rounded-lg">
//             <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Details</h2>
//             <div className="flex flex-col sm:grid sm:grid-cols-2 gap-4">
//               <p>
//                 <span className="font-medium">Amount:</span> ₹
//                 {appointmentData.payment?.amount?.toLocaleString("en-IN") || "---"}
//               </p>
//               <p>
//                 <span className="font-medium">Status:</span>{" "}
//                 <span className="text-green-600 font-medium">Paid</span>
//               </p>
//               <div className="flex flex-col break-all sm:col-span-2">
//                 <span className="font-medium">Order ID:</span>
//                 <span className="text-sm text-gray-700 font-mono">
//                   {appointmentData.razorpay?.orderId || "---"}
//                 </span>
//               </div>
//               <div className="flex flex-col break-all sm:col-span-2">
//                 <span className="font-medium">Payment ID:</span>
//                 <span className="text-sm text-gray-700 font-mono">
//                   {appointmentData.razorpay?.paymentId || "---"}
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Video Consultation */}
//           {appointmentData.meetLink && (
//             <div className="bg-gray-50 p-4 rounded-lg">
//               <h2 className="text-xl font-semibold text-gray-900 mb-4">Video Consultation Link</h2>
//               <a
//                 href={appointmentData.meetLink}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-blue-600 hover:underline break-all"
//               >
//                 {appointmentData.meetLink}
//               </a>
//             </div>
//           )}
//         </div>

//         <div className="mt-8 text-center">
//           <Button className="bg-teal-600 hover:bg-teal-700" onClick={handleDownloadReceipt}>
//             Download Receipt
//           </Button>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default SuccessPage;


"use client";
import { Suspense } from "react";
import { useAppointmentData } from "@/hooks/useAppointmentData";
import { downloadReceipt } from "@/utils/downloadReceipt";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ErrorScreen } from "@/components/ErrorScreen";
import Receipt from "./Receipt";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const SuccessContent = () => {
  const { appointmentData, doctorData, loading } = useAppointmentData();

  if (loading) return <LoadingSpinner />;
  if (!appointmentData || !doctorData) return <ErrorScreen />;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mb-[100px]">
      <motion.div
        id="receipt-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8"
      >
        <div className="text-center mb-8">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Appointment Confirmed!</h1>
          <p className="text-gray-600">Your appointment has been successfully booked</p>
        </div>
        <Receipt doctorData={doctorData} appointmentData={appointmentData} />
        <div className="flex justify-end mt-6">
          <Button onClick={() => downloadReceipt(appointmentData)} className="bg-teal-600 hover:bg-teal-700">
            Download Receipt
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

const SuccessPage = () => (
  <Suspense fallback={<LoadingSpinner />}>
    <SuccessContent />
  </Suspense>
);

export default SuccessPage;
