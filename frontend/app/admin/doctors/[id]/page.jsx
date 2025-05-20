// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import AdminPageWrapper from '@/components/admin/AdminPageWrapper';
// import { motion } from 'framer-motion';
// import { ShieldCheck, ShieldX, Mail, Phone, Calendar, DollarSign, Award } from 'lucide-react';
// import toast from 'react-hot-toast';
// import useAdminDoctors from '@/hooks/admin/useAdminDoctors';

// export default function DoctorDetails({ params }) {
//   const router = useRouter();
//   const { doctors, loading, toggleVerification, error, refetch } = useAdminDoctors();
//   const [doctor, setDoctor] = useState(null);

//   useEffect(() => {
//     const foundDoctor = doctors.find(doc => doc._id === params.id);
//     if (!loading && !foundDoctor) {
//       toast.error('Doctor not found');
//       router.push('/admin/doctors');
//     } else {
//       setDoctor(foundDoctor);
//     }
//   }, [doctors, loading, params.id, router]);

//   const handleVerifyDoctor = async () => {
//     if (!doctor) return;
//     const result = await toggleVerification(doctor._id, doctor.isVerified);
//     if (result?.success) {
//       toast.success('Doctor verification status updated');
//       refetch(); // optional: ensure sync with server
//     } else {
//       toast.error('Failed to update verification status');
//     }
//   };

//   if (loading || !doctor) {
//     return (
//       <AdminPageWrapper title="Doctor Details">
//         <div className="flex items-center justify-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//         </div>
//       </AdminPageWrapper>
//     );
//   }

//   return (
//     <AdminPageWrapper title="Doctor Details">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.3 }}
//         className="space-y-6"
//       >
//         <div className="flex flex-col md:flex-row gap-6">
//           <div className="w-full md:w-1/3">
//             <div className="bg-white rounded-lg shadow-md p-6">
//               <div className="flex flex-col items-center">
//                 <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden mb-4">
//                   <img
//                     src={doctor.profilePic || '/MediSetu Logo White.svg'}
//                     alt={doctor.name}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//                 <h2 className="text-2xl font-bold text-gray-900">{doctor.name}</h2>
//                 <p className="text-gray-600">{doctor.specialization}</p>
//                 <div className="mt-4">
//                   <span
//                     className={`px-3 py-1 rounded-full text-sm font-medium ${
//                       doctor.isVerified
//                         ? 'bg-green-100 text-green-600'
//                         : 'bg-red-100 text-red-600'
//                     }`}
//                   >
//                     {doctor.isVerified ? 'Verified' : 'Unverified'}
//                   </span>
//                 </div>
//               </div>

//               <div className="mt-6 space-y-4 text-sm text-gray-600">
//                 <div className="flex items-center gap-2">
//                   <Mail size={16} />
//                   <span>{doctor.email}</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Phone size={16} />
//                   <span>{doctor.phone || 'Not provided'}</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <DollarSign size={16} />
//                   <span>Consultation Fee: ${doctor.consultationFee}</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Calendar size={16} />
//                   <span>{doctor.experience} years of experience</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Award size={16} />
//                   <span>License: {doctor.licenseNumber}</span>
//                 </div>
//               </div>

//               <div className="mt-6">
//                 <button
//                   onClick={handleVerifyDoctor}
//                   className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition ${
//                     doctor.isVerified
//                       ? 'bg-red-100 text-red-600 hover:bg-red-200'
//                       : 'bg-green-100 text-green-600 hover:bg-green-200'
//                   }`}
//                 >
//                   {doctor.isVerified ? 'Unverify Doctor' : 'Verify Doctor'}
//                 </button>
//               </div>
//             </div>
//           </div>

