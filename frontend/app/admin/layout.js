// "use client";
// import "../../app/globals.css";
// import { Poppins } from "next/font/google";
// import { AuthProvider } from "@/context/AuthContext";
// import AdminLayout from "@/components/layouts/AdminLayout";

// const poppins = Poppins({ 
//   subsets: ["latin"], 
//   weight: ["400", "500", "600", "700"],
//   variable: '--font-poppins'
// });

// export const metadata = {
//   title: "MediSetu - Admin Panel",
//   description: "Admin dashboard for managing MediSetu platform",
//   icons: {
//     icon: "/MediSetu Logo White.svg",
//   },
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en" className={poppins.variable}>
//       <body>
//         <AuthProvider>
//           <AdminLayout>{children}</AdminLayout>
//         </AuthProvider>
//       </body>
//     </html>
//   );
// }

import "../../app/globals.css";
import { Poppins } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import ClientAdminLayout from "@/components/layouts/ClientAdminLayout"; // rename this

const poppins = Poppins({ 
  subsets: ["latin"], 
  weight: ["400", "500", "600", "700"],
  variable: '--font-poppins'
});

export const metadata = {
  title: "MediSetu - Admin Panel",
  description: "Admin dashboard for managing MediSetu platform",
  icons: {
    icon: "/MediSetu Logo White.svg",
  },
};

export default function AdminRootLayout({ children }) {
  return (
    // <html lang="en" className={poppins.variable}>
    //   <body>
        <AuthProvider>
          <ClientAdminLayout>{children}</ClientAdminLayout>
        </AuthProvider>
    //   </body>
    // </html>
  );
}
