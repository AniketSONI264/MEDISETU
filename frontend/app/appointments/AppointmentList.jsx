// "use client";
// import { useState, useMemo } from "react";
// import UserAppointmentsCard from "./AppointmentCard";
// import { Select, SelectItem } from "@/components/ui/select";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { format, isAfter, isBefore } from "date-fns";

// const statusOptions = ["all", "confirmed", "cancelled", "pending"];
// const paymentOptions = ["all", "paid", "unpaid"];
// const timeOptions = ["all", "upcoming", "past"];

// export default function UserAppointmentsList({ appointments }) {
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [paymentFilter, setPaymentFilter] = useState("all");
//   const [specializationFilter, setSpecializationFilter] = useState("all");
//   const [search, setSearch] = useState("");
//   const [feeMax, setFeeMax] = useState("");
//   const [timeFilter, setTimeFilter] = useState("all");
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");

//   const specializations = Array.from(
//     new Set(
//       appointments
//         .map((a) => a?.doctorId?.specialization)
//         .filter(Boolean)
//     )
//   );

//   const now = new Date();

//   const filteredAppointments = useMemo(() => {
//     return appointments.filter((appt) => {
//       const statusMatch = statusFilter === "all" || appt.status === statusFilter;
//       const paymentMatch = paymentFilter === "all" || appt.paymentStatus === paymentFilter;
//       const specializationMatch =
//         specializationFilter === "all" ||
//         appt?.doctorId?.specialization === specializationFilter;
//       const doctorNameMatch =
//         appt?.doctorId?.firstName?.toLowerCase().includes(search.toLowerCase()) ||
//         appt?.doctorId?.lastName?.toLowerCase().includes(search.toLowerCase());
//       const feeMatch = feeMax === "" || appt?.consultationFees <= parseInt(feeMax);
//       const timeMatch =
//         timeFilter === "all" ||
//         (timeFilter === "upcoming" && isAfter(new Date(appt.date), now)) ||
//         (timeFilter === "past" && isBefore(new Date(appt.date), now));
//       const dateRangeMatch =
//         (!fromDate || isAfter(new Date(appt.date), new Date(fromDate))) &&
//         (!toDate || isBefore(new Date(appt.date), new Date(toDate)));

//       return (
//         statusMatch &&
//         paymentMatch &&
//         specializationMatch &&
//         doctorNameMatch &&
//         feeMatch &&
//         timeMatch &&
//         dateRangeMatch
//       );
//     });
//   }, [
//     appointments,
//     statusFilter,
//     paymentFilter,
//     specializationFilter,
//     search,
//     feeMax,
//     timeFilter,
//     fromDate,
//     toDate,
//   ]);

//   return (
//     <div className="space-y-4">
//       {/* Filters UI */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 p-4 rounded-xl bg-muted">
//         {/* Status */}
//         <div>
//           <label className="text-sm font-medium">Status</label>
//           <Select value={statusFilter} onValueChange={setStatusFilter}>
//             {statusOptions.map((option) => (
//               <SelectItem key={option} value={option}>
//                 {option.toUpperCase()}
//               </SelectItem>
//             ))}
//           </Select>
//         </div>

//         {/* Payment */}
//         <div>
//           <label className="text-sm font-medium">Payment</label>
//           <Select value={paymentFilter} onValueChange={setPaymentFilter}>
//             {paymentOptions.map((option) => (
//               <SelectItem key={option} value={option}>
//                 {option.toUpperCase()}
//               </SelectItem>
//             ))}
//           </Select>
//         </div>

//         {/* Specialization */}
//         <div>
//           <label className="text-sm font-medium">Specialization</label>
//           <Select
//             value={specializationFilter}
//             onValueChange={setSpecializationFilter}
//           >
//             <SelectItem value="all">ALL</SelectItem>
//             {specializations.map((spec) => (
//               <SelectItem key={spec} value={spec}>
//                 {spec}
//               </SelectItem>
//             ))}
//           </Select>
//         </div>

//         {/* Time Filter */}
//         <div>
//           <label className="text-sm font-medium">Time</label>
//           <Select value={timeFilter} onValueChange={setTimeFilter}>
//             {timeOptions.map((option) => (
//               <SelectItem key={option} value={option}>
//                 {option.toUpperCase()}
//               </SelectItem>
//             ))}
//           </Select>
//         </div>

//         {/* Fee */}
//         <div>
//           <label className="text-sm font-medium">Max Fees (₹)</label>
//           <Input
//             type="number"
//             placeholder="e.g. 500"
//             value={feeMax}
//             onChange={(e) => setFeeMax(e.target.value)}
//           />
//         </div>

//         {/* Search Doctor */}
//         <div>
//           <label className="text-sm font-medium">Doctor Name</label>
//           <Input
//             placeholder="e.g. Ramesh"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>

//         {/* From Date */}
//         <div>
//           <label className="text-sm font-medium">From Date</label>
//           <Input
//             type="date"
//             value={fromDate}
//             onChange={(e) => setFromDate(e.target.value)}
//           />
//         </div>

//         {/* To Date */}
//         <div>
//           <label className="text-sm font-medium">To Date</label>
//           <Input
//             type="date"
//             value={toDate}
//             onChange={(e) => setToDate(e.target.value)}
//           />
//         </div>

//         {/* Reset */}
//         <div className="col-span-full">
//           <Button
//             variant="outline"
//             onClick={() => {
//               setStatusFilter("all");
//               setPaymentFilter("all");
//               setSpecializationFilter("all");
//               setSearch("");
//               setFeeMax("");
//               setTimeFilter("all");
//               setFromDate("");
//               setToDate("");
//             }}
//           >
//             Reset All Filters
//           </Button>
//         </div>
//       </div>

//       {/* Filtered Results */}
//       {filteredAppointments.length > 0 ? (
//         filteredAppointments.map((appointment) => (
//           <UserAppointmentsCard key={appointment._id} appointment={appointment} />
//         ))
//       ) : (
//         <p className="italic text-muted-foreground text-center">
//           No appointments match your filters.
//         </p>
//       )}
//     </div>
//   );
// }


// app/appointments/AppointmentList.jsx
"use client";
import { useEffect, useState } from "react";
import { getUserAppointments } from "@/utils/api";
import AppointmentCard from "./AppointmentCard";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
