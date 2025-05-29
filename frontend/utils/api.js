import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const API = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// Add request interceptor for logging
API.interceptors.request.use(
  (config) => {
    console.log('API Request:', {
      method: config.method,
      url: config.url,
      data: config.data,
      headers: config.headers,
    });
    return config;
  },
  (error) => {
    console.log('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for logging
API.interceptors.response.use(
  (response) => {
    console.log('API Response:', {
      status: response.status,
      data: response.data,
      headers: response.headers,
    });
    return response;
  },
  (error) => {
    console.log('API Response Error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    return Promise.reject(error);
  }
);

// 🧑‍⚕️ Doctor APIs
export const registerDoctor = (doctorData) => API.post("/doctor/auth/register", doctorData);
export const loginDoctor = (doctorData) => API.post("/doctor/auth/login", doctorData);
export const logoutDoctor = () => API.post("/doctor/auth/logout");
export const getDoctor = () => API.get("/doctor/auth/status");
export const getAllDoctors = () => API.get("/allDoctors");
export const getDoctorBySlug = (slug) => API.get(`/${slug}`);
export const getDoctorById = (doctorId) => API.get(`/doctor/auth/${doctorId}`);
export const uploadPrescription = (appointmentId, file) => {
  const formData = new FormData();
  formData.append("prescription", file);
  return API.post(`/doctor/auth/appointments/${appointmentId}/prescription`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
// export const getDoctorAppointments = () => axios.get("/doctor/auth/appointments");
export const updateAppointmentStatus = (appointmentId, status) => API.patch(`/doctor/auth/appointments/${appointmentId}/status`, { status });
// export const getDoctorAppointments = async (doctorId) => {
//   try {
//     const response = await API.get('/doctor/auth/appointments');
//     // const response = await API.get(`/appointments/${doctorId}`);
//     console.log("Get Doctor Appointments Response:", response);
//     return {
//       success: true,
//       data: response.data.appointments,
//       message: 'Appointments retrieved successfully'
//     };
//   } catch (error) {
//     console.log('Get Doctor Appointments Error:', {
//       message: error.message,
//       response: error.response?.data,
//       status: error.response?.status
//     });

//     return {
//       success: false,
//       message: 'Unable to fetch appointments. Please try again.',
//       error: 'FETCH_FAILED'
//     };
//   }
// };

export const getDoctorAppointments = () => API.get('/doctor/auth/appointments');
// export const getDoctorAppointments = async (doctorId) => API.get('/doctor/auth/appointments',doctorId);
export const getDoctorProfile = () => API.get("/doctor/auth/profile");
export const updateDoctorProfile = (doctorData) => API.put("/doctor/auth/profile", doctorData);
export const getPatients = () => API.get("/doctor/auth/patients");

export const getEarnings = () => API.get("/doctor/auth/earnings");




// 👑 Admin: Get All Users
export const getAllAdminUsers = () => API.get("/admin/users");

// 👑 Admin: Get All Doctors
export const getAllAdminDoctors = () => API.get("/admin/doctors");

// 👑 Admin: Get All Appointments
export const getAllAdminAppointments = () => API.get("/admin/appointments");

// 🧑‍💼 Profile Management
export const updateProfile = (formData) => {
  if (!formData._id) {
    throw new Error("User ID is required for profile update");
  }
  return API.put(`/user/update/${formData._id}`, {
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email,
    dateOfBirth: formData.dateOfBirth,
    address: formData.address, 
    phone: formData.phone,
    gender: formData.gender
  });
};

// 🖼️ Avatar Upload
export const uploadAvatar = (formData, userId) =>
  API.post(`/upload/${userId}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// 💬 Contact Form
export const contactForm = (formData) => API.post("/contact-us", formData);

// 🔐 Auth APIs
export const registerUser = (userData) => API.post("/auth/register", userData);
export const loginUser = (userData) => API.post("/auth/login", userData);
export const logoutUser = () => API.post("/auth/logout");
export const getUser = () => API.get("/auth/me");

// export const verifyDoctor = (id, isVerified) =>
//   API.put(`/admin/doctors/${id}/verify`, { isVerified });
// User Appointments
// export const getUserAppointments = () => API.get("/appointments/user");


// 🩺 Appointment APIs
export const createOrder = async (amount) => {
  try {
    // Validate amount
    if (!amount || amount <= 0) {
      return {
        success: false,
        message: 'Invalid payment amount',
        error: 'INVALID_AMOUNT'
      };
    }

    const response = await API.post("/appointments/create-order", { amount });
    console.log("Create Order Response:", response);
    
    if (!response.data?.success || !response.data?.razorpayOrder?.id) {
      return {
        success: false,
        message: response.data?.message || 'Failed to create order',
        error: 'ORDER_CREATION_FAILED'
      };
    }

    return {
      success: true,
      data: response.data.razorpayOrder,
      message: 'Order created successfully'
    };
  } catch (error) {
    console.log('Create Order Error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });

    if (error.response?.status === 500) {
      return {
        success: false,
        message: 'Unable to create order. Please try again.',
        error: 'SERVER_ERROR'
      };
    }

    return {
      success: false,
      message: 'Failed to create order. Please try again.',
      error: 'ORDER_CREATION_FAILED'
    };
  }
};

export const bookAppointment = async (appointmentData) => {
  try {
    // Add detailed logging
    console.log("Raw appointment data received:", appointmentData);
    
    // Validate required fields
    if (!appointmentData.doctorId || !appointmentData.userId || !appointmentData.appointmentDate || !appointmentData.appointmentTime) {
      console.log("Missing required fields:", {
        doctorId: !!appointmentData.doctorId,
        userId: !!appointmentData.userId,
        appointmentDate: !!appointmentData.appointmentDate,
        appointmentTime: !!appointmentData.appointmentTime
      });
      return {
        success: false,
        message: 'Please fill in all required appointment details',
        error: 'MISSING_FIELDS'
      };
    }

    // Validate payment amount
    if (!appointmentData.paymentAmount || appointmentData.paymentAmount <= 0) {
      return {
        success: false,
        message: 'Invalid consultation fee amount',
        error: 'INVALID_AMOUNT'
      };
    }

    // Validate vitals data
    const vitals = appointmentData.vitals || {};
    if (!vitals.bp || !vitals.sugar || !vitals.height || !vitals.weight) {
      return {
        success: false,
        message: 'Please provide all your vitals information',
        error: 'MISSING_VITALS'
      };
    }

    // Format the data before sending
    const formattedData = {
      ...appointmentData,
      appointmentDate: new Date(appointmentData.appointmentDate),
      timeSlot: appointmentData.appointmentTime,
      paymentAmount: Number(appointmentData.paymentAmount),
      vitals: {
        bp: String(appointmentData.vitals.bp),
        sugar: String(appointmentData.vitals.sugar),
        height: Number(appointmentData.vitals.height),
        weight: Number(appointmentData.vitals.weight)
      }
    };

    console.log("Formatted data being sent:", formattedData);

    // Create appointment with all required data
    const response = await API.post("/appointments/book", formattedData);
    console.log("Book Appointment Response:", response);
    
    // Validate response
    if (!response.data?.appointmentId || !response.data?.razorpayOrder?.id) {
      return {
        success: false,
        message: 'Unable to create appointment at this time. Please try again.',
        error: 'BOOKING_FAILED'
      };
    }

    return {
      success: true,
      data: response.data,
      message: 'Appointment created successfully'
    };

  } catch (error) {
    console.log('Book Appointment Error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      data: error.response?.data,
      requestData: appointmentData
    });

    // Handle different types of errors
    if (error.response?.status === 500) {
      return {
        success: false,
        message: 'Our servers are busy. Please try again in a few minutes.',
        error: 'SERVER_ERROR'
      };
    }

    if (error.response?.status === 401) {
      return {
        success: false,
        message: 'Please login to book an appointment',
        error: 'UNAUTHORIZED'
      };
    }

    if (error.response?.status === 400) {
      return {
        success: false,
        message: error.response.data?.message || 'Please check your appointment details and try again',
        error: 'INVALID_REQUEST'
      };
    }

    return {
      success: false,
      message: 'Unable to book appointment. Please try again later.',
      error: 'UNKNOWN_ERROR'
    };
  }
};

export const verifyPayment = async (paymentData) => {
  try {
    // Validate required Razorpay payment fields
    if (!paymentData.orderId || !paymentData.paymentId || !paymentData.signature || !paymentData.appointmentId) {
      return {
        success: false,
        message: 'Payment verification details are incomplete',
        error: 'MISSING_PAYMENT_DETAILS'
      };
    }

    // Verify payment with backend
    const response = await API.post("/appointments/verify", {
      orderId: paymentData.orderId,
      paymentId: paymentData.paymentId,
      signature: paymentData.signature,
      appointmentId: paymentData.appointmentId
    });
    
    console.log("Verify Payment Response:", response);

    // Validate verification response
    if (!response.data?.appointment) {
      return {
        success: false,
        message: 'Unable to verify payment. Please contact support.',
        error: 'VERIFICATION_FAILED'
      };
    }

    // Validate appointment status
    if (response.data.appointment.status !== 'confirmed') {
      return {
        success: false,
        message: 'Appointment not confirmed. Please contact support.',
        error: 'APPOINTMENT_NOT_CONFIRMED'
      };
    }

    return {
      success: true,
      data: response.data,
      message: 'Payment verified successfully'
    };

  } catch (error) {
    console.log('Verify Payment Error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });

    if (error.response?.status === 500) {
      return {
        success: false,
        message: 'Unable to verify payment. Please contact support.',
        error: 'SERVER_ERROR'
      };
    }

    return {
      success: false,
      message: 'Payment verification failed. Please try again.',
      error: 'VERIFICATION_FAILED'
    };
  }
};

export const cancelAppointment = async (appointmentId) => {
  try {
    const response = await API.put(`/appointments/cancel/${appointmentId}`);
    console.log("Cancel Appointment Response:", response);

    if (!response.data?.message) {
      return {
        success: false,
        message: 'Failed to cancel appointment',
        error: 'CANCELLATION_FAILED'
      };
    }

    return {
      success: true,
      data: response.data,
      message: 'Appointment cancelled successfully'
    };
  } catch (error) {
    console.log('Cancel Appointment Error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });

    return {
      success: false,
      message: 'Unable to cancel appointment. Please try again.',
      error: 'CANCELLATION_FAILED'
    };
  }
};


export const getUserAppointments = async () => {
  try {
    const response = await API.get("/appointments/user");
    console.log("Get User Appointments Response:", response);
    return {
      success: true,
      data: response.data.appointments,
      message: 'Appointments retrieved successfully'
    };
  } catch (error) {
    console.log('Get User Appointments Error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });

    return {
      success: false,
      message: 'Unable to fetch appointments. Please try again.',
      error: 'FETCH_FAILED'
    };
  }
};



export const getSingleAppointment = async (appointmentId) => {
  try {
    const response = await API.get(`/appointments/${appointmentId}`);
    console.log("Get Single Appointment Response:", response);
    
    if (!response.data?.appointment) {
      return {
        success: false,
        message: 'Appointment not found',
        error: 'NOT_FOUND'
      };
    }

    return {
      success: true,
      data: response.data.appointment,
      message: 'Appointment retrieved successfully'
    };
  } catch (error) {
    console.log('Get Single Appointment Error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });

    return {
      success: false,
      message: 'Unable to fetch appointment details. Please try again.',
      error: 'FETCH_FAILED'
    };
  }
};

export default API;
