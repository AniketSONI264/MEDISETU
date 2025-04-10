"use client";
import { motion } from "framer-motion"; 
import Image from "next/image"
import {
  Stethoscope,
  HeartPulse,
  Users,
  Smile,
  BriefcaseMedical,
  ShieldCheck,
  PhoneCall,
} from "lucide-react";

const values = [
  {
    icon: HeartPulse,
    title: "Patient-Centric Care",
    description: "We prioritize patient well-being with top-tier digital healthcare solutions.",
    color: "border-pink-500",
  },
  {
    icon: ShieldCheck,
    title: "Security & Trust",
    description: "Your data is encrypted and protected with the highest security standards.",
    color: "border-blue-500",
  },
  {
    icon: Users,
    title: "Expert Doctors",
    description: "Our platform connects you with certified and experienced healthcare professionals.",
    color: "border-purple-500",
  },
  {
    icon: BriefcaseMedical,
    title: "Advanced Healthcare",
    description: "We leverage AI and telemedicine for efficient and accurate medical consultations.",
    color: "border-green-500",
  },
  {
    icon: Smile,
    title: "Easy & Accessible",
    description: "MediSetu is designed for everyone – simple, fast, and user-friendly healthcare.",
    color: "border-yellow-500",
  },
  {
    icon: PhoneCall,
    title: "24/7 Support",
    description: "Our dedicated team is available around the clock to assist you anytime, anywhere.",
    color: "border-red-500",
  },
];

export default function AboutUs() {
  return ( 
    <main className="min-h-screen bg-gradient-to-b from-teal-50 to-white py-8 px-4 sm:px-6 lg:px-12 mt-10 pb-[150px]">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-black text-center mb-8"
      >
        About <span className="text-teal-700">MediSetu</span>
      </motion.h1>

      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center gap-10">
        {/* Left - Text */}
        <div className="md:w-1/2 space-y-5">
          <h2 className="text-xl sm:text-2xl font-semibold text-teal-700">
            Bridging Healthcare with Technology
          </h2>
          <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">
            MediSetu is a revolutionary platform that connects patients with expert doctors through seamless <strong>online consultations, appointment bookings, and health management services.</strong>
          </p>
          <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">
            Our mission is to make healthcare <strong>accessible, affordable, and hassle-free</strong> for everyone, anywhere.
          </p>
          

        </div>

        {/* Right - Image */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="md:w-1/2 flex justify-center"
        >
          {/* <img
            src="/MEDISETU.png"
            alt="MediSetu About"
            className="w-3/4 sm:w-2/3 md:w-full"
          /> */}
   <Image 
  src="/fullHdAbout.png" 
  alt="MediSetu Logo" 
  width={600} 
  height={200} 
  priority
  className="rounded-2xl transition-transform duration-300 hover:scale-105"/>
        </motion.div>
      </section>

      {/* Our Values Section */}


      <section className="mt-16">
  <h2 className="text-center text-2xl sm:text-3xl font-semibold text-teal-700 mb-6">
    Our Core Values
  </h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    {values.map(({ icon: Icon, title, description, color }, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0., delay: index * 0.1 }}
        whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 128, 128, 0.3)" }}
        className="p-6 bg-gradient-to-br from-teal-100 to-white border border-teal-300 rounded-2xl shadow-lg hover:shadow-2xl transition-all flex flex-col items-center text-center relative overflow-hidden"
      >
        {/* Underline Animation */}
        <motion.div
          initial={{ width: "30%" }}
          whileHover={{ width: "100%" }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="h-[3px] bg-teal-500 absolute bottom-0 left-0 right-0 mx-auto"
        />

        {/* Icon Animation */}
        <motion.div
          animate={{ rotate: [-10, 10, -10] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center justify-center text-teal-600 text-6xl mb-3"
        >
          <Icon className="w-14 h-14" />
        </motion.div>

        {/* Content */}
        <h3 className="mt-4 text-lg sm:text-xl font-semibold text-teal-900 relative">
          {title}
          <motion.div
            initial={{ width: "30%" }}
            whileHover={{ width: "100%" }}
            transition={{ duration: 0.1, ease: "easeInOut" }}
            className="h-[3px] bg-teal-500 absolute bottom-0 left-0 right-0 mx-auto"
          />
        </h3>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">{description}</p>
      </motion.div>
    ))}
  </div>
</section>


      {/* Call to Action */}
      <section className="mt-16 text-center">
        <h2 className="text-xl sm:text-2xl font-semibold text-teal-700">
          Ready to Experience Seamless Healthcare?
        </h2>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">
          Book an appointment with a top doctor today.
        </p>
        <motion.a
          href="/appointments"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 inline-block bg-teal-600 text-white text-sm sm:text-lg font-bold px-5 sm:px-6 py-2 sm:py-3 rounded-full shadow-md hover:bg-teal-500 transition"
        >
          Book Appointment
        </motion.a>
      </section>
    </main>
  );
}
