
'use client';

import AdminPageWrapper from '@/components/admin/AdminPageWrapper';
import Table from '@/components/ui/Table';
import SearchInput from '@/components/ui/SearchInput';
import Select from '@/components/ui/Select';
import { Calendar, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

import useAdminAppointments from '@/hooks/admin/useAdminAppointments';
import { useAdminAccess } from '@/hooks/useAdminAccess';

export default function AppointmentsManagement() {
  const { isAdmin, isLoading: authLoading } = useAdminAccess();
  // const [searchQuery, setSearchQuery] = useState("");

  const {
    appointments,
    loading,
    error,
    updateStatus,
    searchQuery,
    setSearchQuery,
    filter,
    setFilter,
    filteredAppointments,
  } = useAdminAppointments();

  // LOG: Initial data
  console.log('🔍 Appointments fetched:', appointments);
  console.log('🔎 Filtered appointments:', filteredAppointments);
  console.log('🔐 isAdmin:', isAdmin, '| authLoading:', authLoading);

  const handleUpdateStatus = async (id, status) => {
    console.log(`🛠 Attempting to update appointment ${id} to "${status}"`);
    try {
      await updateStatus(id, status);
      toast.success('Appointment status updated');
      console.log(`✅ Successfully updated status of appointment ${id} to "${status}"`);
    } catch (err) {
      console.error(`❌ Failed to update appointment ${id} to "${status}"`, err);
      toast.error('Failed to update appointment status');
    }
  };

  const columns = [
    {
      key: 'patient',
      label: 'Patient',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
            <img
              src={row.patient.profilePic || '/MediSetu Logo White.svg'}
              alt={row.patient.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="font-medium">{row.patient.name}</p>
            <p className="text-sm text-gray-500">{row.patient.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'doctor',
      label: 'Doctor',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
            <img
              src={row.doctor.profilePic || '/MediSetu Logo White.svg'}
              alt={row.doctor.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="font-medium">{row.doctor.name}</p>
            <p className="text-sm text-gray-500">{row.doctor.specialization}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'date',
      label: 'Date & Time',
      render: (row) => (
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-gray-500" />
          <span>{new Date(row.date).toLocaleDateString()}</span>
          <Clock size={16} className="text-gray-500 ml-2" />
          <span>{row.time}</span>
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (row) => (
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            row.status === 'completed'
              ? 'bg-green-100 text-green-600'
              : row.status === 'cancelled'
              ? 'bg-red-100 text-red-600'
              : 'bg-yellow-100 text-yellow-600'
          }`}
        >
          {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
        </span>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleUpdateStatus(row._id, 'completed')}
            className="text-green-600 hover:underline"
          >
            Complete
          </button>
          <button
            onClick={() => handleUpdateStatus(row._id, 'cancelled')}
            className="text-red-600 hover:underline"
          >
            Cancel
          </button>
        </div>
      ),
    },
  ];

  if (authLoading || loading) {
    console.log('⏳ Loading authentication or appointments data...');
    return (
      <AdminPageWrapper title="Appointments Management">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </AdminPageWrapper>
    );
  }

  if (!isAdmin) {
    console.warn('🚫 Access denied. User is not an admin.');
    return null;
  }

  if (error) {
    console.error('❌ Error fetching appointments:', error);
    return (
      <AdminPageWrapper title="Appointments Management">
        <div className="text-red-500 text-center mt-10">Error loading appointments.</div>
      </AdminPageWrapper>
    );
  }

  return (
    <div className = "mt-10">
    <AdminPageWrapper title="Appointments Management">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <SearchInput
              onSearch={(query) => {
                console.log('🔍 Search query changed:', query);
                setSearchQuery(query);
              }}
              value={searchQuery}
              placeholder="Search appointments..."
            />
          </div>
          <div className="w-full md:w-48">
            <select
              options={[
                { value: 'all', label: 'All Appointments' },
                { value: 'completed', label: 'Completed' },
                { value: 'cancelled', label: 'Cancelled' },
                { value: 'pending', label: 'Pending' },
              ]}
              value={filter}
              onChange={(value) => {
                console.log('📂 Filter changed to:', value);
                setFilter(value);
              }}
              placeholder="Filter by status"
            />
          </div>
        </div>

        <Table
          columns={columns}
          data={appointments}
          className="w-full"
        />
      </div>
    </AdminPageWrapper>
    </div>
  );
}
