// import { useEffect } from 'react';

// export const usePayment = () => {
//   useEffect(() => {
//     // Load Razorpay script
//     const script = document.createElement('script');
//     script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//     script.async = true;
//     document.body.appendChild(script);

//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   const initializePayment = async ({
//     orderId,
//     amount,
//     currency = 'INR',
//     userDetails,
//     doctorDetails,
//     appointmentDetails,
//     onSuccess,
//     onError,
//     onDismiss
//   }) => {
//     try {
//       // Validate required fields
//       // if (!orderId || !amount || !userDetails?.name || !userDetails?.email || !userDetails?.phone) {
//       if (!amount || !userDetails?.name || !userDetails?.email || !userDetails?.phone) {
//         throw new Error('Missing required payment information');
//       }

//       const options = {
//         key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
//         amount: amount * 100, // Convert to paise
//         currency: currency,
//         name: 'MediSetu',
//         description: `Appointment with Dr. ${doctorDetails.name}`,
//         order_id: orderId,
//         handler: function (response) {
//           onSuccess?.(response);
//         },
//         prefill: {
//           name: userDetails.name,
//           email: userDetails.email,
//           contact: userDetails.phone
//         },
//         notes: {
//           appointment_id: appointmentDetails?.id,
//           doctor_id: doctorDetails?.id,
//           appointment_date: appointmentDetails?.date,
//           appointment_time: appointmentDetails?.time
//         },
//         theme: {
//           color: '#0D9488' // teal-600
//         },
//         modal: {
//           ondismiss: function() {
//             onDismiss?.();
//           }
//         }
//       };

//       const razorpay = new window.Razorpay(options);
//       razorpay.on('payment.failed', function (response) {
//         onError?.(response.error);
//       });

//       razorpay.open();
//       return true;
//     } catch (error) {
//       console.error('Payment initialization error:', error);
//       onError?.(error);
//       return false;
//     }
//   };

//   return { initializePayment };
// }; 



import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

export const usePayment = () => {
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  useEffect(() => {
    console.log('[usePayment] Mounting and loading Razorpay script...');
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;

    script.onload = () => {
      console.log('[usePayment] Razorpay script loaded');
      setRazorpayLoaded(true);
    };

    script.onerror = () => {
      console.error('[usePayment] Failed to load Razorpay script');
      toast.error('Failed to load Razorpay script. Please refresh and try again.');
    };

    document.body.appendChild(script);

    return () => {
      console.log('[usePayment] Cleaning up Razorpay script');
      document.body.removeChild(script);
    };
  }, []);

  const initializePayment = async ({
    orderId,
    amount,
    currency = 'INR',
    userDetails,
    doctorDetails,
    appointmentDetails,
    onSuccess,
    onError,
    onDismiss
  }) => {
    try {
      console.log('[initializePayment] Starting payment initialization...');
      console.log('[initializePayment] Received:', {
        orderId,
        amount,
        userDetails,
        doctorDetails,
        appointmentDetails,
      });

      if (
        !razorpayLoaded ||
        !orderId ||
        !amount ||
        !userDetails?.name ||
        !userDetails?.email ||
        !userDetails?.phone
      ) {
        toast.error('Missing required payment info or Razorpay failed to load.');
        return false;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: amount * 100, // in paise
        currency,
        name: 'MediSetu',
        description: `Appointment with Dr. ${doctorDetails?.name || 'Unknown'}`,
        order_id: orderId,
        handler: (response) => {
          console.log('[initializePayment] Payment success:', response);
          onSuccess?.(response);
        },
        prefill: {
          name: userDetails.firstName,
          // name:`${userDetails.firstName} ${userDetails.lastName}`.trim(),
          email: userDetails.email,
          contact: userDetails.phone || "8597857898"
        },
        notes: {
          appointment_id: appointmentDetails?.id,
          doctor_id: doctorDetails?.id,
          appointment_date: appointmentDetails?.date,
          appointment_time: appointmentDetails?.time
        },
        theme: {
          color: '#0D9488'
        },
        modal: {
          ondismiss: () => {
            console.log('[initializePayment] Razorpay modal dismissed');
            onDismiss?.();
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.on('payment.failed', (response) => {
        console.error('[initializePayment] Payment failed:', response);
        toast.error('Payment failed. Please try again.');
        onError?.(response.error);
      });

      razorpay.open();
      return true;
    } catch (error) {
      console.error('[initializePayment] Payment initialization error:', error);
      toast.error('Something went wrong during payment. Please try again.');
      onError?.(error);
      return false;
    }
  };

  return { initializePayment };
};
