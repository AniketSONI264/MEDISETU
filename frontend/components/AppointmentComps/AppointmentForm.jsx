"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
// import { Textarea } from "@/components/ui/textarea";
import axios from "axios";

const AppointmentForm = ({ doctorId, date, time, onClose }) => {
  const [form, setForm] = useState({
    name: "",
    age: "",
    email: "",
    reason: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const payload = {
        doctorId,
        appointmentDate: date,
        appointmentTime: time,
        patientName: form.name,
        patientAge: form.age,
        patientEmail: form.email,
        reason: form.reason,
      };

      const res = await axios.post("/api/appointments/book", payload);
      alert("Appointment booked successfully!");
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to book appointment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Input
        name="name"
        placeholder="Your Name"
        value={form.name}
        onChange={handleChange}
      />
      <Input
        name="age"
        type="number"
        placeholder="Your Age"
        value={form.age}
        onChange={handleChange}
      />
      <Input
        name="email"
        type="email"
        placeholder="Your Email"
        value={form.email}
        onChange={handleChange}
      />
      {/* <Textarea
        name="reason"
        placeholder="Reason for appointment"
        value={form.reason}
        onChange={handleChange}
      /> */}
      <textarea
        className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring focus:ring-primary"
        placeholder="Reason for appointment"
        value={form.reason}
        onChange={handleChange}
      ></textarea>

      <Button
        className="w-full bg-blue-600 hover:bg-blue-700"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Booking..." : "Confirm Appointment"}
      </Button>
    </div>
  );
};

export default AppointmentForm;
