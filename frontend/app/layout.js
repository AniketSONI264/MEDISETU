// import "./globals.css";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import { Poppins } from "next/font/google";
// import { ToastContainer } from "react-toastify"; // ✅ Import Toast
// import "react-toastify/dist/ReactToastify.css"; // ✅ Import Styles
// import { AuthProvider } from "@/context/AuthContext"; // ✅ Import Auth Context
// import {usePathName} from "next/navigation";

// const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "700"] });

// export const metadata = {
//   title: "MediSetu - Doctor Appointment Booking",
//   description: "Book appointments with top doctors easily.",
//   icons: "/MediSetu Logo White.svg",
// };

// export default function RootLayout({ children }) {
// const pathName = usePathName();
// const isDocRoute = pathName.startsWith("/doctor");

//   return (
//     <html lang="en">
//       <body className={`${poppins.className} bg-gray-100`}>

//         <AuthProvider> {/* ✅ Wrap everything in AuthProvider */}
//           {!isDocRoute && (
//              <header className="p-4 bg-blue-500 text-white">
//              <h1>MediSetu</h1>
//            </header>
//          )}
//           <Navbar />
//           <ToastContainer position="top-right" autoClose={3000} />
//           <main className="container mx-auto p-4">{children}</main>
//           <Footer />
//         </AuthProvider>
//       </body>
//     </html>
//   );
// }


// import "./globals.css";
// import { Poppins } from "next/font/google";
// import { AuthProvider } from "@/context/AuthContext";
// import LayoutClient from "./layout-client"; // ✅ Import the client component

// const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "700"] });

// export const metadata = {
//   title: "MediSetu - Doctor Appointment Booking",
//   description: "Book appointments with top doctors easily.",
//   icons: "/MediSetu Logo White.svg",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className={`${poppins.className} bg-gray-100`}>
//         <AuthProvider>
//           <LayoutClient>{children}</LayoutClient> {/* ✅ Render the client-side layout */}
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
      </body>
    </html>
  );
} 
