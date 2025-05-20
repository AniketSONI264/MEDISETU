// import Appointment from '../../models/appointments.js';
// import { validateObjectId } from '../../utils/validators.js';

// // Get all appointments with filters
// export const getAllAppointments = async (req, res) => {
//   try {
//     const {
//       status,
//       doctorId,
//       date,
//       page = 1,
//       limit = 10
//     } = req.query;

//     // Build filter object
//     const filter = {};
    
//     if (status && status !== 'all') {
//       filter.status = status;
//     }
    
//     if (doctorId && doctorId !== 'all') {
//       if (!validateObjectId(doctorId)) {
//         return res.status(400).json({
//           success: false,
//           message: 'Invalid doctor ID'
//         });
//       }
//       filter.doctorId = doctorId;
//     }
    
//     if (date) {
//       const startDate = new Date(date);
//       const endDate = new Date(date);
//       endDate.setDate(endDate.getDate() + 1);
      
//       filter.appointmentDate = {
//         $gte: startDate,
//         $lt: endDate
//       };
//     }

//     // Calculate pagination
//     const skip = (page - 1) * limit;

//     // Get appointments with pagination
//     const appointments = await Appointment.find(filter)
//       .populate('doctorId', 'firstName lastName specialization')
//       .populate('userId', 'firstName lastName email')
//       .skip(skip)
//       .limit(parseInt(limit))
//       .sort({ appointmentDate: -1 });

//     // Get total count for pagination
//     const total = await Appointment.countDocuments(filter);

//     res.json({
//       success: true,
//       appointments,
//       pagination: {
//         total,
//         page: parseInt(page),
//         pages: Math.ceil(total / limit)
//       }
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Error fetching appointments',
//       error: error.message
//     });
//   }
// };

// // Update appointment status
// export const updateAppointmentStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status, reason } = req.body;

//     if (!validateObjectId(id)) {
//       return res.status(400).json({
//         success: false,
//         message: 'Invalid appointment ID'
//       });
//     }

//     const appointment = await Appointment.findById(id);

//     if (!appointment) {
//       return res.status(404).json({
//         success: false,
//         message: 'Appointment not found'
//       });
//     }

//     // Validate status
//     const validStatuses = ['pending', 'confirmed', 'cancelled', 'completed'];
//     if (!validStatuses.includes(status)) {
//       return res.status(400).json({
//         success: false,
//         message: 'Invalid appointment status'
//       });
//     }

//     // Update appointment
//     appointment.status = status;
//     if (reason) {
//       appointment.reasonForVisit = reason;
//     }
//     await appointment.save();

//     res.json({
//       success: true,
//       message: 'Appointment status updated successfully',
//       appointment
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Error updating appointment status',
//       error: error.message
//     });
//   }
// }; 


// import Appointment from "../../models/appointments.js";

// export const getAllAppointments = async (req, res) => {
//   try {
//     const appointments = await Appointment.find()
//       .populate("userId", "firstName lastName email")
//       .populate("doctorId", "firstName lastName email")
//       .sort({ appointmentDate: -1 });
//     res.json(appointments);
//   } catch (err) {
//     res.status(500).json({ error: "Server Error: Unable to fetch appointments" });
//   }
// };




// controllers/admin/AppointmentController.js
import Appointment from "../../models/appointments.js";

// ✅ GET ALL APPOINTMENTS (Admin)
export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("userId", "firstName lastName email profilePic")
      .populate("doctorId", "firstName lastName email specialization profilePic")
      .sort({ appointmentDate: -1 });

    const formatted = appointments.map((apt) => ({
      _id: apt._id,
      date: apt.appointmentDate,
      time: apt.appointmentTime,
      status: apt.status,
      patient: {
        name: `${apt.userId.firstName} ${apt.userId.lastName}`,
        email: apt.userId.email,
        profilePic: apt.userId.profilePic || '',
      },
      doctor: {
        name: `${apt.doctorId.firstName} ${apt.doctorId.lastName}`,
        email: apt.doctorId.email,
        specialization: apt.doctorId.specialization,
        profilePic: apt.doctorId.profilePic || '',
      },
    }));

    res.status(200).json({ appointments: formatted });
  } catch (err) {
    console.error("❌ Error in getAllAppointments:", err);
    res.status(500).json({ error: "Server Error: Unable to fetch appointments" });
  }
};

// ✅ PATCH UPDATE APPOINTMENT STATUS (Admin)
export const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['completed', 'cancelled', 'pending'].includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    const updated = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    )
      .populate("userId", "firstName lastName email profilePic")
      .populate("doctorId", "firstName lastName email specialization profilePic");

    if (!updated) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    const formatted = {
      _id: updated._id,
      date: updated.appointmentDate,
      time: updated.appointmentTime,
      status: updated.status,
      patient: {
        name: `${updated.userId.firstName} ${updated.userId.lastName}`,
        email: updated.userId.email,
        profilePic: updated.userId.profilePic || '',
      },
      doctor: {
        name: `${updated.doctorId.firstName} ${updated.doctorId.lastName}`,
        email: updated.doctorId.email,
        specialization: updated.doctorId.specialization,
        profilePic: updated.doctorId.profilePic || '',
      },
    };

    res.status(200).json({ message: "Appointment status updated", appointment: formatted });
  } catch (err) {
    console.error("❌ Error in updateAppointmentStatus:", err);
    res.status(500).json({ error: "Server Error: Unable to update status" });
  }
};
