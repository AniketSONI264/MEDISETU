// // Receipt.jsx
// export default function Receipt({ appointmentData }) {
//     const {
//       patient = {},
//       doctor = {},
//       razorpay = {},
//       date,
//       time,
//       paymentAmount,
//     } = appointmentData || {};
  
//     return (
//       <div
//         id="receipt-content"
//         className="max-w-[800px] mx-auto bg-white shadow-xl rounded-xl p-8 text-gray-800 font-sans"
//       >
//         {/* Header */}
//         <div className="flex items-center justify-between border-b pb-4 mb-6">
//           <div>
//             <h1 className="text-3xl font-bold text-blue-600">MediSetu</h1>
//             <p className="text-sm text-gray-500">Appointment Receipt</p>
//           </div>
//           <div className="text-right">
//             <p className="text-sm">Date: {new Date().toLocaleDateString()}</p>
//             <p className="text-sm">Receipt #: <span className="font-semibold">{razorpay?.paymentId || 'N/A'}</span></p>
//           </div>
//         </div>
  
//         {/* Patient Info */}
//         <div className="mb-6">
//           <h2 className="text-xl font-semibold mb-2">Patient Information</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
//             <p><span className="font-semibold">Name:</span> {patient.name || "N/A"}</p>
//             <p><span className="font-semibold">Email:</span> {patient.email || "N/A"}</p>
//             <p><span className="font-semibold">Phone:</span> {patient.phone || "N/A"}</p>
//             <p><span className="font-semibold">Gender:</span> {patient.gender || "N/A"}</p>
//           </div>
//         </div>
  
//         {/* Doctor Info */}
//         <div className="mb-6">
//           <h2 className="text-xl font-semibold mb-2">Doctor Information</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
//             <p><span className="font-semibold">Name:</span> Dr. {doctor.firstName} {doctor.lastName}</p>
//             <p><span className="font-semibold">Specialization:</span> {doctor.specialization || "N/A"}</p>
//             <p><span className="font-semibold">Experience:</span> {doctor.experience} years</p>
//             <p><span className="font-semibold">Language:</span> {doctor.languagesSpoken?.join(', ')}</p>
//           </div>
//         </div>
  
//         {/* Appointment Info */}
//         <div className="mb-6">
//           <h2 className="text-xl font-semibold mb-2">Appointment Details</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
//             <p><span className="font-semibold">Date:</span> {date}</p>
//             <p><span className="font-semibold">Time:</span> {time}</p>
//             <p><span className="font-semibold">Consultation Fee:</span> ₹{paymentAmount || doctor.consultationFees}</p>
//             <p><span className="font-semibold">Payment Mode:</span> Online (Razorpay)</p>
//           </div>
//         </div>
  
//         {/* Payment Info */}
//         <div className="mb-6">
//           <h2 className="text-xl font-semibold mb-2">Payment Information</h2>
//           <div className="text-sm space-y-1">
//             <p><span className="font-semibold">Payment ID:</span> {razorpay?.paymentId || "N/A"}</p>
//             <p><span className="font-semibold">Order ID:</span> {razorpay?.orderId || "N/A"}</p>
//             <p><span className="font-semibold">Status:</span> ✅ Paid</p>
//           </div>
//         </div>
  
//         {/* Footer */}
//         <div className="border-t pt-4 mt-6 text-center text-sm text-gray-500">
//           <p>Thank you for choosing MediSetu. Wishing you good health!</p>
//           <p className="mt-1">www.medisetu.com | contact@medisetu.com</p>
//         </div>
//       </div>
//     );
//   }
  
'use client';
import React from 'react';

const Receipt = ({ appointmentData }) => {
  if (!appointmentData) return <div>No receipt data available</div>;

  const {
    patientName, doctorName, appointmentDate, appointmentTime,
    fees, appointmentId, department, email, phone
  } = appointmentData;

  const formattedDate = new Intl.DateTimeFormat('en-IN', { dateStyle: 'full' }).format(new Date(appointmentDate));
  const formattedTime = new Intl.DateTimeFormat('en-IN', { timeStyle: 'short' }).format(new Date(`${appointmentDate}T${appointmentTime}`));

  return (
    <div className="max-w-xl mx-auto px-4 print:px-0">
      <button
        onClick={() => window.print()}
        className="bg-blue-600 text-white px-4 py-2 rounded-md mb-4 hover:bg-blue-700 print:hidden"
      >
        Print Receipt
      </button>

      <div
        id="receipt-content"
        className="bg-white shadow-lg rounded-xl p-6 text-gray-800 border border-gray-300 print:border-none print:shadow-none"
      >
        <h2 className="text-2xl font-semibold text-center mb-4">Appointment Receipt</h2>

        <div className="border-b border-gray-300 pb-4 mb-4">
          <p><strong>Receipt ID:</strong> {appointmentId}</p>
          <p><strong>Date:</strong> {formattedDate}</p>
          <p><strong>Time:</strong> {formattedTime}</p>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold text-lg mb-2">Patient Information</h3>
          <p><strong>Name:</strong> {patientName}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Phone:</strong> {phone}</p>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold text-lg mb-2">Doctor Details</h3>
          <p><strong>Doctor:</strong> {doctorName}</p>
          <p><strong>Department:</strong> {department}</p>
        </div>

        <div className="bg-gray-100 p-4 rounded mt-4">
          <p className="text-lg font-bold">Total Fee: ₹{fees}</p>
        </div>
      </div>
    </div>
  );
};

export default Receipt;
