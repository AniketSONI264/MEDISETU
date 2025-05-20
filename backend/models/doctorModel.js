// import mongoose from "mongoose";

// const doctorSchema = new mongoose.Schema(
//   {
//     firstName: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     lastName: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//     },

//     password: {
//       type: String,
//       required: true,
//     },

//     profilePic: {
//       type: String,
//       default: "",
//     },

//     phone: {
//       type: String,
//       required: true,
//     },

//     specialization: {
//       type: String,
//       required: true,
//     },

//     experience: {
//       type: Number,
//       default: 0,
//     },

//     bio: {
//       type: String,
//       default: "",
//     },

//     licenseNumber: {
//       type: String,
//       required: true,
//       unique: true,
//     },

//     licenseProofUrl: {
//       type: String,
//       default: "",
//     },

//     clinicName: {
//       type: String,
//       required: true,
//     },

//     location: {
//       pincode: {
//         type: String,
//         required: true,
//       },
//       city: {
//         type: String,
//         required: true,
//       },
//       state: {
//         type: String,
//         required: true,
//       },
//     },

//     availableTimings: [
//       {
//         day: { type: String, required: true }, // e.g., "Monday"
//         start: { type: String, required: true }, // "09:00"
//         end: { type: String, required: true },   // "17:00"
//       },
//     ],

//     leaves: [
//       {
//         date: { type: String, required: true }, // ISO string date
//         reason: { type: String },
//       },
//     ],

//     role: {
//       type: String,
//       default: "doctor",
//       enum: ["doctor"],
//     },

//     isVerified: {
//       type: Boolean,
//       default: false,
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Doctor", doctorSchema);



import mongoose from "mongoose";
import slugify from "slugify";

const doctorSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    profilePic: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      required: true,
    },

    alternatePhone: {
      type: String,
      default: "",
    },

    dob: {
      type: String,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other", "Prefer not to say"],
    },

    specialization: {
      type: String,
      required: true,
    },

    experience: {
      type: Number,
      default: 0,
    },

    qualification: {
      type: String,
    },

    registrationNumber: {
      type: String,
      required: true,
      unique: true,
    },

    medicalCouncil: {
      type: String,
    },

    licenseProofUrl: {
      type: String,
      default: "",
    },

    certifications: [
      {
        type: String, // URLs
      },
    ],

    consultationFees: {
      type: Number,
      default: 0,
    },

    consultationDuration: {
      type: String,
    },

    consultationMode: {
      type: String,
      enum: ["Online", "Offline", "Both"],
      default: "Online",
    },

    languagesSpoken: [
      {
        type: String,
      },
    ],

    bio: {
      type: String,
      default: "",
    },

    detailedBio: {
      type: String,
    },

    introVideo: {
      type: String,
      default: "",
    },

    socialLinks: {
      linkedin: { type: String, default: "" },
      website: { type: String, default: "" },
    },

    tags: [
      {
        type: String,
      },
    ],

    preferredCommunication: {
      type: String,
    },

    clinicName: {
      type: String,
      required: true,
    },

    location: {
      pincode: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
    },

    availableTimings: [
      {
        day: { type: String, required: true },
        start: { type: String, required: true },
        end: { type: String, required: true },
        unavailable: { type: Boolean, required: true },
      },
    ],

    leaves: [
      {
        date: { type: String, required: true },
        reason: { type: String },
      },
    ],

    maxAppointmentsPerDay: {
      type: Number,
      default: 0,
    },

    aadharOrGovtId: {
      type: String,
      default: "",
    },

    agreedToTerms: {
      type: Boolean,
      default: false,
    },

    consentToBeListed: {
      type: Boolean,
      default: false,
    },

    consentForTelemedicine: {
      type: Boolean,
      default: false,
    },

    role: {
      type: String,
      default: "doctor",
      enum: ["doctor"],
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
  
  },
  { timestamps: true }
);

doctorSchema.pre("save", function (next) {
  if (this.isNew && !this.slug) {
    const baseSlug = slugify(`${this.firstName}-${this.lastName}`, { lower: true });
    const randomStr = Math.random().toString(36).substring(2, 6);
    this.slug = `${baseSlug}-${randomStr}`;
  }
  next();
});


export default mongoose.model("Doctor", doctorSchema);
