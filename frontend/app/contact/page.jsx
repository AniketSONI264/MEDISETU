"use client";

import { useState } from "react";
import { Send, User, Mail,Clock, Phone, MessageSquare,MapPin ,Handshake, Stethoscope, Briefcase} from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

export default function ContactUs() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   try {
  //     const response = await fetch("/contact-us", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(formData),
  //     });
  //     if (response.ok) {
  //       toast.success("Message sent successfully!");
  //       setFormData({ name: "", email: "", phone: "", message: "" });
  //     } else {
  //       toast.error("Failed to send message. Try again!");
  //     }
  //   } catch (error) {
  //     toast.error("Something went wrong!");
  //   }
  //   setLoading(false);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      toast.error("All fields are required!");
      return;
    }

    setLoading(true);

    try {
      // Ensure this is the correct API endpoint
      const response = await fetch("http://localhost:5000/api/contact-us", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Message sent successfully!");
        setSuccessMessage("Your message has been sent! We will get back to you soon.");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        toast.error("Failed to send message. Try again later.");
        setError("There was an issue with sending your message. Please try again.");
      }
    } catch (error) {
      toast.error("Something went wrong!");
      setError("Network error: Please check your internet connection or try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-teal-50 to-white py-8 px-4 sm:px-6 lg:px-12 mt-10 pb-[150px]">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black text-center mb-6"
      >
        Contact <span className="text-teal-700">MediSetu</span>
      </motion.h1>
      <p className="text-center text-lg sm:text-xl max-w-2xl mx-auto mb-10">
        Have questions, suggestions, or business inquiries? Your opinion matters! Reach out to us for any queries, partnership opportunities, or if you want to join MediSetu as a doctor.
      </p>

      <div className="grid md:grid-cols-2 gap-10">
       
<div className="max-w-lg mx-auto text-center p-6 bg-white rounded-2xl shadow-lg">
      <h3 className="text-2xl font-semibold mb-4 text-gray-800">Get in Touch</h3>
      <p className="mb-6 text-gray-600">
        We are here to assist you with any inquiries you have. Feel free to contact us through any of the following means:
      </p>

      <div className="space-y-3">
        {[
          { icon: <Phone className="text-blue-500" />, text: "+91 9876543210 (Support Hotline)" },
          { icon: <Mail className="text-red-500" />, text: "support@medisetu.com" },
          { icon: <MapPin className="text-green-500" />, text: "123, MediSetu Street, India" }
        ].map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg shadow-sm hover:shadow-md transition-all"
          >
            {item.icon}
            <span className="text-gray-700">{item.text}</span>
          </motion.div>
        ))}
      </div>

      <h3 className="text-xl font-semibold mt-6 text-gray-800">Working Hours</h3>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {[
          { day: "Monday - Friday", hours: "9 AM - 6 PM" },
          { day: "Saturday - Sunday", hours: "10 AM - 4 PM" }
        ].map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="p-4 bg-gradient-to-br from-teal-100 to-white border border-teal-300 rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            <Clock className="text-teal-600 mx-auto mb-2" />
            <p className="text-gray-800 font-semibold">{item.day}</p>
            <p className="text-gray-600 text-sm">{item.hours}</p>
          </motion.div>
        ))}
      </div>
    </div>


        {/* Contact Form */}

          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-teal-300">
      <h3 className="text-xl sm:text-2xl font-semibold mb-6 text-center text-teal-900">Share Your Queries</h3>
      <form className="space-y-5" onSubmit={handleSubmit}>
        {[
          { name: "name", placeholder: "Your Name", type: "text", icon: <User /> },
          { name: "email", placeholder: "Your Email", type: "email", icon: <Mail /> },
          { name: "phone", placeholder: "Your Phone", type: "text", icon: <Phone /> },
        ].map((field, index) => (
          <div key={index} className="relative flex items-center">
            <motion.div
              animate={{ rotate: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 0.5, ease: "easeInOut" }}
              className="absolute left-3 text-teal-600 text-lg"
            >
              {field.icon}
            </motion.div>
            <input
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              value={formData[field.name]}
              onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
              required
              className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 transition"
            />
          </div>
        ))}

        <div className="relative">
          <motion.div
            animate={{ rotate: [-10, 10, -10] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="absolute left-3 top-4 text-teal-600 text-lg"
          >
            <MessageSquare />
          </motion.div>
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            required
            className="w-full pl-10 p-3 border border-gray-300 rounded-lg h-28 focus:ring-2 focus:ring-teal-500 transition"
          ></textarea>
        </div>

        {successMessage && <p className="text-green-600 text-sm">{successMessage}</p>}
        {error && <p className="text-red-600 text-sm">{error}</p>}

        <motion.button
          whileHover={{ scale: 1.05 }}
          type="submit"
          className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-teal-700 transition"
          disabled={loading}
        >
          {loading ? "Sending..." : <><Send className="w-5 h-5" /> Send Message</>}
        </motion.button>
      </form>
    </div>
  
      
        {/* <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-teal-300">
  <h3 className="text-xl sm:text-2xl font-semibold mb-6 text-center text-teal-900">Share Your Queries</h3>
  <form className="space-y-5">
    {[
      { name: "name", placeholder: "Your Name", type: "text", icon: <User /> },
      { name: "email", placeholder: "Your Email", type: "email", icon: <Mail /> },
      { name: "phone", placeholder: "Your Phone", type: "text", icon: <Phone /> },
    ].map((field, index) => (
      <div key={index} className="relative flex items-center">
        <motion.div
          animate={{ rotate: [-10, 10, -10] }} // Rotates left to right
          transition={{ repeat: Infinity, duration: 0.5, ease: "easeInOut" }}
          className="absolute left-3 text-teal-600 text-lg"
        >
          {field.icon}
        </motion.div>
        <input
          type={field.type}
          name={field.name}
          placeholder={field.placeholder}
          required
          className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 transition"
        />
      </div>
    ))}

    <div className="relative">
      <motion.div
        animate={{ rotate: [-10, 10, -10] }} // Rotates left to right
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        className="absolute left-3 top-4 text-teal-600 text-lg"
      >
        <MessageSquare />
      </motion.div>
      <textarea
        name="message"
        placeholder="Your Message"
        required
        className="w-full pl-10 p-3 border border-gray-300 rounded-lg h-28 focus:ring-2 focus:ring-teal-500 transition"
      ></textarea>
    </div>

    <motion.button
      whileHover={{ scale: 1.05 }}
      type="submit"
      className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-teal-700 transition"
    >
      <Send className="w-5 h-5" /> Send Message
    </motion.button>
  </form>
</div> */}

</div>
      

<div className="mt-10 grid md:grid-cols-3 gap-6 text-center">
  {[
    { title: "Become a Partner", text: "Collaborate with us to expand healthcare accessibility.", icon: <Handshake size={50}/> },
    { title: "Join as a Doctor", text: "Be a part of MediSetu and provide online consultations.", icon: <Stethoscope size={50} /> },
    { title: "Business Inquiries", text: "Get in touch for investment and business collaborations.", icon: <Briefcase size={50} /> },
  ].map((item, index) => (
    <motion.div 
      key={index}
      whileHover={{ scale: 1.05 }}
      className="p-6 bg-gradient-to-br from-teal-100 to-white border border-teal-300 rounded-2xl shadow-lg hover:shadow-xl transition-all"
    >
      <motion.div 
        animate={{ rotate: [-10, 10, -10] }} // Rotate left to right
        transition={{ repeat: Infinity, duration: 0.5, ease: "easeInOut" }}
        className="flex items-center justify-center text-teal-600 text-9xl mb-3"
        size={50}
      > 
        {item.icon}
      </motion.div>
      <h4 className="text-lg font-semibold text-teal-900">{item.title}</h4>
      <p className="text-sm text-gray-600 mt-2">{item.text}</p>
    </motion.div>
  ))}
</div>

      <div className="mt-10 w-full">
  <h3 className="text-xl sm:text-2xl font-semibold text-teal-700 text-center">
    Visit Us at Our Location
  </h3>
  <p className="text-gray-600 text-center mt-2 mb-4">
    <strong>Need to reach us?</strong> Find our office on the map below and drop by during working hours.
  </p>
  <div className="w-full h-50">
    <iframe
      className="w-full h-full rounded-lg"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434508619!2d144.9537363159046!3d-37.817209979751554!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf5773f5f4e5a5e7b!2s123%2C%20MediSetu%20Street%2C%20India!5e0!3m2!1sen!2sin!4v1613543827485"
      allowFullScreen=""
      loading="lazy"
    ></iframe>
  </div>
</div>

    </main>
  );
}
