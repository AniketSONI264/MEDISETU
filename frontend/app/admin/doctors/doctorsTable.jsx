'use client';

import React from 'react';
import { ShieldCheck, ShieldX } from 'lucide-react';
import useToggleDoctorVerification from "@/hooks/admin/doctorToggle";
import useAdminDoctors from "@/hooks/admin/useAdminDoctors";

export default function DoctorsTable({ doctors, onVerifyToggle }) {
    const { doctors, loading, refetch } = useAdminDoctors();
    const { toggleVerification } = useToggleDoctorVerification();

    const handleVerifyToggle = async (id, currentStatus) => {
        const result = await toggleVerification(id, !currentStatus);
        if (result) {
          refetch(); // Only refetch if the toggle actually succeeded
        }
      };
      
    
      if (loading) return <p>Loading doctors...</p>;
    
  return (
    <div className="overflow-x-auto bg-white dark:bg-gray-900 rounded-lg shadow-md">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr className="text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
            <th className="px-4 py-3">Photo</th>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Phone</th>
            <th className="px-4 py-3">Specialization</th>
            <th className="px-4 py-3">Experience</th>
            <th className="px-4 py-3">Qualification</th>
            <th className="px-4 py-3">Fee</th>
            <th className="px-4 py-3">Availability</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-800 text-sm">
          {doctors.map((doc) => (
            <tr key={doc._id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
              <td className="px-4 py-3">
                <img
                  src={doc.profilePic || '/MediSetu Logo White.svg'}
                  alt={`${doc.firstName} ${doc.lastName}`}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </td>
              <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">
                {doc.firstName} {doc.lastName}
              </td>
              <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{doc.email}</td>
              <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{doc.phone}</td>
              <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{doc.specialization}</td>
              <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{doc.experience} yrs</td>
              <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{doc.qualification}</td>
              <td className="px-4 py-3 text-gray-700 dark:text-gray-300">₹{doc.consultationFees}</td>
              <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                {doc.availableTimings?.length
                  ? doc.availableTimings.map(t => `${t.day}: ${t.start} - ${t.end}`).join(', ')
                  : 'N/A'}
              </td>
              <td className="px-4 py-3">
                {doc.isVerified ? (
                  <span className="inline-flex items-center px-2 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
                    <ShieldCheck size={14} className="mr-1" />
                    Verified
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2 py-1 text-xs font-semibold text-red-700 bg-red-100 rounded-full">
                    <ShieldX size={14} className="mr-1" />
                    Unverified
                  </span>
                )}
              </td>
              <td className="px-4 py-3">
                <button
                  onClick={() => onVerifyToggle(doc._id)}
                  className={`text-sm px-3 py-1 rounded-lg font-medium ${
                    doc.isVerified
                      ? 'bg-red-100 text-red-700 hover:bg-red-200'
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  {doc.isVerified ? 'Unverify' : 'Verify'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