//           <div className="w-full md:w-2/3 space-y-6">
//             {doctor.education?.length > 0 && (
//               <div className="bg-white rounded-lg shadow-md p-6">
//                 <h3 className="text-lg font-semibold mb-4">Education</h3>
//                 <div className="space-y-4">
//                   {doctor.education.map((edu, index) => (
//                     <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
//                       <p className="font-medium">{edu.degree}</p>
//                       <p className="text-gray-600">{edu.institution}</p>
//                       <p className="text-sm text-gray-500">Year: {edu.year}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {doctor.availability?.length > 0 && (
//               <div className="bg-white rounded-lg shadow-md p-6">
//                 <h3 className="text-lg font-semibold mb-4">Availability</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {doctor.availability.map((slot, index) => (
//                     <div key={index} className="border rounded-lg p-4">
//                       <p className="font-medium">{slot.day}</p>
//                       <p className="text-gray-600">
//                         {slot.startTime} - {slot.endTime}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//         <div className="bg-white rounded-lg shadow-md p-6 space-y-2">
//   <h3 className="text-lg font-semibold">Bio & About</h3>
//   <p className="text-gray-800"><strong>Short Bio:</strong> {doctor.bio}</p>
//   <p className="text-gray-600"><strong>Detailed Bio:</strong> {doctor.detailedBio}</p>
// </div>


// <div className="bg-white rounded-lg shadow-md p-6 space-y-2">
//   <h3 className="text-lg font-semibold">Practice Details</h3>
//   <p><strong>Clinic:</strong> {doctor.clinicName || 'N/A'}</p>
//   <p><strong>Location:</strong> {doctor.location?.city}, {doctor.location?.state} - {doctor.location?.pincode}</p>
//   <p><strong>Consultation Mode:</strong> {doctor.consultationMode}</p>
//   <p><strong>Languages Spoken:</strong> {doctor.languagesSpoken?.join(', ') || 'N/A'}</p>
// </div>

// <div className="bg-white rounded-lg shadow-md p-6 space-y-2">
//   <h3 className="text-lg font-semibold">Doctor Settings</h3>
//   <p><strong>Max Appointments/Day:</strong> {doctor.maxAppointmentsPerDay || 'N/A'}</p>
//   <div className="flex flex-wrap gap-4 mt-2">
//     <span className={`px-2 py-1 rounded text-sm ${doctor.agreedToTerms ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
//       Agreed to Terms
//     </span>
//     <span className={`px-2 py-1 rounded text-sm ${doctor.consentForTelemedicine ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
//       Telemedicine Consent
//     </span>
//     <span className={`px-2 py-1 rounded text-sm ${doctor.consentToBeListed ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
//       Listed on Platform
//     </span>
//   </div>
// </div>
// {doctor.introVideo && (
//   <div className="bg-white rounded-lg shadow-md p-6">
//     <h3 className="text-lg font-semibold mb-2">Intro Video</h3>
//     <video controls className="w-full rounded-lg shadow">
//       <source src={doctor.introVideo} type="video/mp4" />
//       Your browser does not support the video tag.
//     </video>
//   </div>
// )}

// {(doctor.socialLinks?.linkedin || doctor.socialLinks?.website) && (
//   <div className="bg-white rounded-lg shadow-md p-6">
//     <h3 className="text-lg font-semibold mb-2">Social Links</h3>
//     <div className="flex flex-col space-y-2">
//       {doctor.socialLinks?.linkedin && <a href={doctor.socialLinks.linkedin} className="text-blue-600 hover:underline" target="_blank" rel="noreferrer">LinkedIn</a>}
//       {doctor.socialLinks?.website && <a href={doctor.socialLinks.website} className="text-blue-600 hover:underline" target="_blank" rel="noreferrer">Website</a>}
//     </div>
//   </div>
// )}
//   {doctor.licenseProofUrl && (
//   <div className="bg-white rounded-lg shadow-md p-6">
//     <h3 className="text-lg font-semibold mb-2">License Proof</h3>
//     <a href={doctor.licenseProofUrl} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
//       View License Document
//     </a>
//   </div>
// )}
//   {doctor.leaves?.length > 0 && (
//   <div className="bg-white rounded-lg shadow-md p-6">
//     <h3 className="text-lg font-semibold mb-4">Upcoming Leaves</h3>
//     <ul className="list-disc pl-4 text-sm text-gray-700">
//       {doctor.leaves.map((leave, index) => (
//         <li key={index}>
//           {leave.startDate} to {leave.endDate}
//         </li>
//       ))}
//     </ul>
//   </div>
// )}

//       </motion.div>
//     </AdminPageWrapper>
//   );
// }




