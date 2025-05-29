
// "use client";
// import { useEffect, useState } from "react";
// import { getUserAppointments } from "@/utils/api";
// import AppointmentCard from "./AppointmentCard";
// import { Loader2 } from "lucide-react";
// import { Input } from "@/components/ui/Input";
// import { Select,SelectItem } from "@/components/ui/Select";
// // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";

// const AppointmentList = () => {
//   const [appointments, setAppointments] = useState([]);
//   const [filteredAppointments, setFilteredAppointments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [sortOrder, setSortOrder] = useState("desc");

//   useEffect(() => {
//     const fetchAppointments = async () => {
//       const res = await getUserAppointments();
//       if (res.success) {
//         setAppointments(res.data || []);
//         setFilteredAppointments(res.data || []);
//       }
//       setLoading(false);
//     };

//     fetchAppointments();
//   }, []);

//   useEffect(() => {
//     let filtered = [...appointments];

//     // Search filter
//     if (searchQuery.trim() !== "") {
//       filtered = filtered.filter((apt) =>
//         apt.doctorName?.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     // Status filter
//     if (statusFilter !== "all") {
//       filtered = filtered.filter((apt) => apt.status === statusFilter);
//     }

//     // Sort by date
//     filtered.sort((a, b) =>
//       sortOrder === "asc"
//         ? new Date(a.date) - new Date(b.date)
//         : new Date(b.date) - new Date(a.date)
//     );

//     setFilteredAppointments(filtered);
//   }, [searchQuery, statusFilter, sortOrder, appointments]);

//   return (
//     <div>
//       {/* FILTER CONTROLS */}
//       <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//         <Input
//           placeholder="Search by doctor name"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//         <Select value={statusFilter} onValueChange={setStatusFilter}>
//           <SelectTrigger>
//             <SelectValue placeholder="Filter by status" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="all">All</SelectItem>
//             <SelectItem value="pending">Pending</SelectItem>
//             <SelectItem value="confirmed">Confirmed</SelectItem>
//             <SelectItem value="cancelled">Cancelled</SelectItem>
//             <SelectItem value="completed">Completed</SelectItem>
//           </SelectContent>
//         </Select>
//         <Select value={sortOrder} onValueChange={setSortOrder}>
//           <SelectTrigger>
//             <SelectValue placeholder="Sort by date" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="desc">Newest First</SelectItem>
//             <SelectItem value="asc">Oldest First</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>

//       {/* APPOINTMENT CARDS */}
//       {loading ? (
//         <div className="flex justify-center items-center h-40">
//           <Loader2 className="animate-spin text-primary h-10 w-10" />
//         </div>
//       ) : filteredAppointments.length === 0 ? (
//         <p className="text-gray-600 text-center">No appointments found.</p>
//       ) : (
//         <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
//           {filteredAppointments.map((appointment) => (
//             <AppointmentCard key={appointment._id} appointment={appointment} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AppointmentList;



"use client";

import { useEffect, useState } from "react";
import { getUserAppointments } from "@/utils/api";
import AppointmentCard from "./AppointmentCard";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Select, SelectItem } from "@/components/ui/Select";
import { cn } from "@/lib/utils"; // if you're using tailwind className merging


const SelectTrigger = ({ children, className, ...props }) => (
  <button
    className={cn(
      "w-full border border-input bg-background px-3 py-2 rounded-md text-left text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring",
      className
    )}
    {...props}
  >
    {children}
  </button>
);

const SelectContent = ({ children, className, ...props }) => (
  <div
    className={cn(
      "w-full mt-1 border bg-white rounded-md shadow-md overflow-hidden z-10",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

const SelectValue = ({ placeholder }) => (
  <span className="text-muted-foreground">{placeholder}</span>
);


const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    const fetchAppointments = async () => {
      const res = await getUserAppointments();
      if (res.success) {
        setAppointments(res.data || []);
        setFilteredAppointments(res.data || []);
      }
      setLoading(false);
    };

    fetchAppointments();
  }, []);

  useEffect(() => {
    let filtered = [...appointments];

    // Search filter
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((apt) =>
        apt.doctorName?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((apt) => apt.status === statusFilter);
    }

    // Sort by date
    filtered.sort((a, b) =>
      sortOrder === "asc"
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date)
    );

    setFilteredAppointments(filtered);
  }, [searchQuery, statusFilter, sortOrder, appointments]);

  return (
    <div>
      {/* FILTER CONTROLS */}
      <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Input
          placeholder="Search by doctor name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortOrder} onValueChange={setSortOrder}>
          <SelectTrigger>
            <SelectValue placeholder="Sort by date" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="desc">Newest First</SelectItem>
            <SelectItem value="asc">Oldest First</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* APPOINTMENT CARDS */}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="animate-spin text-primary h-10 w-10" />
        </div>
      ) : filteredAppointments.length === 0 ? (
        <p className="text-gray-600 text-center">No appointments found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {filteredAppointments.map((appointment) => (
            <AppointmentCard key={appointment._id} appointment={appointment} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AppointmentList;
