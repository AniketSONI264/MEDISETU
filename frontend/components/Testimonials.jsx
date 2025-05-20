// export default function Testimonials() {
//     const reviews = [
//       { name: "Amit", feedback: "Great platform for online doctor consultation!" },
//       { name: "Priya", feedback: "Booking an appointment was super easy and fast." },
//       { name: "Rahul", feedback: "Video consultations saved me a hospital visit!" },
//     ];
  
//     return (
//       <section className="py-16 bg-white text-center">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-bold">What Our Patients Say</h2>
//           <div className="grid md:grid-cols-3 gap-6 mt-8">
//             {reviews.map((review, index) => (
//               <div key={index} className="bg-blue-100 p-6 rounded-lg shadow-md">
//                 <p className="text-gray-700">"{review.feedback}"</p>
//                 <h4 className="mt-4 font-semibold">{review.name}</h4>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     );
//   }
  





// 'use client';

// import { motion } from 'framer-motion';
// import {
//   CalendarClock,
//   UserPlus,
//   Stethoscope,
//   Video,
//   CheckCircle2,
// } from 'lucide-react';

// const steps = [
//   {
//     title: 'Step 1: Register',
//     description: 'Create your MediSetu account with just your phone number or email.',
//     emoji: '📝',
//     Icon: UserPlus,
//   },
//   {
//     title: 'Step 2: Book Appointment',
//     description: 'Choose your preferred doctor, date, and time.',
//     emoji: '📅',
//     Icon: CalendarClock,
//   },
//   {
//     title: 'Step 3: Get Confirmed',
//     description: 'Receive confirmation & reminders on WhatsApp or SMS.',
//     emoji: '✅',
//     Icon: CheckCircle2,
//   },
//   {
//     title: 'Step 4: Video Consultation',
//     description: 'Join your appointment through secure video call.',
//     emoji: '💻',
//     Icon: Video,
//   },
//   {
//     title: 'Step 5: Stay Connected',
//     description: 'Access prescriptions & follow-up schedules anytime.',
//     emoji: '🩺',
//     Icon: Stethoscope,
//   },
// ];

// export default function AppointmentTutorial() {
//   return (
//     <section className="py-12 px-6 md:px-16 bg-gray-50">
//       <h2 className="text-3xl font-bold text-center text-teal-700 mb-10">
//         🩺 How to Book Your Appointment
//       </h2>

//       <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-5">
//         {steps.map(({ title, description, emoji, Icon }, index) => (
//           <motion.div
//             key={index}
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: index * 0.2 }}
//             viewport={{ once: true }}
//             className="bg-white rounded-2xl shadow-lg p-5 text-center border hover:shadow-xl transition"
//           >
//             <motion.div
//               animate={{ rotate: [-10, 10, -10] }}
//               transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
//               className="mx-auto mb-3 text-teal-600"
//             >
//               <Icon className="w-10 h-10 mx-auto" />
//             </motion.div>
//             <div className="text-4xl">{emoji}</div>
//             <h3 className="text-lg font-semibold mt-3">{title}</h3>
//             <p className="text-sm text-gray-600 mt-2">{description}</p>
//           </motion.div>
//         ))}
//       </div>
//     </section>
//   );
// }



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
