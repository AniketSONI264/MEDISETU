'use client';

import { useState } from 'react';
import AdminPageWrapper from '@/components/admin/AdminPageWrapper';
import { Input } from '@/components/ui/Input';
import { toast } from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, User } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Settings() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });
  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Add API call to update profile
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (securityData.newPassword !== securityData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      // Add API call to update password
      toast.success('Password updated successfully');
      setSecurityData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      toast.error('Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminPageWrapper title="Settings">
      <motion.div
        initial={{ opacity: 0, y: 1 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className='mt-[100px]'
      >
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="mb-8 w-full sm:w-auto flex flex-col sm:flex-row gap-2 sm:gap-4">
            <TabsTrigger value="profile" className="flex items-center gap-2 w-full sm:w-auto justify-center">
              <User size={16} className="flex-shrink-0" />
              <span>Profile Settings</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2 w-full sm:w-auto justify-center">
              <Shield size={16} className="flex-shrink-0" />
              <span>Security Settings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              onSubmit={handleProfileUpdate}
              className="space-y-6 max-w-2xl mx-auto"
            >
              <div className="space-y-4">
                <div>
                  <label 
                    htmlFor="name" 
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    Name
                  </label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) =>
                      setProfileData({ ...profileData, name: e.target.value })
                    }
                    className="mt-1.5 w-full"
                  />
                </div>
                <div>
                  <label 
                    htmlFor="email" 
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) =>
                      setProfileData({ ...profileData, email: e.target.value })
                    }
                    className="mt-1.5 w-full"
                  />
                </div>
                <div>
                  <label 
                    htmlFor="phone" 
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    Phone
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) =>
                      setProfileData({ ...profileData, phone: e.target.value })
                    }
                    className="mt-1.5 w-full"
                  />
                </div>
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {loading ? 'Updating...' : 'Update Profile'}
              </button>
            </motion.form>
          </TabsContent>

          <TabsContent value="security">
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              onSubmit={handlePasswordUpdate}
              className="space-y-6 max-w-2xl mx-auto"
            >
              <div className="space-y-4">
                <div>
                  <label 
                    htmlFor="currentPassword" 
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    Current Password
                  </label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={securityData.currentPassword}
                    onChange={(e) =>
                      setSecurityData({
                        ...securityData,
                        currentPassword: e.target.value,
                      })
                    }
                    className="mt-1.5 w-full"
                  />
                </div>
                <div>
                  <label 
                    htmlFor="newPassword" 
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    New Password
                  </label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={securityData.newPassword}
                    onChange={(e) =>
                      setSecurityData({
                        ...securityData,
                        newPassword: e.target.value,
                      })
                    }
                    className="mt-1.5 w-full"
                  />
                </div>
                <div>
                  <label 
                    htmlFor="confirmPassword" 
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    Confirm New Password
                  </label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={securityData.confirmPassword}
                    onChange={(e) =>
                      setSecurityData({
                        ...securityData,
                        confirmPassword: e.target.value,
                      })
                    }
                    className="mt-1.5 w-full"
                  />
                </div>
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {loading ? 'Updating...' : 'Update Password'}
              </button>
            </motion.form>
          </TabsContent>
        </Tabs>
      </motion.div>
    </AdminPageWrapper>
  );
} 