// import mongoose from "mongoose";

// const AppointmentSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//   doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },

//   appointmentDate: { type: Date, required: true },
//   timeSlot: { type: String, required: true },
//   reasonForVisit: { type: String },

//   status: {
//     type: String,
//     enum: ["pending", "confirmed", "cancelled", "completed"],
//     default: "pending",
//   },

//   paymentStatus: {
//     type: String,
//     enum: ["unpaid", "paid", "failed", "refunded"],
//     default: "unpaid",
//   },

//   razorpay: {
//     orderId: String,
//     paymentId: String,
//     signature: String,
//   },

//   jitsiMeetLink: {
//     type: String,
//     default: null,
//   },

//   createdAt: { type: Date, default: Date.now },
// });

// const Appointment =
//   mongoose.models.Appointment ||
//   mongoose.model("Appointment", AppointmentSchema);
// export default Appointment;





import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },

    appointmentDate: {
      type: Date,
      required: true,
    },
    timeSlot: {
      type: String,
      required: true,
    },

    // Reason for visit / symptoms
    reasonForVisit: {
      type: String,
      trim: true,
    },

    // ─── VITAL SIGNS ───
    vitals: {
      bp: {
        type: String,
        trim: true,
        default: "",
      },
      sugar: {
        type: String,
        trim: true,
        default: "",
      },
      height: {
        type: Number,
        min: 0,
      },
      weight: {
        type: Number,
        min: 0,
      },
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },

    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid", "failed", "refunded"],
      default: "unpaid",
    },

    // Razorpay payment details
    razorpay: {
      orderId: { type: String },
      paymentId: { type: String },
      signature: { type: String },
    },

    // Link to Jitsi Meet room
    meetLink: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

const Appointment =
  mongoose.models.Appointment ||
  mongoose.model("Appointment", AppointmentSchema);

export default Appointment;
