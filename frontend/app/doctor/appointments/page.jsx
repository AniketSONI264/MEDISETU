// export default function appointments(){
//     return (
//         <h1 className="text-2xl font-bold mt-[100px]">Appointments</h1>
//     )
// }



// "use client";

// import { useState, useMemo } from "react";
// import { useAppointments } from "@/hooks/doctorPanelHooks";
// import { Input } from "@/components/ui/Input";
// import { Select, SelectItem } from "@/components/ui/Select";
// import { Card, CardContent } from "@/components/ui/card";
// import { format } from "date-fns";
// import { Loader2 } from "lucide-react";

// const STATUS_OPTIONS = ["Pending", "Approved", "Rejected", "Completed"];

// export default function DoctorAppointmentsPage() {
//   const { appointments, loading, updateStatus } = useAppointments();
//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("");
//   const [sortBy, setSortBy] = useState("date_desc");

//   const filteredAppointments = useMemo(() => {
//     let data = appointments || [];

//     if (search) {
//       data = data.filter(
//         (item) =>
//           item?.patient?.name?.toLowerCase().includes(search.toLowerCase()) ||
//           item?.appointmentId?.toLowerCase().includes(search.toLowerCase())
//       );
//     }

//     if (statusFilter) {
//       data = data.filter((item) => item.status === statusFilter);
//     }

//     if (sortBy === "date_asc") {
//       data = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));
//     } else if (sortBy === "date_desc") {
//       data = [...data].sort((a, b) => new Date(b.date) - new Date(a.date));
//     }

//     return data;
//   }, [appointments, search, statusFilter, sortBy]);

//   return (
//     <div className="p-6 space-y-4">
//       <div className="flex flex-col sm:flex-row items-center gap-4">
//         <Input
//           placeholder="Search by patient name or ID"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="max-w-sm"
//         />

//         <Select onValueChange={setStatusFilter} value={statusFilter}>
//           <SelectItem value="">All Statuses</SelectItem>
//           {STATUS_OPTIONS.map((status) => (
//             <SelectItem key={status} value={status}>
//               {status}
//             </SelectItem>
//           ))}
//         </Select>

//         <Select onValueChange={setSortBy} value={sortBy}>
//           <SelectItem value="date_desc">Newest First</SelectItem>
//           <SelectItem value="date_asc">Oldest First</SelectItem>
//         </Select>
//       </div>

//       {loading ? (
//         <div className="flex justify-center items-center py-10">
//           <Loader2 className="animate-spin h-8 w-8 text-primary" />
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {filteredAppointments.map((appt) => (
//             <Card key={appt._id} className="shadow-md">
//               <CardContent className="p-4 space-y-2">
//                 <h3 className="text-lg font-semibold">
//                   {appt?.patient?.name || "Unnamed Patient"}
//                 </h3>
//                 <p className="text-sm text-muted-foreground">
//                   ID: {appt.appointmentId}
//                 </p>
//                 <p className="text-sm">
//                   <span className="font-medium">Date:</span>{" "}
//                   {format(new Date(appt.date), "dd MMM yyyy, hh:mm a")}
//                 </p>
//                 <p className="text-sm">
//                   <span className="font-medium">Status:</span> {appt.status}
//                 </p>
//                 {appt.status !== "Completed" && (
//                   <button
//                     className="text-blue-600 hover:underline text-sm"
//                     onClick={() => updateStatus(appt._id, "Completed")}
//                   >
//                     Mark as Completed
//                   </button>
//                 )}
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }





"use client";

import { useState, useMemo } from "react";
import useDoctorAuth from "@/hooks/useDoctorAuth";
import useAppointments from "@/hooks/doctor/useAppointment";
import { Input } from "@/components/ui/Input";
import { Select, SelectItem } from "@/components/ui/Select";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";

const STATUS_OPTIONS = ["Pending", "Approved", "Rejected", "Completed"];

export default function DoctorAppointmentsPage() {
  const { doctor, loading: doctorLoading } = useDoctorAuth();
  const {
    appointments,
    loading: appointmentsLoading,
    updateStatus,
  } = useAppointments(doctor?._id);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortBy, setSortBy] = useState("date_desc");

  const filteredAppointments = useMemo(() => {
    let data = appointments || [];

    if (search) {
      data = data.filter(
        (item) =>
          item?.patient?.name?.toLowerCase().includes(search.toLowerCase()) ||
          item?.appointmentId?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (statusFilter) {
      data = data.filter((item) => item.status === statusFilter);
    }

    if (sortBy === "date_asc") {
      data = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortBy === "date_desc") {
      data = [...data].sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    return data;
  }, [appointments, search, statusFilter, sortBy]);

  if (doctorLoading || appointmentsLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader2 className="animate-spin h-8 w-8 text-primary" />
      </div>
    );
  }

  // Handler to mark an appointment as completed, with error handling
  const handleMarkCompleted = async (id) => {
    try {
      await updateStatus(id, "Completed");
      // Optional: you could trigger a refetch or optimistic update here if your hook supports it
    } catch (error) {
      alert(error.message || "Failed to update appointment status");
    }
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Input
          placeholder="Search by patient name or ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />

        <Select onValueChange={setStatusFilter} value={statusFilter}>
          <SelectItem value="">All Statuses</SelectItem>
          {STATUS_OPTIONS.map((status) => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </Select>

        <Select onValueChange={setSortBy} value={sortBy}>
          <SelectItem value="date_desc">Newest First</SelectItem>
          <SelectItem value="date_asc">Oldest First</SelectItem>
        </Select>
      </div>

      {filteredAppointments.length === 0 ? (
        <div className="text-center text-gray-500 py-10">No appointments found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAppointments.map((appt) => (
            <Card key={appt._id} className="shadow-md">
              <CardContent className="p-4 space-y-2">
                <h3 className="text-lg font-semibold">
                  {appt?.patient?.name || "Unnamed Patient"}
                </h3>
                <p className="text-sm text-muted-foreground">ID: {appt.appointmentId}</p>
                <p className="text-sm">
                  <span className="font-medium">Date:</span>{" "}
                  {format(new Date(appt.date), "dd MMM yyyy, hh:mm a")}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Status:</span> {appt.status}
                </p>
                {appt.status !== "Completed" && (
                  <button
                    className="text-blue-600 hover:underline text-sm"
                    onClick={() => handleMarkCompleted(appt._id)}
                  >
                    Mark as Completed
                  </button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
