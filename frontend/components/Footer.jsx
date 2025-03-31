// "use client";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin, ShieldCheck, FileText } from "lucide-react";

// export default function Footer() {
//   return (
//     <footer className="bg-gradient-to-br from-teal-700 to-blue-900 text-white shadow-lg border-t-[3px] border-teal-500/50">
//       <div className="container mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        
//         {/* Logo & About */}
//         <div className="space-y-5">
//           <h2 className="text-3xl font-bold text-white tracking-wide">MediSetu</h2>
//           <p className="text-gray-300">
//             Your trusted online healthcare platform, connecting patients with top doctors for consultations and appointments.
//           </p>
//         </div>

//         {/* Quick Links */}
//         <div className="space-y-5">
//           <h3 className="text-2xl font-semibold text-white border-b-2 border-teal-300 pb-2">Quick Links</h3>
//           <ul className="space-y-3">
//             {["Home", "Services", "About Us", "Contact Us"].map((link, index) => (
//               <motion.li
//                 key={index}
//                 whileHover={{ scale: 1.05, x: 5 }}
//                 transition={{ type: "spring", stiffness: 300 }}
//               >
//                 <Link href={`/${link.toLowerCase().replace(" ", "-")}`} className="text-gray-300 hover:text-white transition">
//                   {link}
//                 </Link>
//               </motion.li>
//             ))}
//           </ul>
//         </div>

//         {/* Contact Info */}
//         <div className="space-y-5">
//           <h3 className="text-2xl font-semibold text-white border-b-2 border-teal-300 pb-2">Contact Us</h3>
//           <div className="flex items-center space-x-3 text-gray-300">
//             <Phone className="text-teal-300" />
//             <span>+91 98765 43210</span>
//           </div>
//           <div className="flex items-center space-x-3 text-gray-300">
//             <Mail className="text-teal-300" />
//             <span>support@medisetu.com</span>
//           </div>
//           <div className="flex items-center space-x-3 text-gray-300">
//             <MapPin className="text-teal-300" />
//             <span>MediSetu HQ, New Delhi, India</span>
//           </div>
//         </div>

//         {/* Follow Us */}
//         <div className="space-y-5">
//           <h3 className="text-2xl font-semibold text-white border-b-2 border-teal-300 pb-2">Follow Us</h3>
//           <div className="flex space-x-5">
//             {[
//               { Icon: Facebook, href: "https://facebook.com", color: "text-blue-500" },
//               { Icon: Twitter, href: "https://twitter.com", color: "text-blue-400" },
//               { Icon: Instagram, href: "https://instagram.com", color: "text-pink-500" },
//               { Icon: Youtube, href: "https://youtube.com", color: "text-red-500" },
//               { Icon: Linkedin, href: "https://linkedin.com", color: "text-blue-700" },
//             ].map(({ Icon, href, color }, index) => (
//               <motion.a
//                 key={index}
//                 href={href}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 whileHover={{ scale: 1.2, rotate: 10 }}
//                 transition={{ type: "spring", stiffness: 300 }}
//               >
//                 <Icon className={`w-7 h-7 ${color} hover:scale-125 transition`} />
//               </motion.a>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Privacy Policy & Terms */}
//       <div className="border-t border-teal-500/40 mt-10 py-6">
//         <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
//           <div className="flex space-x-6 text-gray-300">
//             <Link href="/privacy-policy" className="flex items-center space-x-2 hover:text-white transition">
//               <ShieldCheck className="w-5 h-5 text-teal-300" />
//               <span>Privacy Policy</span>
//             </Link>
//             <Link href="/terms-conditions" className="flex items-center space-x-2 hover:text-white transition">
//               <FileText className="w-5 h-5 text-teal-300" />
//               <span>Terms & Conditions</span>
//             </Link>
//           </div>
//           <p className="text-gray-300 text-sm mt-3 md:mt-0">
//             © {new Date().getFullYear()} <span className="text-white font-semibold">MediSetu</span>. All rights reserved.
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// }


