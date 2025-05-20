'use client';

import { useAdminAccess } from '@/hooks/useAdminAccess';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AuthDialog from '../login&signUp/authDialog';
import AdminNavDrawer from '../admin/AdminNavDrawer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminLayout({ children }) {
  const { isAdmin, isLoading } = useAdminAccess();
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAdmin) {
      setShowAuthDialog(true);
    }
  }, [isLoading, isAdmin]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p className="text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <>
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="text-center p-8 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h1>
            <p className="text-gray-600 mb-6">Please log in with admin credentials to access this page.</p>
            <button
              onClick={() => setShowAuthDialog(true)}
              className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-700 transition-colors"
            >
              Login as Admin
            </button>
          </div>
        </div>
        {showAuthDialog && (
          <AuthDialog
            isOpen={showAuthDialog}
            onClose={() => setShowAuthDialog(false)}
            initialTab="login"
          />
        )}
      </>
    );
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <AdminNavDrawer>{children}</AdminNavDrawer>
    </>
  );
} 