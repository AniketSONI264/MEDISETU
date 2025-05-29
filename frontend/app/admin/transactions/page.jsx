'use client';

import { useState, useEffect } from 'react';
import AdminPageWrapper from '@/components/admin/AdminPageWrapper';
import Table from '@/components/ui/Table';
import Select from '@/components/ui/select';
import { Calendar, CreditCard, User, Search } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export default function TransactionsManagement() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const columns = [
    {
      key: 'transaction',
      label: 'Transaction',
      render: (row) => (
        <div className="flex flex-col">
          <p className="font-medium">#{row.id}</p>
          <p className="text-sm text-gray-500 line-clamp-2">{row.description}</p>
        </div>
      ),
    },
    {
      key: 'user',
      label: 'User',
      render: (row) => (
        <div className="flex items-center gap-2">
          <User size={16} className="text-gray-500 flex-shrink-0" />
          <span className="truncate">{row.user.name}</span>
        </div>
      ),
    },
    {
      key: 'amount',
      label: 'Amount',
      render: (row) => (
        <span
          className={`font-medium whitespace-nowrap ${
            row.type === 'credit'
              ? 'text-green-600'
              : 'text-red-600'
          }`}
        >
          {row.type === 'credit' ? '+' : '-'}${row.amount}
        </span>
      ),
    },
    {
      key: 'payment',
      label: 'Payment Method',
      render: (row) => (
        <div className="flex items-center gap-2">
          <CreditCard size={16} className="text-gray-500 flex-shrink-0" />
          <span className="truncate">{row.paymentMethod}</span>
        </div>
      ),
    },
    {
      key: 'date',
      label: 'Date',
      render: (row) => (
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-gray-500 flex-shrink-0" />
          <span className="whitespace-nowrap">{new Date(row.date).toLocaleDateString()}</span>
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (row) => (
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${
            row.status === 'completed'
              ? 'bg-green-100 text-green-600'
              : row.status === 'pending'
              ? 'bg-yellow-100 text-yellow-600'
              : 'bg-red-100 text-red-600'
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
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => handleViewDetails(row.id)}
            className="px-3 py-1 rounded-lg text-sm font-medium bg-blue-100 text-blue-600 hover:bg-blue-200 whitespace-nowrap"
          >
            View Details
          </button>
          {row.status === 'pending' && (
            <button
              onClick={() => handleUpdateStatus(row.id, 'completed')}
              className="px-3 py-1 rounded-lg text-sm font-medium bg-green-100 text-green-600 hover:bg-green-200 whitespace-nowrap"
            >
              Complete
            </button>
          )}
        </div>
      ),
    },
  ];

  const handleViewDetails = (id) => {
    // Add navigation to transaction details page
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      // Add API call to update transaction status
      toast.success('Transaction status updated successfully');
    } catch (error) {
      toast.error('Failed to update transaction status');
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  useEffect(() => {
    // Add API call to fetch transactions
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <AdminPageWrapper title="Transactions Management">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </AdminPageWrapper>
    );
  }

  return (
    <AdminPageWrapper title="Transactions Management">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 min-w-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>
          <div className="w-full sm:w-48">
            <Select
              options={[
                { value: 'all', label: 'All Transactions' },
                { value: 'completed', label: 'Completed' },
                { value: 'pending', label: 'Pending' },
                { value: 'failed', label: 'Failed' },
              ]}
              value={filter}
              onChange={handleFilterChange}
              placeholder="Filter by status"
            />
          </div>
        </div>

        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="inline-block min-w-full align-middle px-4 sm:px-0">
            <Table
              columns={columns}
              data={transactions}
              className="w-full"
            />
          </div>
        </div>
      </motion.div>
    </AdminPageWrapper>
  );
} 