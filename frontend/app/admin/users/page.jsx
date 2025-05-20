
'use client';

import React, { useState, useEffect, Fragment } from 'react';
import AdminPageWrapper from '@/components/admin/AdminPageWrapper';
import Table from '@/components/ui/table';
import SearchInput from '@/components/ui/SearchInput';
import Select from '@/components/ui/Select';
import { Mail, Phone, Shield, X } from 'lucide-react';
import toast from 'react-hot-toast';
import useAdminUsers from '@/hooks/admin/useAdminUsers';
import API from '@/utils/api'; // Make sure this exists
import { Dialog, Transition } from '@headlessui/react';
import { saveAs } from 'file-saver';
import {MdClose} from "react-icons/md";

export default function UsersManagement() {
  const { users, loading, error, refetch } = useAdminUsers();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);

  const handleToggleStatus = async (id) => {
    try {
      await API.patch(`/admin/users/${id}/toggle-status`);
      toast.success('User status updated successfully');
      refetch();
    } catch (error) {
      toast.error('Failed to update user status');
    }
  };

  const handleViewDetails = (id) => {
    const user = users.find((u) => u._id === id);
    if (user) setSelectedUser(user);
  };

  const handleSearch = (query) => setSearchQuery(query);
  const handleFilterChange = (value) => setFilter(value);
  const handleCloseModal = () => setSelectedUser(null);

  const handleExportCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Role', 'Status'];
    const rows = filteredUsers.map((user) => [
      user.fullName,
      user.email,
      user.phone || 'Not provided',
      user.role,
      user.isActive ? 'Active' : 'Inactive',
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers, ...rows].map((e) => e.join(',')).join('\n');

    const blob = new Blob([decodeURIComponent(encodeURI(csvContent))], {
      type: 'text/csv;charset=utf-8;',
    });
    saveAs(blob, 'users_export.csv');
    toast.success('CSV exported successfully!');
  };
  const filteredUsers = users.filter((user) => {
    // console.log("User Page :",user)
    const matchesSearch =
      user.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || user.role === filter;
    return matchesSearch && matchesFilter;
  });

  const columns = [
    {
      key: 'user',
      label: 'User',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
            <img
              src={row.profilePic || '/MediSetu Logo White.svg'}
              alt={row.fullName}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="font-medium">{row.fullName}</p> 
            <p className="text-sm text-gray-500">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'contact',
      label: 'Contact',
      render: (row) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Mail size={16} className="text-gray-500" />
            <span className="text-sm">{row.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={16} className="text-gray-500" />
            <span className="text-sm">{row.phone || 'Not provided'}</span>
          </div>
        </div>
      ),
    },
    {
      key: 'role',
      label: 'Role',
      render: (row) => {
        const role = row.role || 'User';
        return (
          <div className="flex items-center gap-2">
            <Shield size={16} className="text-gray-500" />
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                role === 'admin'
                  ? 'bg-purple-100 text-purple-600'
                  : role === 'doctor'
                  ? 'bg-blue-100 text-blue-600'
                  : role === 'patient'
                  ? 'bg-gray-100 text-gray-600'
                  : 'bg-yellow-100 text-yellow-600'
              }`}
            >
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </span>
          </div>
        );
      },
    },
    {
      key: 'status',
      label: 'Status',
      render: (row) => (
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            row.isActive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
          }`}
        >
          {row.isActive ? 'Active' : 'Inactive'}
        </span>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleToggleStatus(row._id)}
            className={`px-3 py-1 rounded-lg text-sm font-medium ${
              row.isActive
                ? 'bg-red-100 text-red-600 hover:bg-red-200'
                : 'bg-green-100 text-green-600 hover:bg-green-200'
            }`}
          >
            {row.isActive ? 'Deactivate' : 'Activate'}
          </button>
          <button
            onClick={() => handleViewDetails(row._id)}
            className="px-3 py-1 rounded-lg text-sm font-medium bg-blue-100 text-blue-600 hover:bg-blue-200"
          >
            View Details
          </button>
        </div>
      ),
    },
  ];

  if (loading) {
    return (
      <AdminPageWrapper title="Users Management">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </AdminPageWrapper>
    );
  }

  if (error) {
    return (
      <AdminPageWrapper title="Users Management">
        <div className="text-red-500 text-center py-8">{error}</div>
      </AdminPageWrapper>
    );
  }

  return (
    <div className = "mt-10">
    <AdminPageWrapper title="Users Management">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-2">
          <div className="flex-1">
            <SearchInput onSearch={handleSearch} placeholder="Search users..." />
          </div>
          <div className="w-full md:w-48">
            <select
              options={[
                { value: 'all', label: 'All Users' },
                { value: 'admin', label: 'Admins' },
                { value: 'doctor', label: 'Doctors' },
                { value: 'patient', label: 'Patients' },
              ]}
              value={filter}
              onChange={handleFilterChange}
              placeholder="Filter by role"
            />
          </div>
          <button
            onClick={handleExportCSV}
            className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-lg"
          >
            Export CSV
          </button>
        </div>

        <Table columns={columns} data={filteredUsers} className="w-full" />
      </div>

      {/* Modal */}
      <Transition.Root show={!!selectedUser} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={handleCloseModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 sm:p-6 lg:p-8 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                {/* <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex justify-between">
                    <Dialog.Title className="text-lg font-medium text-gray-900 dark:text-white">
                      {selectedUser?.name}
                    </Dialog.Title>
                    <button
                      onClick={handleCloseModal}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                    <div>
                      <strong>Email:</strong> {selectedUser?.email}
                    </div>
                    <div>
                      <strong>Phone:</strong> {selectedUser?.phone || 'Not provided'}
                    </div>
                    <div>
                      <strong>Role:</strong>{' '}
                      <span
                        className={`${
                          selectedUser?.role === 'admin'
                            ? 'text-purple-600'
                            : selectedUser?.role === 'doctor'
                            ? 'text-blue-600'
                            : 'text-yellow-600'
                        }`}
                      >
                        {selectedUser?.role}
                      </span>
                    </div>
                    <div>
                      <strong>Status:</strong>{' '}
                      <span
                        className={`${
                          selectedUser?.isActive ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {selectedUser?.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                     <div className="mt-4">
                      <strong>Bio:</strong>
                      <p>{selectedUser?.bio || 'No bio available'}</p>
                    </div> 
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog> */}

        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white dark:bg-gray-900 text-left shadow-xl transition-all">
        {/* <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white/30 dark:bg-white/10 backdrop-blur-md backdrop-saturate-150 text-left shadow-xl transition-all border border-white/20"></Dialog.Panel> */}
        {/* <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white/30 dark:bg-white/10 backdrop-blur-md backdrop-saturate-150 text-left shadow-xl transition-all border border-white/20"> */}

                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                {/* <div className="fixed inset-0 bg-white/10 dark:bg-black/30 backdrop-blur-sm transition-opacity" /> */}

                  <Dialog.Title className="text-lg font-semibold text-gray-900 dark:text-white">
                    User Details
                  </Dialog.Title>
                  <button
                    onClick={handleCloseModal}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
                  >
                    <MdClose className="h-5 w-5" aria-hidden="true" /> 
                  </button>
                </div>

                <div className="px-6 py-4 space-y-4">
                  <div className="flex justify-center">
                    <img
                      src={selectedUser?.profilePic || '/MediSetu Logo White.svg'}
                      alt={selectedUser?.fullName}
                      className="h-24 w-24 rounded-full object-cover ring-2 ring-blue-500"
                    />
                  </div>

                  <div className="text-sm text-gray-700 dark:text-gray-200 space-y-1">
                    <p><span className="font-medium">Name:</span> {selectedUser?.fullName}</p>
                    <p><span className="font-medium">Email:</span> {selectedUser?.email}</p>
                    <p><span className="font-medium">Phone:</span> {selectedUser?.phone}</p>
                    <p><span className="font-medium">Gender:</span> {selectedUser?.gender || 'N/A'}</p>
                    <p><span className="font-medium">Created At:</span> {new Date(selectedUser?.createdAt).toLocaleString()}</p>
                  </div>
                </div>

                <div className="px-6 py-3 border-t border-gray-200 dark:border-gray-700 text-right">
                  <button
                    onClick={handleCloseModal}
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
                    </Transition.Child>
            </div>
          </div>
        </Dialog>

      </Transition.Root>
    </AdminPageWrapper>
    </div>
  );
}
