"use client";
import React, { useEffect, useState } from "react";
import { X, Calendar, Clock2, Info, CreditCard, XCircle, Loader2 } from "lucide-react";
import { usePayment } from "@/hooks/usePayment";
import { toast } from "react-hot-toast";
import { bookAppointment, verifyPayment } from "@/utils/api";

export default function AppointmentModal({
  isOpen,
  onClose,
  doctor,
  date,
  time,
  user,
  onConfirm,
}) {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    reason: "",
    consultationFees:"",
    bp: "",
    sugar: "",
    height: "",
    weight: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const { initializePayment } = usePayment();

  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Reset states when modal closes
  useEffect(() => {
    if (!isOpen) {
      setPaymentStatus(null);
      setIsProcessing(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      }));
    }
  }, [user]);

  if (!isOpen) return null;

  // Calculate end time (+10min)
  const [h, m] = time.split(":").map((t) => parseInt(t, 10));
  const end = new Date(date);
  end.setHours(h, m + 10);
  const endTime = end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const validateVitals = () => {
    // Blood Pressure validation (accepts formats like 120/80, 120-80, or just numbers)
    if (!formData.bp.trim()) {
      toast.error("Please enter blood pressure");
      return false;
    }
    const bpRegex = /^(\d{2,3})[\/\-]?(\d{2,3})$/;
    if (!bpRegex.test(formData.bp.trim())) {
      toast.error("Please enter blood pressure in format: 120/80 or 120-80");
      return false;
    }

    // Blood Sugar validation (accepts any number between 50-500)
    if (!formData.sugar.trim()) {
      toast.error("Please enter blood sugar");
      return false;
    }
    const sugarValue = parseFloat(formData.sugar.trim().replace(/[^0-9.]/g, ''));
    if (isNaN(sugarValue) || sugarValue < 50 || sugarValue > 500) {
      toast.error("Please enter a valid blood sugar value between 50-500");
      return false;
    }

    // Height validation (accepts numbers between 50-250 cm)
    if (!formData.height.trim()) {
      toast.error("Please enter height");
      return false;
    }
    const heightValue = parseFloat(formData.height.trim().replace(/[^0-9.]/g, ''));
    if (isNaN(heightValue) || heightValue < 50 || heightValue > 250) {
      toast.error("Please enter a valid height between 50-250 cm");
      return false;
    }

    // Weight validation (accepts numbers between 20-200 kg)
    if (!formData.weight.trim()) {
      toast.error("Please enter weight");
      return false;
    }
    const weightValue = parseFloat(formData.weight.trim().replace(/[^0-9.]/g, ''));
    if (isNaN(weightValue) || weightValue < 20 || weightValue > 200) {
      toast.error("Please enter a valid weight between 20-200 kg");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login to book an appointment");
      return;
    }
    onConfirm(formData);
  };