"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Stethoscope,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  FileText,
  Home,
  Briefcase,
  Info,
  Contact
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-teal-700 to-blue-900 text-white shadow-lg border-t-[3px] mt-[-150px] border-teal-500/50">
      <div className="container mx-auto px-6 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Logo & About */}
        <div className="space-y-5">
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
            >
              <Stethoscope className="w-8 h-8 text-teal-300" />
            </motion.div>
            <span className="font-bold text-2xl text-white drop-shadow-md">
              MediSetu
            </span>
          </Link>
          <p className="text-gray-300">
            Your trusted online healthcare platform, connecting patients with top doctors for consultations and appointments.
          </p>
        </div>

        {/* Quick Links with Icons & Animations */}
        <div className="space-y-5">
          <h3 className="text-2xl font-semibold text-white border-b-2 border-teal-300 pb-2">Quick Links</h3>
          <ul className="space-y-3">
            {[
              { href: "/", label: "Home", Icon: Home },
              { href: "/services", label: "Services", Icon: Briefcase },
              { href: "/about", label: "About Us", Icon: Info },
              { href: "/contact", label: "Contact Us", Icon: Contact }
            ].map(({ href, label, Icon }, index) => (
              <motion.li
                key={index}
                whileHover={{ scale: 1.05, x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="flex items-center space-x-2"
              >
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Icon className="w-5 h-5 text-teal-300" />
                </motion.div>
                <Link href={href} className="text-gray-300 hover:text-white transition">
                  {label}
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Contact Info with Infinite Animations */}
        <div className="space-y-5">
          <h3 className="text-2xl font-semibold text-white border-b-2 border-teal-300 pb-2">Contact Us</h3>
          {[
            { text: "+91 98765 43210", Icon: Phone },
            { text: "support@medisetu.com", Icon: Mail },
            { text: "MediSetu HQ, New Delhi, India", Icon: MapPin }
          ].map(({ text, Icon }, index) => (
            <div key={index} className="flex items-center space-x-3 text-gray-300">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
              >
                <Icon className="text-teal-300 w-5 h-5" />
              </motion.div>
              <span>{text}</span>
            </div>
          ))}
        </div>

        {/* Follow Us - Colored Social Icons with Animations */}
        <div className="space-y-5">
          <h3 className="text-2xl font-semibold text-white border-b-2 border-teal-300 pb-2">Follow Us</h3>
          <div className="flex space-x-5">
            {[
              { Icon: Facebook, href: "https://facebook.com", color: "text-blue-500" },
              { Icon: Twitter, href: "https://twitter.com", color: "text-blue-400" },
              { Icon: Instagram, href: "https://instagram.com", color: "text-pink-500" },
              { Icon: Youtube, href: "https://youtube.com", color: "text-red-500" },
              { Icon: Linkedin, href: "https://linkedin.com", color: "text-blue-700" },
            ].map(({ Icon, href, color }, index) => (
              <motion.a
                key={index}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Icon className={`w-7 h-7 ${color} hover:scale-125 transition`} />
                </motion.div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* Privacy Policy & Terms with Icons & Animations */}
      <div className="border-t border-teal-500/40 mt-10 py-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-6 text-gray-300">
            {[
              { href: "/privacy-policy", label: "Privacy Policy", Icon: ShieldCheck },
              { href: "/terms-conditions", label: "Terms & Conditions", Icon: FileText }
            ].map(({ href, label, Icon }, index) => (
              <Link key={index} href={href} className="flex items-center space-x-2 hover:text-white transition">
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Icon className="w-5 h-5 text-teal-300" />
                </motion.div>
                <span>{label}</span>
              </Link>
            ))}
          </div>
          <p className="text-gray-300 text-sm mt-3 md:mt-0">
            © {new Date().getFullYear()} <span className="text-white font-semibold">MediSetu</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
