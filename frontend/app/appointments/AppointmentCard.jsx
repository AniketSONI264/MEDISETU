"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Clock,
  Stethoscope,
  VideoIcon,
  Phone,
  Mail,
  ActivitySquare,
  Heart,
  Ruler,
  Weight,
  FileText,
  Timer,
  CheckCircle,
  XCircle,
} from "lucide-react";
import moment from "moment";
import { useEffect, useState } from "react";
import { getDoctorById,cancelAppointment } from "@/utils/api";
import { toast } from "react-hot-toast";

export default function UserAppointmentsCard({ appointment }) {
  const {
    doctorId,
    appointmentDate,
    timeSlot,
    status,
    paymentStatus,
    razorpay,
    vitals,
    meetLink,
    createdAt,
    updatedAt,
    notes,
  } = appointment;

  const [timeLeft, setTimeLeft] = useState(null);
  const [isToday, setIsToday] = useState(false);
  const [doctorData, setDoctorData] = useState(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const { data } = await getDoctorById(doctorId?._id);
        setDoctorData(data?.doctor);
      } catch (error) {
        console.error("Failed to fetch doctor:", error);
      }
    };
    if (doctorId?._id) fetchDoctor();
  }, [doctorId]);

  useEffect(() => {
    const apptDate = moment(appointmentDate);
    const now = moment();
    const isSameDay = apptDate.isSame(now, "day");
    setIsToday(isSameDay);

    if (isSameDay) {
      const target = moment(`${appointmentDate} ${timeSlot}`, "YYYY-MM-DD h:mm A");
      const interval = setInterval(() => {
        const diff = moment.duration(target.diff(moment()));
        if (diff.asMilliseconds() <= 0) {
          clearInterval(interval);
          setTimeLeft("Started / Passed");
        } else {
          setTimeLeft(`${diff.hours()}h ${diff.minutes()}m ${diff.seconds()}s`);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [appointmentDate, timeSlot]);

  const handleCancelAppointment = async () => {
    try {
      const res = await cancelAppointment(appointment._id); // Assuming appointment._id exists
      toast.success("Appointment cancelled successfully");
      // Optionally update status locally
      setTimeout(() => {
        window.location.reload(); // or optimistically update the state if you manage list outside
      }, 1000);
    } catch (error) {
      console.error("Failed to cancel appointment:", error);
      toast.error("Something went wrong. Couldn't cancel appointment.");
    }
  };


  const handleJoinMeet = () => {
    if (meetLink?.startsWith("http")) {
      window.open(meetLink, "_blank");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)" }}
      transition={{ duration: 0.3 }}
    >
      <Card className="w-full rounded-2xl shadow-md border bg-white dark:bg-gray-900 dark:text-white hover:shadow-xl transition-all duration-300">
        <CardContent className="p-5 flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-lg md:text-xl font-bold flex items-center gap-2">
                <img
                  src={doctorId?.profilePic || "/MediSetu Logo White.svg"}
                  alt="Doctor profile"
                  className="w-14 h-14 rounded-full object-cover border shadow-sm"
                />
                Dr. {doctorId?.firstName} {doctorId?.lastName}
              </h2>
              <p className="text-sm flex items-center gap-1">
                <Stethoscope className="w-4 h-4" />
                {doctorId?.specialization || "N/A"}
              </p>
              <p className="text-xs flex items-center gap-1">
                <Phone className="w-3 h-3" /> {doctorId?.phone || "N/A"} |
                <Mail className="w-3 h-3 ml-1" /> {doctorId?.email || "N/A"}
              </p>
            </div>
            <div className="flex flex-col gap-1 text-right">
              <Badge variant="secondary">{status?.toUpperCase()}</Badge>
              <Badge variant={paymentStatus === "paid" ? "default" : "destructive"}>
                {paymentStatus?.toUpperCase()}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4" />
              <span className="font-medium">Date:</span> {moment(appointmentDate).format("DD MMM YYYY")}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span className="font-medium">Time:</span> {timeSlot}
            </div>
            {isToday && (
              <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                <Timer className="w-4 h-4" />
                <span className="font-medium">Starts in:</span> {timeLeft}
              </div>
            )}
          </div>

          <div>
            <p className="text-sm font-semibold mb-1">Vitals</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
              <p className="flex items-center gap-1"><ActivitySquare className="w-3 h-3" /> BP: {vitals?.bp || "N/A"}</p>
              <p className="flex items-center gap-1"><Heart className="w-3 h-3" /> Sugar: {vitals?.sugar || "N/A"}</p>
              <p className="flex items-center gap-1"><Ruler className="w-3 h-3" /> Height: {vitals?.height || "N/A"} cm</p>
              <p className="flex items-center gap-1"><Weight className="w-3 h-3" /> Weight: {vitals?.weight || "N/A"} kg</p>
            </div>
          </div>

          {notes && (
            <div>
              <p className="text-sm font-semibold mb-1">Doctor/Patient Notes</p>
              <p className="text-xs italic text-gray-600 dark:text-gray-400">{notes}</p>
            </div>
          )}

          <div>
            <p className="text-sm font-semibold mb-1">Payment Info</p>
            <div className="text-xs space-y-1">
              <p><strong>Order ID:</strong> {razorpay?.orderId || "N/A"}</p>
              <p><strong>Payment ID:</strong> {razorpay?.paymentId || "Not Paid"}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {meetLink && (
              <Button
                onClick={handleJoinMeet}
                variant="default"
                className="flex gap-2 items-center bg-teal-600 hover:bg-teal-700 hover:scale-[1.02] transition-all text-white duration-300 shadow"
              >
                <VideoIcon className="w-4 h-4" /> <span className="text:white" >Join Meet</span>
              </Button>
            )}

            <motion.button
              onClick={handleCancelAppointment}
              whileHover={{ scale: 1.05, boxShadow: "0 8px 15px rgba(255, 0, 0, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="flex gap-2 items-center text-white bg-red-600 hover:bg-red-700 hover:scale-[1.02] transition-all duration-300 px-4 py-2 rounded-lg shadow"
            >
              <XCircle className="w-4 h-4" />
              Cancel Appointment
            </motion.button>


            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 8px 15px rgba(0, 0, 0, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="flex gap-2 items-center bg-gray-500 text-white px-4 py-2 rounded-md"
            >
              <CheckCircle className="w-4 h-4" /> Mark as Attended
            </motion.button>

          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}



