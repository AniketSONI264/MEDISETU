"use client";
import { Dialog, DialogContent } from "@/components/ui/Dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion } from "framer-motion";
import { usePayment } from '../../hooks/usePayment';
import { verifyPayment, bookAppointment, createOrder, getSingleAppointment } from '../../utils/api';
import { toast } from 'react-toastify';
import BookingSuccess from './BookingSuccess';
import { useRouter } from 'next/navigation';

const BookingConfirmationModal = ({ open, setOpen, doctor, appointmentDate, appointmentTime, user }) => {
  const router = useRouter();
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState(null);
  const [vitals, setVitals] = useState({
    bp: "",
    sugar: "",
    height: "",
    weight: ""
  });
  const { initializePayment } = usePayment();

  const handleVitalsChange = (field, value) => {
    setVitals(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePaymentSuccess = async (response, bookingResponse) => {
    try {
      // Step 1: Verify payment
      const verificationResponse = await verifyPayment({
        orderId: response.razorpay_order_id,
        paymentId: response.razorpay_payment_id,
        signature: response.razorpay_signature,
        appointmentId: bookingResponse.appointmentId
      });

      if (!verificationResponse?.appointment) {
        throw new Error(verificationResponse?.message || 'Payment verification failed');
      }

      // Step 2: Get updated appointment details
      const updatedAppointment = await getSingleAppointment(bookingResponse.appointmentId);

      if (!updatedAppointment) {
        throw new Error('Failed to fetch appointment details');
      }

      // Step 3: Prepare success data
      const successData = {
        ...updatedAppointment,
        doctor: {
          firstName: doctor.firstName,
          lastName: doctor.lastName,
          specialization: doctor.specialization,
          fees: doctor.consultationFees
        },
        payment: {
          amount: bookingResponse.razorpayOrder.amount,
          currency: bookingResponse.razorpayOrder.currency,
          orderId: response.razorpay_order_id,
          paymentId: response.razorpay_payment_id,
          status: 'success'
        },
        vitals: vitals,
        appointmentTime: appointmentTime,
        appointmentDate: appointmentDate,
        reason: reason
      };

      // Step 4: Set appointment details and show success
      setAppointmentDetails(successData);
      setShowSuccess(true);
      setOpen(false);

      // Step 5: Show success message
      toast.success('Appointment booked successfully!');

      // Step 6: Navigate to success page with data
      router.push(`/appointment/success?data=${encodeURIComponent(JSON.stringify(successData))}`);
    } catch (error) {
      console.error('Payment success handling error:', error);
      toast.error(error.message || 'Failed to complete appointment booking');
    }
  };

  const handlePayment = async () => {
    try {
      setLoading(true);

      // Validate user data
      if (!user?.name || !user?.email || !user?.phone) {
        throw new Error('Please complete your profile before booking');
      }

      // Validate doctor fees
      if (!doctor?.consultationFees || doctor.consultationFees <= 0) {
        throw new Error('Invalid consultation fees');
      }

      // Validate vitals
      if (!vitals.bp || !vitals.sugar || !vitals.height || !vitals.weight) {
        throw new Error('Please provide all vitals information');
      }

      // Step 1: Create appointment
      const bookingResponse = await bookAppointment({
        doctorId: doctor._id,
        userId: user._id,
        appointmentDate,
        appointmentTime,
        reason,
        paymentAmount: doctor.consultationFees,
        vitals
      });

      if (!bookingResponse?.appointmentId || !bookingResponse?.razorpayOrder?.id) {
        throw new Error('Failed to create appointment and order');
      }

      // Step 2: Initialize Razorpay payment with dynamic data
      const paymentResult = await initializePayment({
        orderId: bookingResponse.razorpayOrder.id,
        amount: doctor.consultationFees,
        currency: 'INR',
        userDetails: {
          name: user.name,
          email: user.email,
          phone: user.phone,
          _id: user._id
        },
        doctorDetails: {
          id: doctor._id,
          name: `${doctor.firstName} ${doctor.lastName}`,
          specialization: doctor.specialization,
          fees: doctor.consultationFees
        },
        appointmentDetails: {
          id: bookingResponse.appointmentId,
          date: appointmentDate,
          time: appointmentTime,
          reason: reason
        },
        onSuccess: (response) => handlePaymentSuccess(response, bookingResponse),
        onError: (error) => {
          console.error('Payment failed:', error);
          toast.error(error.message || 'Payment failed');
        },
        onDismiss: () => {
          toast.info('Payment cancelled');
        }
      });

      if (!paymentResult) {
        throw new Error('Payment initialization failed');
      }
    } catch (error) {
      console.error('Payment flow error:', error);
      toast.error(error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md rounded-2xl bg-white border border-gray-200 p-6 shadow-xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-bold text-teal-700 mb-4">Confirm Your Booking</h2>
            <div className="space-y-2">
              <p><strong>Doctor:</strong> Dr. {doctor.firstName} {doctor.lastName}</p>
              <p><strong>Specialization:</strong> {doctor.specialization}</p>
              <p><strong>Date:</strong> {new Date(appointmentDate).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</p>
              <p><strong>Time:</strong> {appointmentTime}</p>
              <p><strong>Consultation Fees:</strong> ₹{doctor.consultationFees.toLocaleString('en-IN')}</p>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Appointment</label>
              <textarea
                rows={3}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Describe symptoms or reason..."
              />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Blood Pressure</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={vitals.bp}
                  onChange={(e) => handleVitalsChange('bp', e.target.value)}
                  placeholder="e.g., 120/80"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Blood Sugar</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={vitals.sugar}
                  onChange={(e) => handleVitalsChange('sugar', e.target.value)}
                  placeholder="e.g., 100 mg/dL"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Height (cm)</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={vitals.height}
                  onChange={(e) => handleVitalsChange('height', e.target.value)}
                  placeholder="e.g., 170"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={vitals.weight}
                  onChange={(e) => handleVitalsChange('weight', e.target.value)}
                  placeholder="e.g., 70"
                />
              </div>
            </div>

            <Button
              className="w-full mt-5 bg-teal-600 hover:bg-teal-700 transition"
              onClick={handlePayment}
              disabled={loading || !reason || !vitals.bp || !vitals.sugar || !vitals.height || !vitals.weight}
            >
              {loading ? "Processing..." : `Pay ₹${doctor.consultationFees.toLocaleString('en-IN')}`}
            </Button>
          </motion.div>
        </DialogContent>
      </Dialog>

      <BookingSuccess
        open={showSuccess}
        setOpen={setShowSuccess}
        appointmentDetails={appointmentDetails}
      />
    </>
  );
};

export default BookingConfirmationModal;