//3
const handlePayment = async () => {
  if (!formData.reason.trim()) {
    toast.error("Please provide a reason for the appointment");
    return;
  }

  if (!validateVitals()) {
    return;
  }

  setIsProcessing(true);
  setPaymentStatus('processing');

  try {
    const formattedDate = date.toISOString().split('T')[0];

    const cleanedData = {
      doctorId: doctor._id,
      consulatationFees:doctor.consultationFees,
      userId: user._id,
      appointmentDate: new Date(formattedDate),
      timeSlot: time,
      appointmentTime: time,
      reasonForVisit: formData.reason.trim(),
      paymentAmount: Number(doctor.consultationFees),
      vitals: {
        bp: formData.bp.trim(),
        sugar: formData.sugar.trim().replace(/[^0-9.]/g, ''),
        height: Number(formData.height.trim().replace(/[^0-9.]/g, '')),
        weight: Number(formData.weight.trim().replace(/[^0-9.]/g, ''))
      }
    };

    console.log('[handlePayment] Booking appointment with data:', cleanedData);
    const bookingResponse = await bookAppointment(cleanedData);

    if (!bookingResponse.success) {
      toast.error(bookingResponse.message);
      setPaymentStatus('failed');
      return;
    }

    const { data: bookingData } = bookingResponse;
    const razorpayOrderId = bookingData?.razorpayOrder?.id;

    if (!razorpayOrderId) {
      toast.error("Missing Razorpay order ID");
      setPaymentStatus('failed');
      return;
    }

    console.log('[handlePayment] Initializing payment with order ID:', razorpayOrderId);

    const result = await initializePayment({
      orderId: razorpayOrderId,
      amount: doctor.consultationFees,
      currency: 'INR',
      userDetails: {
        name: `${user.firstName} ${user.lastName}`.trim(),
        email: user.email,
        phone: user.phone || "8525798579",
        _id: user._id
      },
      doctorDetails: {
        id: doctor._id,
        name: `${doctor.firstName} ${doctor.lastName}`,
        specialization: doctor.specialization,
        fees: doctor.consultationFees
      },
      appointmentDetails: {
        id: bookingData.appointmentId,
        date: formattedDate,
        time: time,
        reason: formData.reason
      },
      onSuccess: async (response) => {
        try {
          console.log('[handlePayment] Verifying payment with response:', response);
          setPaymentStatus('verifying');

          const verificationResult = await verifyPayment({
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            appointmentId: bookingData.appointmentId
          });

          if (!verificationResult.success) {
            toast.error(verificationResult.message);
            setPaymentStatus('failed');
            return;
          }

          if (verificationResult.data?.appointment?.status === 'confirmed') {
            setPaymentStatus('success');
            toast.success('Payment successful! Appointment confirmed.');

            window.location.href = `/appointment/success?data=${encodeURIComponent(JSON.stringify({
              ...verificationResult.data.appointment,
              meetLink: bookingData.jitsiMeetLink
            }))}`;
          } else {
            toast.error('Appointment not confirmed. Please contact support.');
            setPaymentStatus('failed');
          }
        } catch (error) {
          console.error('[handlePayment] Payment verification failed:', error);
          setPaymentStatus('failed');
          toast.error('Payment verification failed. Please contact support.');
        }
      },
      onError: (error) => {
        console.error('[handlePayment] Payment failed:', error);
        setPaymentStatus('failed');
        toast.error(error.message || 'Payment failed. Please try again.');
      },
      onDismiss: () => {
        setPaymentStatus('cancelled');
        toast.info('Payment cancelled');
      }
    });

    if (!result) {
      toast.error('Unable to initialize payment. Please try again.');
      setPaymentStatus('failed');
    }
  } catch (error) {
    console.error('[handlePayment] Payment flow error:', error);
    setPaymentStatus('failed');
    toast.error('Something went wrong. Please try again later.');
  } finally {
    setIsProcessing(false);
  }
};



  //2 const handlePayment = async () => {
  //   if (!formData.reason.trim()) {
  //     toast.error("Please provide a reason for the appointment");
  //     return;
  //   }

  //   if (!validateVitals()) {
  //     return;
  //   }

  //   setIsProcessing(true);
  //   setPaymentStatus('processing');

  //   try {
  //     // Format the date to YYYY-MM-DD
  //     const formattedDate = date.toISOString().split('T')[0];

  //     // Clean up the data before sending
  //     const cleanedData = {
  //       doctorId: doctor._id,
  //       userId: user._id,
  //       appointmentDate: new Date(formattedDate),
  //       timeSlot: time,
  //       appointmentTime:time,
  //       reasonForVisit: formData.reason.trim(),
  //       paymentAmount: Number(doctor.consultationFees),
  //       vitals: {
  //         bp: formData.bp.trim(),
  //         sugar: formData.sugar.trim().replace(/[^0-9.]/g, ''),
  //         height: Number(formData.height.trim().replace(/[^0-9.]/g, '')),
  //         weight: Number(formData.weight.trim().replace(/[^0-9.]/g, ''))
  //       }
  //     };

  //     // Create appointment and get order details
  //     const bookingResponse = await bookAppointment(cleanedData);
      
  //     if (!bookingResponse.success) {
  //       toast.error(bookingResponse.message);
  //       setPaymentStatus('failed');
  //       return;
  //     }

  //     const { data: bookingData } = bookingResponse;
      
  //     // Initialize payment with all required details
  
  //     const result = await initializePayment({
  //       orderId: bookingData.razorpayOrder.id,
  //       amount: doctor.consultationFees,
  //       currency: 'INR',
  //       userDetails: {
  //         name: user.name,
  //         email: user.email,
  //         phone: user.phone,
  //         _id: user._id
  //       },
  //       doctorDetails: {
  //         id: doctor._id,
  //         name: `${doctor.firstName} ${doctor.lastName}`,
  //         specialization: doctor.specialization,
  //         fees: doctor.consultationFees
  //       },
  //       appointmentDetails: {
  //         id: bookingData.appointmentId,
  //         date: formattedDate,
  //         time: time,
  //         reason: formData.reason
  //       },
  //       onSuccess: async (response) => {
  //         try {
  //           setPaymentStatus('verifying');
            
  //           // Verify payment
  //           const verificationResult = await verifyPayment({
  //             orderId: response.razorpay_order_id,
  //             paymentId: response.razorpay_payment_id,
  //             signature: response.razorpay_signature,
  //             appointmentId: bookingData.appointmentId
  //           });

  //           if (!verificationResult.success) {
  //             toast.error(verificationResult.message);
  //             setPaymentStatus('failed');
  //             return;
  //           }

  //           if (verificationResult.data?.appointment?.status === 'confirmed') {
  //             setPaymentStatus('success');
  //             toast.success('Payment successful! Appointment confirmed.');
              
  //             // Redirect to success page with appointment details
  //             window.location.href = `/appointment/success?data=${encodeURIComponent(JSON.stringify({
  //               ...verificationResult.data.appointment,
  //               meetLink: bookingData.jitsiMeetLink
  //             }))}`;
  //           } else {
  //             toast.error('Appointment not confirmed. Please contact support.');
  //             setPaymentStatus('failed');
  //           }
  //         } catch (error) {
  //           console.error('Payment verification failed:', error);
  //           setPaymentStatus('failed');
  //           toast.error('Payment verification failed. Please contact support.');
  //         }
  //       },
  //       onError: (error) => {
  //         console.error('Payment failed:', error);
  //         setPaymentStatus('failed');
  //         toast.error(error.message || 'Payment failed. Please try again.');
  //       },
  //       onDismiss: () => {
  //         setPaymentStatus('cancelled');
  //         toast.info('Payment cancelled');
  //       }
  //     });

  //     if (!result) {
  //       toast.error('Unable to initialize payment. Please try again.');
  //       setPaymentStatus('failed');
  //     }
  //   } catch (error) {
  //     console.error('Payment flow error:', error);
  //     setPaymentStatus('failed');
  //     toast.error('Something went wrong. Please try again later.');
  //   } finally {
  //     setIsProcessing(false);
  //   }
  // };
