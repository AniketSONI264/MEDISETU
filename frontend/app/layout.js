// import "./globals.css";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import { Poppins } from "next/font/google";
// import { ToastContainer } from "react-toastify"; // ✅ Import Toast
// import "react-toastify/dist/ReactToastify.css"; // ✅ Import Styles

// const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "700"] });

// export const metadata = {
//   title: "MediSetu - Doctor Appointment Booking",
//   description: "Book appointments with top doctors easily.",
//   icons : "/MediSetu Logo White.svg",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className={`${poppins.className} bg-gray-100`}>
//         <Navbar />
//         <ToastContainer position="top-right" autoClose={3000} /> 
//         <main className="container mx-auto p-4">{children}</main>
//         <Footer />
//       </body>
//     </html>
//   );
// }

import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Poppins } from "next/font/google";
import { ToastContainer } from "react-toastify"; // ✅ Import Toast
import "react-toastify/dist/ReactToastify.css"; // ✅ Import Styles
import { AuthProvider } from "@/context/AuthContext"; // ✅ Import Auth Context

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
        <AuthProvider> {/* ✅ Wrap everything in AuthProvider */}
          <Navbar />
          <ToastContainer position="top-right" autoClose={3000} />
          <main className="container mx-auto p-4">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
