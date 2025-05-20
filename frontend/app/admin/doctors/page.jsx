
// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { motion } from 'framer-motion';
// import { ShieldCheck, ShieldX, Search } from 'lucide-react';
// import toast from 'react-hot-toast';

// import AdminPageWrapper from '@/components/admin/AdminPageWrapper';
// import Table from '@/components/ui/table';
// import { useAuth } from '@/context/AuthContext';
// import useAdminDoctors from '@/hooks/admin/useAdminDoctors';

// export default function DoctorsManagement() {
//   const router = useRouter();
//   const { user } = useAuth();

//   const { doctors, loading, error,toggleVerification  ,refetch } = useAdminDoctors();
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filter, setFilter] = useState('all');

//   useEffect(() => {
//     if (error) {
//       toast.error(error);
//     }
//   }, [error]);

//   // const handleVerifyDoctor = (id, isVerified) => {
//   //   verifyDoctor(id, isVerified).then((response) => {
//   //     console.log("Doctor verification successful:", response);
//   //   }).catch((err) => {
//   //     console.error("Verification failed:", err);
//   //   });
//   // };

//   // const handleVerifyDoctor = (doctor) => {
//   //   toggleVerification(doctor._id, doctor.isVerified);
//   // };

//   const handleVerifyDoctor = async (doctorId) => {
//     const doctor = doctors.find(d => d._id === doctorId);
//     if (!doctor) return;
  
//     const res = await toggleVerification(doctorId, doctor.isVerified);
    
//     if (res?.success) {
//       toast.success(`Doctor ${doctor.isVerified ? 'unverified' : 'verified'} successfully.`);
//     } else {
//       toast.error("Something went wrong.");
//     }
//   };

//   const handleViewDetails = (id) => {
//     router.push(`/admin/doctors/${id}`);
//   };

//   const handleSearch = (query) => setSearchQuery(query);
//   const handleFilterChange = (value) => setFilter(value);

//   const filteredDoctors = doctors.filter((doctor) => {
//     const fullName = `${doctor.firstName} ${doctor.lastName}`.toLowerCase();
//     const matchesSearch =
//       fullName.includes(searchQuery.toLowerCase()) ||
//       doctor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       doctor.clinicName?.toLowerCase().includes(searchQuery.toLowerCase());

//     const matchesFilter =
//       filter === 'all' ||
//       (filter === 'verified' && doctor.isVerified) ||
//       (filter === 'unverified' && !doctor.isVerified);

//     return matchesSearch && matchesFilter;
//   });

//   const columns = [
//     {
//       key: 'name',
//       label: 'Name',
//       render: (row) => (
//         <div className="flex items-center gap-3">
//           <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
//             <img
//               src={row.profilePic || '/MediSetu Logo White.svg'}
//               alt={`${row.firstName} ${row.lastName}`}
//               className="w-full h-full object-cover"
//             />
//           </div>
//           <div>
//             <p className="font-medium">{`${row.firstName} ${row.lastName}`}</p>
//             <p className="text-sm text-gray-500">{row.specialization}</p>
//           </div>
//         </div>
//       ),
//     },
//     { key: 'email', label: 'Email' },
//     { key: 'clinicName', label: 'Clinic' },
//     {
//       key: 'status',
//       label: 'Status',
//       render: (row) => (
//         <div className="flex items-center gap-2">
//           {row.isVerified ? (
//             <span className="flex items-center gap-1 text-green-600">
//               <ShieldCheck size={16} />
//               Verified
//             </span>
//           ) : (
//             <span className="flex items-center gap-1 text-red-600">
//               <ShieldX size={16} />
//               Unverified
//             </span>
//           )}
//         </div>
//       ),
//     },
//     {
//       key: 'actions',
//       label: 'Actions',
//       render: (row) => (
//         <div className="flex items-center gap-2">
//           <button
//             onClick={() => handleVerifyDoctor(row._id)}
//             className={`px-3 py-1 rounded-lg text-sm font-medium ${
//               row.isVerified
//                 ? 'bg-red-100 text-red-600 hover:bg-red-200'
//                 : 'bg-green-100 text-green-600 hover:bg-green-200'
//             }`}
//           >
//             {row.isVerified ? 'Unverify' : 'Verify'}
//           </button>
//           <button
//             onClick={() => handleViewDetails(row._id)}
//             className="px-3 py-1 rounded-lg text-sm font-medium bg-blue-100 text-blue-600 hover:bg-blue-200"
//           >
//             View Details
//           </button>
//         </div>
//       ),
//     },
//   ];

