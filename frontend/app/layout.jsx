// import { Inter } from 'next/font/google';
// import './globals.css';
// import { Toaster } from 'react-hot-toast';
// import { AuthProvider } from '@/context/AuthContext';

// const inter = Inter({ subsets: ['latin'] });

// export const metadata = {
//   title: 'MediSetu - Your Health, Our Priority',
//   description: 'Book doctor appointments online with ease',
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en" className={inter.className}>
//       <body className="min-h-screen bg-gray-100">
//         <AuthProvider>
//           {children}
//           <Toaster position="top-center" />
//         </AuthProvider>
//       </body>
//     </html>
//   );
// } 



import "./globals.css";
import { Poppins } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import LayoutClient from "./layout-client";
import Script from "next/script"; // ✅
import { Toaster } from 'react-hot-toast';
import Chatbot from "@/components/Chatbot/Chatbot";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "700"] });

export const metadata = {
  title: "MediSetu - Doctor Appointment Booking",
  description: "Book appointments with top doctors easily.",
  icons: "/MediSetu Logo White.svg",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-gray-100`}>
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="afterInteractive"
        />
        <AuthProvider>
          <LayoutClient>{children}</LayoutClient>
        </AuthProvider>
        <Toaster position="top-right" />
        {/* <Chatbot /> */}
      </body>
    </html>
  );
} 