'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminPageWrapper from '@/components/admin/AdminPageWrapper';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  ShieldX,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  Award,
  PlayCircle
} from 'lucide-react';
import toast from 'react-hot-toast';
import useAdminDoctors from '@/hooks/admin/useAdminDoctors';

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function DoctorDetails({ params }) {
  const router = useRouter();
  const { doctors, loading, toggleVerification, error, refetch } = useAdminDoctors();
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    const foundDoctor = doctors.find(doc => doc._id === params?.id);
    if (!loading && !foundDoctor) {
      toast.error('Doctor not found');
      router.push('/admin/doctors');
    } else {
      setDoctor(foundDoctor);
    }
  }, [doctors, loading, params?.id, router]);

  const handleVerifyDoctor = async () => {
    if (!doctor) return;
    const result = await toggleVerification(doctor._id, doctor.isVerified);
    if (result?.success) {
      toast.success('Doctor verification status updated');
      refetch();
    } else {
      toast.error('Failed to update verification status');
    }
  };

  if (loading || !doctor) {
    return (
      <AdminPageWrapper title="Doctor Details">
        <div className="flex items-center justify-center h-64">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
            className="rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"
          />
        </div>
      </AdminPageWrapper>
    );
  }

  return (
    // <AdminPageWrapper title="Doctor Details">
    //   <motion.div
    //     initial="hidden"
    //     animate="visible"
    //     variants={fadeIn}
    //     className="space-y-6"
    //   >
    //     {/* Doctor Basic Info */}
    //     <div className="flex flex-col md:flex-row gap-6">
    //       <motion.div
    //         variants={fadeIn}
    //         className="w-full md:w-1/3"
    //         whileHover={{ scale: 1.02 }}
    //         transition={{ type: 'spring', stiffness: 300 }}
    //       >
    //         <div className="bg-white rounded-xl shadow-md p-6">
    //           <div className="flex flex-col items-center text-center">
    //             <motion.div
    //               whileHover={{ rotate: 4, scale: 1.05 }}
    //               className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden mb-4 shadow-lg"
    //             >
    //               <img
    //                 src={doctor.profilePic || '/MediSetu Logo White.svg'}
    //                 alt={doctor.name}
    //                 className="w-full h-full object-cover"
    //               />
    //             </motion.div>
    //             <h2 className="text-2xl font-bold text-gray-900">{doctor.name}</h2>
    //             <p className="text-blue-500 font-medium">{doctor.specialization}</p>
    //             <motion.div
    //               initial={{ scale: 0.8 }}
    //               animate={{ scale: 1 }}
    //               className="mt-4 flex items-center gap-2"
    //             >
    //               {doctor.isVerified ? (
    //                 <ShieldCheck className="text-green-600" size={20} />
    //               ) : (
    //                 <ShieldX className="text-red-600" size={20} />
    //               )}
    //               <span
    //                 className={`px-3 py-1 rounded-full text-xs font-semibold ${
    //                   doctor.isVerified
    //                     ? 'bg-green-100 text-green-600'
    //                     : 'bg-red-100 text-red-600'
    //                 }`}
    //               >
    //                 {doctor.isVerified ? 'Verified' : 'Unverified'}
    //               </span>
    //             </motion.div>
    //           </div>

    //           {/* Contact & Info */}
    //           <div className="mt-6 space-y-4 text-sm text-gray-600">
    //             <p className="flex items-center gap-2">
    //               <Mail size={16} /> {doctor.email}
    //             </p>
    //             <p className="flex items-center gap-2">
    //               <Phone size={16} /> {doctor.phone || 'Not provided'}
    //             </p>
    //             <p className="flex items-center gap-2">
    //               <DollarSign size={16} /> Fee: ₹{doctor.consultationFees}
    //             </p>
    //             <p className="flex items-center gap-2">
    //               <Calendar size={16} /> {doctor.experience} yrs experience
    //             </p>
    //             <p className="flex items-center gap-2">
    //               <Award size={16} /> License: {doctor.licenseNumber}
    //             </p>
    //           </div>

    //           <motion.button
    //             whileTap={{ scale: 0.95 }}
    //             whileHover={{ scale: 1.02 }}
    //             onClick={handleVerifyDoctor}
    //             className={`w-full mt-6 px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-sm ${
    //               doctor.isVerified
    //                 ? 'bg-red-100 text-red-600 hover:bg-red-200'
    //                 : 'bg-green-100 text-green-600 hover:bg-green-200'
    //             }`}
    //           >
    //             {doctor.isVerified ? 'Unverify Doctor' : 'Verify Doctor'}
    //           </motion.button>
    //         </div>
    //       </motion.div>

    //       {/* Education + Availability */}
    //       <div className="w-full md:w-2/3 space-y-6">
    //         {doctor.education?.length > 0 && (
    //           <motion.div variants={fadeIn} className="bg-white rounded-xl shadow-md p-6">
    //             <h3 className="text-lg font-semibold mb-4">Education</h3>
    //             <div className="space-y-3">
    //               {doctor.education.map((edu, index) => (
    //                 <div key={index} className="border-b border-gray-200 pb-3 last:border-0">
    //                   <p className="font-medium">{edu.degree}</p>
    //                   <p className="text-gray-600">{edu.institution}</p>
    //                   <p className="text-xs text-gray-500">Year: {edu.year}</p>
    //                 </div>
    //               ))}
    //             </div>
    //           </motion.div>
    //         )}

    //         {doctor.availability?.length > 0 && (
    //           <motion.div variants={fadeIn} className="bg-white rounded-xl shadow-md p-6">
    //             <h3 className="text-lg font-semibold mb-4">Availability</h3>
    //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    //               {doctor.availability.map((slot, index) => (
    //                 <motion.div
    //                   key={index}
    //                   whileHover={{ scale: 1.02 }}
    //                   className="border rounded-lg p-4"
    //                 >
    //                   <p className="font-medium">{slot.day}</p>
    //                   <p className="text-gray-600">
    //                     {slot.startTime} - {slot.endTime}
    //                   </p>
    //                 </motion.div>
    //               ))}
    //             </div>
    //           </motion.div>
    //         )}
    //       </div>
    //     </div>

    //     {/* Bio Section */}
    //     <motion.div variants={fadeIn} className="bg-white rounded-xl shadow-md p-6 space-y-2">
    //       <h3 className="text-lg font-semibold">Bio & About</h3>
    //       <p className="text-gray-800">
    //         <strong>Short Bio:</strong> {doctor.bio}
    //       </p>
    //       <p className="text-gray-600">
    //         <strong>Detailed Bio:</strong> {doctor.detailedBio}
    //       </p>
    //     </motion.div>

    //     {/* Practice Section */}
    //     <motion.div variants={fadeIn} className="bg-white rounded-xl shadow-md p-6 space-y-2">
    //       <h3 className="text-lg font-semibold">Practice Details</h3>
    //       <p>
    //         <strong>Clinic:</strong> {doctor.clinicName || 'N/A'}
    //       </p>
    //       <p>
    //         <strong>Location:</strong> {doctor.location?.city}, {doctor.location?.state} -{' '}
    //         {doctor.location?.pincode}
    //       </p>
    //       <p>
    //         <strong>Consultation Mode:</strong> {doctor.consultationMode}
    //       </p>
    //       <p>
    //         <strong>Languages Spoken:</strong> {doctor.languagesSpoken?.join(', ') || 'N/A'}
    //       </p>
    //     </motion.div>

    //     {/* Settings */}
    //     <motion.div variants={fadeIn} className="bg-white rounded-xl shadow-md p-6 space-y-2">
    //       <h3 className="text-lg font-semibold">Doctor Settings</h3>
    //       <p>
    //         <strong>Max Appointments/Day:</strong>{' '}
    //         {doctor.maxAppointmentsPerDay || 'N/A'}
    //       </p>
    //       <div className="flex flex-wrap gap-4 mt-2">
    //         {[
    //           { label: 'Agreed to Terms', value: doctor.agreedToTerms },
    //           { label: 'Telemedicine Consent', value: doctor.consentForTelemedicine },
    //           { label: 'Listed on Platform', value: doctor.consentToBeListed },
    //         ].map((item, i) => (
    //           <span
    //             key={i}
    //             className={`px-2 py-1 rounded text-sm ${
    //               item.value ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
    //             }`}
    //           >
    //             {item.label}
    //           </span>
    //         ))}
    //       </div>
    //     </motion.div>

    //     {/* Intro Video */}
    //     {doctor.introVideo && (
    //       <motion.div variants={fadeIn} className="bg-white rounded-xl shadow-md p-6">
    //         <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
    //           <PlayCircle size={18} className="text-blue-500" />
    //           Intro Video
    //         </h3>
    //         <video
    //           controls
    //           className="w-full rounded-xl shadow-sm"
    //           src={doctor.introVideo}
    //         />
    //       </motion.div>
    //     )}
    //   </motion.div>
    // </AdminPageWrapper>
    <AdminPageWrapper title="Doctor Details">
  <motion.div
    initial="hidden"
    animate="visible"
    variants={fadeIn}
    className="flex flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8"
  >
    {/* Doctor Info Section */}
    <div className="flex flex-col lg:flex-row gap-6 w-full">
      {/* Profile Card */}
      <motion.div
        variants={fadeIn}
        className="w-full lg:w-1/3"
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <div className="bg-white rounded-2xl shadow p-6 space-y-6">
          <div className="flex flex-col items-center text-center">
            <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg mb-4 bg-gray-200">
              <img
                src={doctor.profilePic || '/MediSetu Logo White.svg'}
                alt={doctor.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">{doctor.name}</h2>
            <p className="text-blue-600 font-medium">{doctor.specialization}</p>
            <div className="mt-2 flex items-center gap-2">
              {doctor.isVerified ? (
                <ShieldCheck className="text-green-600" size={20} />
              ) : (
                <ShieldX className="text-red-600" size={20} />
              )}
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${doctor.isVerified ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                {doctor.isVerified ? 'Verified' : 'Unverified'}
              </span>
            </div>
          </div>

          <div className="text-sm text-gray-600 space-y-3">
            <p className="flex items-center gap-2">
              <Mail size={16} /> {doctor.email}
            </p>
            <p className="flex items-center gap-2">
              <Phone size={16} /> {doctor.phone || 'Not provided'}
            </p>
            <p className="flex items-center gap-2">
              <DollarSign size={16} /> Fee: ₹{doctor.consultationFees}
            </p>
            <p className="flex items-center gap-2">
              <Calendar size={16} /> {doctor.experience} yrs experience
            </p>
            <p className="flex items-center gap-2">
              <Award size={16} /> License: {doctor.licenseNumber || "MEDISETU CERTIFIED"}
            </p>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            onClick={handleVerifyDoctor}
            className={`w-full px-4 py-2 rounded-lg text-sm font-semibold shadow-sm transition-all ${
              doctor.isVerified
                ? 'bg-red-100 text-red-600 hover:bg-red-200'
                : 'bg-green-100 text-green-600 hover:bg-green-200'
            }`}
          > 
            {doctor.isVerified ? 'Unverify Doctor' : 'Verify Doctor'}
          </motion.button>
        </div>
      </motion.div>

      {/* Education & Availability */}
      <div className="flex-1 flex flex-col gap-6">
        {doctor.education?.length > 0 && (
          <motion.div variants={fadeIn} className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Education</h3>
            <div className="space-y-4">
              {doctor.education.map((edu, index) => (
                <div key={index} className="border-b pb-3 last:border-b-0">
                  <p className="font-medium">{edu.degree}</p>
                  <p className="text-gray-600">{edu.institution}</p>
                  <p className="text-xs text-gray-500">Year: {edu.year}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {doctor.availability?.length > 0 && (
          <motion.div variants={fadeIn} className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Availability</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {doctor.availability.map((slot, index) => (
                <div key={index} className="border rounded-lg p-4 hover:shadow-md transition">
                  <p className="font-medium">{slot.day}</p>
                  <p className="text-gray-600">
                    {slot.startTime} - {slot.endTime}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>

    {/* Bio Section */}
    <motion.div variants={fadeIn} className="bg-white rounded-2xl shadow p-6 space-y-2">
      <h3 className="text-lg font-semibold">Bio & About</h3>
      <p className="text-gray-800"><strong>Short Bio:</strong> {doctor.detailedBio}</p>
      <p className="text-gray-600"><strong>Detailed Bio:</strong> {doctor.bio}</p>
    </motion.div>

    {/* Practice Section */}
    <motion.div variants={fadeIn} className="bg-white rounded-2xl shadow p-6 space-y-2">
      <h3 className="text-lg font-semibold">Practice Details</h3>
      <p><strong>Clinic:</strong> {doctor.clinicName || 'N/A'}</p>
      <p><strong>Location:</strong> {doctor.location?.city}, {doctor.location?.state} - {doctor.location?.pincode}</p>
      <p><strong>Consultation Mode:</strong> {doctor.consultationMode}</p>
      <p><strong>Languages Spoken:</strong> {doctor.languageSpoken?.join(', ')}</p>
    </motion.div>
  </motion.div>
</AdminPageWrapper>

  );
}