//   if (loading) {
//     return (
//       <AdminPageWrapper title="Doctors Management">
//         <div className="flex items-center justify-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//         </div>
//       </AdminPageWrapper>
//     );
//   }

//   return (
//     <AdminPageWrapper title="Doctors Management">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.3 }}
//         className="space-y-6 mt-[100px]"
//       >
//         {/* 🔍 Search and Filter Controls */}
//         <div className="flex flex-col md:flex-row gap-4">
//           <div className="flex-1 relative">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
//             <input
//               type="text"
//               placeholder="Search doctors..."
//               value={searchQuery}
//               onChange={(e) => handleSearch(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div className="w-full md:w-48">
//             <select
//               value={filter}
//               onChange={(e) => handleFilterChange(e.target.value)}
//               className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="all">All Doctors</option>
//               <option value="verified">Verified</option>
//               <option value="unverified">Unverified</option>
//             </select>
//           </div>
//         </div>

//         {/* 📊 Doctors Table */}
//         <div className="overflow-x-auto -mx-4 sm:mx-0">
//           <div className="inline-block min-w-full align-middle px-4 sm:px-0">
//             <Table columns={columns} data={filteredDoctors} className="w-full" />
//           </div>
//         </div>
//       </motion.div>
//     </AdminPageWrapper>
//   );
// }



// pages/admin/doctors/page.jsx

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

import AdminPageWrapper from '@/components/admin/AdminPageWrapper';
import Table from '@/components/ui/table';
import { useAuth } from '@/context/AuthContext';
import useAdminDoctors from '@/hooks/admin/useAdminDoctors';
import SearchBar from '@/components/ui/SearchBar';
import FilterSelect from '@/components/ui/FilterSelect';
import StatusBadge from '@/components/ui/StatusBadge';
import ActionButtons from '@/components/ui/ActionButtons';

export default function DoctorsManagement() {
  const router = useRouter();
  const { user } = useAuth();
  const { doctors, loading, error, toggleVerification, refetch } = useAdminDoctors();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleVerifyDoctor = async (doctorId) => {
    const doctor = doctors.find(d => d._id === doctorId);
    if (!doctor) return;
    
    const res = await toggleVerification(doctorId, doctor.isVerified);
    
    if (res?.success) {
      toast.success(`Doctor ${doctor.isVerified ? 'unverified' : 'verified'} successfully.`);
    } else {
      toast.error("Something went wrong.");
    }
  };

  const handleViewDetails = (id) => router.push(`/admin/doctors/${id}`);
  const handleSearch = (query) => setSearchQuery(query);
  const handleFilterChange = (value) => setFilter(value);

  const filteredDoctors = doctors.filter((doctor) => {
    const fullName = `${doctor.firstName} ${doctor.lastName}`.toLowerCase();
    const matchesSearch =
      fullName.includes(searchQuery.toLowerCase()) ||
      doctor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.clinicName?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      filter === 'all' ||
      (filter === 'verified' && doctor.isVerified) ||
      (filter === 'unverified' && !doctor.isVerified);

    return matchesSearch && matchesFilter;
  });

  const columns = [
    {
      key: 'name',
      label: 'Name',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
            <img
              src={row.profilePic || '/MediSetu Logo White.svg'}
              alt={`${row.firstName} ${row.lastName}`}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="font-medium">{`${row.firstName} ${row.lastName}`}</p>
            <p className="text-sm text-gray-500">{row.specialization}</p>
          </div>
        </div>
      ),
    },
    { key: 'email', label: 'Email' },
    { key: 'clinicName', label: 'Clinic' },
    {
      key: 'status',
      label: 'Status',
      render: (row) => <StatusBadge isVerified={row.isVerified} />,
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <ActionButtons
          onVerify={() => handleVerifyDoctor(row._id)}
          onViewDetails={() => handleViewDetails(row._id)}
          isVerified={row.isVerified}
        />
      ),
    },
  ];

  if (loading) {
    return (
      <AdminPageWrapper title="Doctors Management">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </AdminPageWrapper>
    );
  }

  return (
    <div className="mt-10"> 
    <AdminPageWrapper title="Doctors Management">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-6 mt-[50px] "
      >
        {/* 🔍 Search and Filter Controls */}
        <div className="flex flex-col md:flex-row gap-4">
          <SearchBar searchQuery={searchQuery} onSearchChange={handleSearch} />
          <FilterSelect filter={filter} onFilterChange={handleFilterChange} />
        </div>

        {/* 📊 Doctors Table */}
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="inline-block min-w-full align-middle px-4 sm:px-0">
            <Table columns={columns} data={filteredDoctors} className="w-full" />
          </div>
        </div>
      </motion.div>
    </AdminPageWrapper>
    </div>
  );
}