//  const handlePayment = async (bookingData) => {
//   try {
//     const { appointmentId, razorpayOrder } = bookingData;

//     // Ensure razorpayOrder and all necessary fields are valid
//     if (!razorpayOrder || !razorpayOrder.amount || !razorpayOrder.id) {
//       throw new Error("Missing Razorpay order details");
//     }

//     // Make sure user details are provided
//     if (!user?.name || !user?.email || !user?.phone) {
//       throw new Error("Missing user details");
//     }

//     // Define handlers for success, error, and dismiss
//     const successHandler = async (response) => {
//       console.log('✅ Payment successful:', response);

//       // Optionally send payment confirmation to backend here...
//       closeModal?.(); // Close modal or redirect
//     };

//     const errorHandler = (error) => {
//       console.error('❌ Payment failed:', error);
//       alert('Payment failed. Please try again.');
//     };

//     const dismissHandler = () => {
//       console.log('💤 User dismissed the payment modal.');
//     };

//     // Initialize Razorpay payment
//     const paymentSuccess = await initializePayment({
//       orderId: razorpayOrder.id,
//       amount: razorpayOrder.amount,
//       currency: razorpayOrder.currency,
//       userDetails: {
//         name: user?.name || 'Guest',
//         email: user?.email || 'noemail@example.com',
//         phone: user?.phone || '0000000000',
//       },
//       doctorDetails: {
//         id: doctor?._id,
//         name: doctor?.name || 'Doctor',
//       },
//       appointmentDetails: {
//         id: appointmentId,
//         date: razorpayOrder.notes?.appointmentDate || appointmentDate,
//         time: razorpayOrder.notes?.appointmentTime || appointmentTime,
//       },
//       onSuccess: successHandler,
//       onError: errorHandler,
//       onDismiss: dismissHandler,
//     });

