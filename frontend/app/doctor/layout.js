// "use client";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useAuth } from "../../context/AuthContext";
// import NavDrawer from "@components/doctorNavDrawer/navDrawer.js"
// export default function DoctorLayout({ children }) {
//   const { user, loading } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (!loading && user?.role !== "doctor") {
//       router.push("/");
//     }
//   }, [user, loading]);

//   if (loading) return <p>Loading...</p>;

//   return (
//       <NavDrawer>
//       <main className="flex-1 p-6">{children}</main>

//   );
// }



// "use client";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useAuth } from "../../context/AuthContext";
// import NavDrawer from "../../components/doctorNavDrawer/navDrawer.jsx";

// //frontend\components\doctorNavDrawer\navDrawer.jsx 

// export const metadata ={
// title: "MediSetu - Doctor Appointment Booking",
//   description: "Book appointments with top doctors easily.",
//   icons: "/MediSetu Logo White.svg",
// };

// export default function DoctorLayout({ children }) {
//   const { user, loading } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (!loading && user?.role !== "doctor") {
//       router.push("/");
//     }
//   }, [user, loading]);

//   if (loading) return <p>Loading...</p>;

//   return (
//     <NavDrawer>
//       <main className="flex-1 p-6">{children}</main>
//     </NavDrawer>
//   );
// }

// app/doctor/layout.js

// import "../../app/globals.css";
// import { Poppins } from "next/font/google";
// import { AuthProvider } from "@/context/AuthContext"; // Just in case you want auth globally
// import LayoutClient from "./layout-client"; // 👈 Client-side layout


// const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "700"] });

// export const metadata = {
//   title: "MediSetu - Doctor Panel",
//   description: "Doctor dashboard to manage appointments and patients.",
//   icons: "/MediSetu Logo White.svg", 
// };

// export default function DoctorLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className={`${poppins.className} bg-gray-100`}>
//         <AuthProvider>
//           <LayoutClient>{children}</LayoutClient> {/* 🔁 Client-side logic here */}
//         </AuthProvider>
//       </body>
//     </html>
//   );
// }



import "../../app/globals.css";
import { Poppins } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import LayoutClient from "./layout-client"; // Client layout for doctor

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "700"] });

export const metadata = {
  title: "MediSetu - Doctor Panel",
  description: "Doctor dashboard to manage appointments and patients.",
  icons: "/MediSetu Logo White.svg",
};

export default function DoctorLayout({ children }) {
  return (
    <AuthProvider>
      <LayoutClient fontClass={poppins.className}> 
        {children}
      </LayoutClient>
    </AuthProvider>
  );
}
