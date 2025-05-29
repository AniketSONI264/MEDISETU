"use client";
import React, { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button.jsx";
import {
  CalendarDays,
  Mail,
  Phone,
  UserRoundCheck,
  Hospital,
  MapPin,
  Languages,
  Landmark,
  GraduationCap,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";
import { MotionDiv } from "@/components/Shared/MotionDiv.jsx";
import Image from "next/image";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { motion } from "framer-motion";
import { generateTimeSlots } from "@/utils/slotTimings.js";
import { toast } from "react-hot-toast";
import AppointmentModal from "./AppointmentModal.jsx";
import { useAuth } from "@/context/AuthContext";

const DoctorProfilePage = ({ doctor }) => {
  const { user, loading, checkAuth } = useAuth();
  const {
    _id,
    profilePic,
    firstName,
    lastName,
    email,
    phone,
    gender,
    dob,
    specialization,
    experience,
    qualification,
    registrationNumber,
    medicalCouncil,
    consultationFees,
    consultationDuration,
    languagesSpoken,
    bio,
    clinicName,
    location,
    availableTimings,
    isVerified,
    socialLinks,
    tags,
  } = doctor;

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const getDayOfWeek = (date) => {
    return new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(date);
  };

  const isAvailableOnSelectedDate = () => {
    const selectedDay = getDayOfWeek(selectedDate);
    return availableTimings?.some(
      (t) => t.day === selectedDay && !t.unavailable
    );
  };

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const day = getDayOfWeek(date);
      const isAvailable = availableTimings?.some(
        (t) => t.day === day && !t.unavailable
      );
      return isAvailable ? "bg-green-100 text-green-800 font-semibold" : null;
    }
    return null;
  };
  const handleBook = () => {
    if (!selectedTime) {
      toast.error("Please select a time slot first");
      return;
    }
    if (!user) {
      toast.error("Please login to book an appointment");
      return;
    }
    setModalOpen(true);
    // console.log("Doctor Details:", doctor);
    // console.log("User Details:", user);
  };

  const handleConfirm = ({ date, time, reason }) => {
    // call your API here...
    console.log("Booking:", { date, time, reason });
    setModalOpen(false);
  };

  const handleBookAppointment = () => {
    if (!selectedTime) {
      toast.error("Please select a time slot");
      return;
    }
    setModalOpen(true);
  };

  const renderAvailableTimes = () => {
    const selectedDay = getDayOfWeek(selectedDate);
    const timing = availableTimings?.find((t) => t.day === selectedDay);
    if (!timing || timing.unavailable)
      return (
        <p className="text-sm text-red-500">
          Doctor not available on selected day.
        </p>
      );

    const timeSlots = generateTimeSlots(
      timing.start,
      timing.end,
      timing.interval || 10
    );

    return (
      <div className="flex flex-wrap gap-4">
        {timeSlots.map((slot, idx) => (
          <Button
            key={idx}
            onClick={() => setSelectedTime(slot)}
            className={`rounded-full px-5 py-2.5 text-sm font-semibold border transition-all duration-300
        ${selectedTime === slot
                ? "bg-gradient-to-r from-blue-500 to-teal-400 text-black shadow-lg scale-105"
                : "bg-gray-900 text-gray-700 hover:bg-blue-100 hover:text-white hover:scale-105"
              }`}
          >
            {slot}
          </Button>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-8">
      <MotionDiv
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Sidebar */}
        <motion.div
          className="col-span-1 space-y-4"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="rounded-2xl border bg-white shadow-xl overflow-hidden w-full max-w-md mx-auto sticky top-24 md:top-20">
            <div className="relative w-full h-60 md:h-64">
              <Image
                src={profilePic || "/MediSetu_Logo_W100.svg"}
                alt="Doctor"
                fill
                className="object-cover"
              />
            </div>

            <div className="p-4 sm:p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                  Dr. {firstName} {lastName}
                </h2>
                {isVerified && (
                  <UserRoundCheck className="w-5 h-5 text-green-500 flex-shrink-0" />
                )}
              </div>

              <p className="text-sm text-gray-500">
                {specialization} • {experience}+ yrs
              </p>

              <div className="space-y-1">
                <p className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" /> {email}
                </p>
                <p className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" /> {phone}
                </p>
                <p className="text-sm text-gray-500">
                  DOB: {dob || "12/12/2003"} | Gender: {gender || "Male"}
                </p>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                {socialLinks?.facebook && (
                  <a
                    href={socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Facebook className="w-6 h-6 text-blue-600 hover:scale-110 transition-transform cursor-pointer" />
                  </a>
                )}
                {socialLinks?.instagram && (
                  <a
                    href={socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Instagram className="w-6 h-6 text-pink-500 hover:scale-110 transition-transform cursor-pointer" />
                  </a>
                )}
                {socialLinks?.linkedin && (
                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="w-6 h-6 text-blue-700 hover:scale-110 transition-transform cursor-pointer" />
                  </a>
                )}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Main Content */}
        <motion.div
          className="col-span-2 space-y-6"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="p-6 rounded-2xl border bg-white shadow-md space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">
              About Dr. {firstName} {lastName}
            </h3>
            <p className="text-gray-600 leading-relaxed">{bio}</p>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-700 pt-4">
              <p>
                <GraduationCap className="inline w-4 h-4 mr-1" /> Qualification:{" "}
                {qualification}
              </p>
              <p>
                <Landmark className="inline w-4 h-4 mr-1" /> Registered at:{" "}
                {medicalCouncil}
              </p>
              <p>
                <Hospital className="inline w-4 h-4 mr-1" /> Clinic:{" "}
                {clinicName}
              </p>
              <p>
                <MapPin className="inline w-4 h-4 mr-1" /> Location:{" "}
                {location?.city}, {location?.state} ({location?.pincode})
              </p>
              <p>
                <Languages className="inline w-4 h-4 mr-1" /> Speaks:{" "}
                {languagesSpoken?.join(", ")}
              </p>
              <p>
                <CalendarDays className="inline w-4 h-4 mr-1" /> Fees: ₹
                {consultationFees} • {consultationDuration}
              </p>
              <p>Reg No: {registrationNumber}</p>
            </div>
          </Card>

          {/* Appointment Booking */}
          <Card className="p-6 rounded-2xl border bg-white shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Book Appointment
            </h3>
            <p className="text-sm text-gray-500">
              Selected: <strong>{getDayOfWeek(selectedDate)}</strong>,{" "}
              {selectedDate.toDateString()}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Calendar
                value={selectedDate}
                onChange={setSelectedDate}
                minDate={new Date()}
                tileClassName={tileClassName}
                tileDisabled={({ date, view }) => {
                  if (view === "month" && date < new Date().setHours(0, 0, 0, 0)) {
                    return true;
                  }
                  const day = getDayOfWeek(date);
                  const isAvailable = availableTimings?.some(
                    (t) => t.day === day && !t.unavailable
                  );
                  return !isAvailable;
                }}
              />

              <div className="flex flex-col gap-4">
                <p className="text-gray-700">
                  Available Slots for {selectedDate.toDateString()}
                </p>
                {renderAvailableTimes()}

                <button
                  onClick={handleBook}
                  className="w-full py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
                >
                  Book Now
                </button>
              </div>
            </div>
          </Card>
        </motion.div>
      </MotionDiv>
      {modalOpen && (
        <AppointmentModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          doctor={doctor}
          date={selectedDate}
          time={selectedTime}
          user={user}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
};

export default DoctorProfilePage;