//     if (!paymentSuccess) {
//       throw new Error('Payment failed to initialize');
//     }
//   } catch (err) {
//     console.error('⚠️ handlePayment error:', err.message);
//   }
// };

  const renderPaymentStatus = () => {
    switch (paymentStatus) {
      case 'processing':
        return (
          <div className="flex items-center justify-center gap-2 text-teal-600">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Processing payment...</span>
          </div>
        );
      case 'verifying':
        return (
          <div className="flex items-center justify-center gap-2 text-teal-600">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Verifying payment...</span>
          </div>
        );
      case 'success':
        return (
          <div className="flex items-center justify-center gap-2 text-green-600">
            <span>Payment successful!</span>
          </div>
        );
      case 'failed':
        return (
          <div className="flex items-center justify-center gap-2 text-red-600">
            <span>Payment failed</span>
          </div>
        );
      case 'cancelled':
        return (
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <span>Payment cancelled</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-30 backdrop-blur-sm">
        <div className="relative bg-white rounded-2xl shadow-2xl w-11/12 max-w-md p-6 sm:p-8 transform scale-95 opacity-0 animate-fadeInScale">
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-full text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition"
            aria-label="Close"
            disabled={isProcessing}
          >
            <X size={30} className="hover:animate-tilt font-bold" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-6 h-6 text-teal-600 hover:animate-tilt" />
            <h2 className="text-2xl font-semibold text-gray-800">
              Confirm Appointment
            </h2>
          </div>

          {/* Doctor Info */}
          <div className="flex items-center gap-3 mb-4">
            <img
              src={doctor.profilePic || "/MediSetu_Logo_W100.svg"}
              alt="Dr."
              className="w-12 h-12 rounded-full object-cover border"
            />
            <div>
              <p className="font-medium text-gray-900">
                Dr. {doctor.firstName} {doctor.lastName}
              </p>
              <p className="text-sm text-gray-600">{doctor.specialization}</p>
            </div>
          </div>

          {/* Date & Time */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4 text-gray-700">
            <div className="flex items-center gap-1">
              <Info className="w-5 h-5 text-gray-500 hover:animate-tilt" />
              <span>{date.toDateString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock2 className="w-5 h-5 text-gray-500 hover:animate-tilt" />
              <span>{time} – {endTime}</span>
            </div>
          </div>

          {/* Fees */}
          <p className="mb-4">
            <span className="font-medium">Fees:</span>{" "}
            <strong className="text-teal-700">₹{doctor.consultationFees}</strong>
          </p>

          {/* Reason */}
          <textarea
            name="reason"
            placeholder="Reason for appointment..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-300 resize-none text-gray-700 mb-4"
            rows={3}
            value={formData.reason}
            onChange={(e) => setFormData(prev => ({ ...prev, reason: e.target.value }))}
            disabled={isProcessing}
          />

          {/* Vitals */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Blood Pressure (e.g. 120/80)"
              value={formData.bp}
              onChange={(e) => setFormData(prev => ({ ...prev, bp: e.target.value }))}
              className="w-full p-1 border rounded-lg focus:ring-teal-300"
              disabled={isProcessing}
            />
            <input
              type="text"
              placeholder="Blood Sugar (e.g. 120 mg/dL)"
              value={formData.sugar}
              onChange={(e) => setFormData(prev => ({ ...prev, sugar: e.target.value }))}
              className="w-full p-1 border rounded-lg focus:ring-teal-300"
              disabled={isProcessing}
            />
            <input
              type="number"
              placeholder="Height (e.g. 170 cm)"
              value={formData.height}
              onChange={(e) => setFormData(prev => ({ ...prev, height: e.target.value }))}
              className="w-full p-1 border rounded-lg focus:ring-teal-300"
              disabled={isProcessing}
            />
            <input
              type="number"
              placeholder="Weight (e.g. 70 kg)"
              value={formData.weight}
              onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))}
              className="w-full p-1 border rounded-lg focus:ring-teal-300"
              disabled={isProcessing}
            />
          </div>

          {/* Payment Status */}
          {renderPaymentStatus()}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <button
              onClick={onClose}
              className="flex-1 py-2 rounded-lg border border-teal-500 text-teal-500 hover:bg-teal-50 transition flex items-center justify-center gap-2"
              disabled={isProcessing}
            >
              <XCircle className="w-5 h-5 hover:animate-tilt" /> Cancel
            </button>
            <button
              onClick={handlePayment}
              disabled={!formData.reason.trim() || isProcessing || !formData.bp || !formData.sugar || !formData.height || !formData.weight}
              className="flex-1 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="w-5 h-5 hover:animate-tilt text-white" />
                  Confirm & Pay
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInScale { to { opacity:1; transform:scale(1); } }
        .animate-fadeInScale { opacity:0; transform:scale(0.95); animation:fadeInScale 0.3s ease-out forwards; }
        @keyframes tilt { 0%,100% {transform:rotate(0);} 50% {transform:rotate(5deg);} }
        .hover\\:animate-tilt:hover { animation:tilt 0.6s ease-in-out infinite; }
      `}</style>
    </>
  );
}
 