// 'use client';

// import { useEffect, useState } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card/index";
// import { Users, Stethoscope, Calendar, MessageSquare } from "lucide-react";
// import { useAuth } from "@/context/AuthContext";
// import { toast } from "react-toastify";

// export default function AdminDashboard() {
//   const [stats, setStats] = useState({
//     totalDoctors: 0,
//     verifiedDoctors: 0,
//     totalAppointments: 0,
//     totalUsers: 0,
//     pendingVerifications: 0
//   });
//   const { user } = useAuth();

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const response = await fetch('/api/admin/stats');
//         const data = await response.json();
//         if (data.success) {
//           setStats(data.stats);
//         }
//       } catch (error) {
//         toast.error('Failed to fetch dashboard statistics');
//       }
//     };

//     fetchStats();
//   }, []);

//   const statCards = [
//     {
//       title: "Total Doctors",
//       value: stats.totalDoctors,
//       icon: <Stethoscope className="h-4 w-4 text-blue-500" />,
//       description: `${stats.verifiedDoctors} verified`
//     },
//     {
//       title: "Pending Verifications",
//       value: stats.pendingVerifications,
//       icon: <Users className="h-4 w-4 text-yellow-500" />,
//       description: "Doctors awaiting verification"
//     },
//     {
//       title: "Total Appointments",
//       value: stats.totalAppointments,
//       icon: <Calendar className="h-4 w-4 text-green-500" />,
//       description: "All time appointments"
//     },
//     {
//       title: "Total Users",
//       value: stats.totalUsers,
//       icon: <Users className="h-4 w-4 text-purple-500" />,
//       description: "Registered users"
//     }
//   ];

//   return (
//     <div className="space-y-6 mt-[100px]">
//       <div className="flex items-center justify-between">
//         <h1 className="text-3xl font-bold">Admin Dashboard</h1>
//         <p className="text-sm text-gray-500">Welcome back, {user?.name}</p>
//       </div>

//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//         {statCards.map((card, index) => (
//           <Card key={index}>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">
//                 {card.title}
//               </CardTitle>
//               {card.icon}
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{card.value}</div>
//               <p className="text-xs text-gray-500">
//                 {card.description}
//               </p>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {/* Recent Activity Section */}
//       <div className="grid gap-4 md:grid-cols-2">
//         <Card>
//           <CardHeader>
//             <CardTitle>Recent Appointments</CardTitle>
//           </CardHeader>
//           <CardContent>
//             {/* Add appointment list component here */}
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Pending Verifications</CardTitle>
//           </CardHeader>
//           <CardContent>
//             {/* Add verification list component here */}
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// } 




'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card/index";
import { Users, Stethoscope, Calendar } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import toast from 'react-hot-toast'; // ✅ use hot-toast here

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalDoctors: 0,
    verifiedDoctors: 0,
    totalAppointments: 0,
    totalUsers: 0,
    pendingVerifications: 0
  });
  const { user } = useAuth();

  useEffect(() => {
    const fetchStats = async () => {
      const toastId = toast.loading("Fetching dashboard stats...");
      try {
        const response = await fetch('/api/admin/stats');
        const data = await response.json();
        if (data.success) {
          setStats(data.stats);
          toast.success('Dashboard stats loaded ✅', { id: toastId });
        } else {
          toast.error('Failed to load stats 😞', { id: toastId });
        }
      } catch (error) {
        toast.error('Failed to fetch dashboard statistics 💥', { id: toastId });
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Total Doctors",
      value: stats.totalDoctors,
      icon: <Stethoscope className="h-4 w-4 text-blue-500" />,
      description: `${stats.verifiedDoctors} verified`
    },
    {
      title: "Pending Verifications",
      value: stats.pendingVerifications,
      icon: <Users className="h-4 w-4 text-yellow-500" />,
      description: "Doctors awaiting verification"
    },
    {
      title: "Total Appointments",
      value: stats.totalAppointments,
      icon: <Calendar className="h-4 w-4 text-green-500" />,
      description: "All time appointments"
    },
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: <Users className="h-4 w-4 text-purple-500" />,
      description: "Registered users"
    }
  ];

  return (
    <div className="space-y-6 mt-[100px]">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-sm text-gray-500">Welcome back, {user?.name}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>
              {card.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-gray-500">
                {card.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Future Sections */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Add appointment list component here */}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pending Verifications</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Add verification list component here */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

