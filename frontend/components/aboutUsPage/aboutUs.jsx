"use client";
import { motion } from "framer-motion";
import {
  Stethoscope,
  HeartPulse,
  Users,
  Smile,
  BriefcaseMedical, 
  ShieldCheck,
  PhoneCall,
} from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-teal-50 to-white py-10 px-6 lg:px-12">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-teal-700 text-center mb-8"
      >
        About <span className="text-blue-600">MediSetu</span>
      </motion.h1>

      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center gap-10">
        {/* Left - Text */}
        <div className="md:w-1/2 space-y-5">
          <h2 className="text-2xl font-semibold text-teal-700">
            Bridging Healthcare with Technology
          </h2>
          <p className="text-gray-700 leading-relaxed">
            MediSetu is a revolutionary platform that connects patients with
            expert doctors through seamless **online consultations, appointment bookings, and health management services.**  
          </p>
          <p className="text-gray-700 leading-relaxed">
            Our mission is to make healthcare **accessible, affordable, and
            hassle-free** for everyone, anywhere.
          </p>
        </div>

        {/* Right - Image */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="md:w-1/2 flex justify-center"
        >
          <img
            src="/about-illustration.svg"
            alt="MediSetu About"
            className="w-3/4 sm:w-2/3 md:w-full"
          />
        </motion.div>
      </section>

      {/* Our Values Section */}
      <section className="mt-16">
        <h2 className="text-center text-3xl font-semibold text-teal-700 mb-6">
          Our Core Values
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            {
              icon: HeartPulse,
              title: "Patient-Centric Care",
              description:
                "We prioritize patient well-being with top-tier digital healthcare solutions.",
            },
            {
              icon: ShieldCheck,
              title: "Security & Trust",
              description:
                "Your data is encrypted and protected with the highest security standards.",
            },
            {
              icon: Users,
              title: "Expert Doctors",
              description:
                "Our platform connects you with certified and experienced healthcare professionals.",
            },
            {
              icon: BriefcaseMedical,
              title: "Advanced Healthcare",
              description:
                "We leverage AI and telemedicine for efficient and accurate medical consultations.",
            },
            {
              icon: Smile,
              title: "Easy & Accessible",
              description:
                "MediSetu is designed for everyone – simple, fast, and user-friendly healthcare.",
            },
            {
              icon: PhoneCall,
              title: "24/7 Support",
              description:
                "Our dedicated team is available around the clock to assist you anytime, anywhere.",
            },
          ].map(({ icon: Icon, title, description }, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center border border-gray-200"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Icon className="w-12 h-12 text-teal-600" />
              </motion.div>
              <h3 className="mt-4 text-xl font-semibold text-teal-700">
                {title}
              </h3>
              <p className="text-gray-600 mt-2">{description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="mt-16 text-center">
        <h2 className="text-2xl font-semibold text-teal-700">
          Ready to Experience Seamless Healthcare?
        </h2>
        <p className="text-gray-600 mt-2">
          Book an appointment with a top doctor today.
        </p>
        <motion.a
          href="/appointments"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 inline-block bg-teal-600 text-white text-lg font-bold px-6 py-3 rounded-full shadow-md hover:bg-teal-500 transition"
        >
          Book Appointment
        </motion.a>
      </section>
    </main>
  );
}
