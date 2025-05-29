
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, ArrowLeftCircle, Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { loginDoctor } from "@/utils/api.js";

const AuthPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
  
    try {
      const response = await loginDoctor({ email, password });
  
      if (response.status === 200) {
        toast.success('Login successful! 🚀');
  
        // 👇 This ensures layout re-checks auth from scratch
        window.location.href = "/doctor";
  
      } else {
        throw new Error('Unexpected response');
      }
    } catch (err) {
      console.error("Login Error:", err?.response?.data || err.message || err);
      setError('Login failed. Please check your credentials.');
      toast.error('Login failed 😔');
    } finally {
      setLoading(false);
    }
  };
  

  const handleForgotPassword = () => {
    router.push('/forgot-password');
  };

  const iconVariant = {
    initial: { scale: 0.9, opacity: 0, y: -10 },
    animate: { scale: 1, opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200 } }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-white px-4">
      <motion.div
        key="login"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-white p-6 sm:p-8 rounded-2xl shadow-2xl space-y-6"
      >
        <motion.h2
          className="text-3xl font-bold text-teal-700 flex items-center gap-3 justify-center"
        >
          <motion.div
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
            whileHover={{
              scale: 1.2,
              transition: { type: "spring", stiffness: 300 },
            }}
          >
            <LogIn className="text-teal-600" size={28} />
          </motion.div>
          <motion.span
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 12,
              delay: 0.1,
            }}
          >
            Log In
          </motion.span>
        </motion.h2>

        {error && (
          <div className="text-red-600 text-sm text-center -mt-3">{error}</div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <motion.div variants={iconVariant} initial="initial" animate="animate">
            <Input
              type="email"
              placeholder="Email"
              icon={<Mail className="text-teal-500" />}
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </motion.div>

          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 100 }}
          >
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                icon={<Lock className="text-teal-500" />}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(prev => !prev)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-teal-600 transition-all"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white text-lg py-2 rounded-xl transition-all"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Log In'}
            </Button>
          </motion.div>
        </form>

        <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-gray-600">
          <motion.button
            onClick={handleForgotPassword}
            className="hover:underline text-teal-600 transition-all"
            whileHover={{ scale: 1.05 }}
          >
            Forgot Password?
          </motion.button>

          <Link
            href="/register-doctor"
            className="text-teal-600 hover:underline flex items-center gap-1 transition-all"
          >
            <motion.div
              className="inline-block"
              initial={{ x: -5, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <ArrowLeftCircle size={16} />
            </motion.div>
            <span>Sign Up as Doctor</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;
