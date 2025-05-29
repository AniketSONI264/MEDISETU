
'use client';

import { motion } from 'framer-motion';
import {
  CalendarClock,
  UserPlus,
  Stethoscope,
  Video,
  CheckCircle2,
} from 'lucide-react';

const steps = [
  {
    title: 'Register',
    description: 'Sign up quickly using phone or email.',
    emoji: '📝',
    Icon: UserPlus,
    color: 'from-teal-400 to-cyan-500',
  },
  {
    title: 'Book Appointment',
    description: 'Pick your doctor, date, and time.',
    emoji: '📅',
    Icon: CalendarClock,
    color: 'from-indigo-500 to-blue-500',
  },
  {
    title: 'Get Confirmation',
    description: 'Receive reminders on WhatsApp or SMS.',
    emoji: '✅',
    Icon: CheckCircle2,
    color: 'from-green-400 to-lime-500',
  },
  {
    title: 'Video Call',
    description: 'Join secure video consultation.',
    emoji: '💻',
    Icon: Video,
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Follow Up',
    description: 'Access prescriptions & follow-ups.',
    emoji: '🩺',
    Icon: Stethoscope,
    color: 'from-orange-400 to-red-500',
  },
];

export default function AppointmentTutorial() {
  return (
    // <section className="py-16 px-4 sm:px-8 lg:px-20 bg-gray-50" >
    <section className="py-16 px-4 sm:px-4 lg:px-20 bg-gradient-to-b from-teal-50 to-white rounded-lg">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-teal-700 mb-4">
          🩺 How to Book an Appointment
        </h2>
        <p className="text-gray-600 text-sm md:text-base max-w-xl mx-auto">
          Simple steps to connect with your doctor—easy, secure, and fast.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {steps.map(({ title, description, emoji, Icon, color }, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            viewport={{ once: true }}
            className="relative bg-white rounded-3xl shadow-xl p-5 pt-7 group border border-transparent hover:border-gray-200 transition-all"
          >
            <div
              className={`absolute -top-5 left-1/2 transform -translate-x-1/2 w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r ${color} text-white shadow-lg group-hover:scale-110 transition-transform`}
            >
              <Icon className="w-6 h-6" />
            </div>

            <div className="text-center mt-10">
              <div className="text-3xl sm:text-4xl">{emoji}</div>
              <h3 className="text-lg font-semibold text-gray-800 mt-3">
                {title}
              </h3>
              <p className="text-sm text-gray-500 mt-2 hidden md:block">
                {description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
