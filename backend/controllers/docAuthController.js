import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Doctor from "../models/doctorModel.js";

// 🔐 Generate JWT Token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// 🍪 Set HTTP-Only Cookie
const setTokenCookie = (res, token) => {
  res.cookie("DocToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

// ✅ Register Doctor
export const registerDoctor = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    password,
    pincode,
    city,
    state,
    qualification,
    specialization,
    experience,
    consultationFees,
    languagesSpoken,
    registrationNumber,
    availableTimings,
    bio,
    detailedBio,
    profilePic,
    designation,
    clinicName,
  } = req.body;

  try {
    // 🔍 Check if doctor already exists
    const doctorExists = await Doctor.findOne({ email });
    if (doctorExists) {
      return res.status(400).json({ message: "Doctor already exists" });
    }

    // 🔐 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🧾 Create doctor record with nested location
    const doctor = await Doctor.create({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      location: {
        pincode,
        city,
        state,
      },
      qualification,
      specialization,
      experience,
      consultationFees,
      languagesSpoken,
      registrationNumber,
      availableTimings,
      bio,
      detailedBio,
      profilePic,
      designation,
      clinicName,
    });

    // 🪙 Generate token and set cookie
    const token = generateToken(doctor._id, "doctor");
    setTokenCookie(res, token);

    // ✅ Success Response
    res.status(201).json({
      msg: "Doctor registered successfully",
      doctor: {
        _id: doctor._id,
        firstName: doctor.firstName,
        lastName: doctor.lastName,
        email: doctor.email,
        role: "doctor",
        profilePic: doctor.profilePic,
        token,
      },
    });
  } catch (error) {
    console.error("Doctor registration failed:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const loginDoctor = async (req, res) => {
  const { email, password } = req.body;

  try {
    const doctor = await Doctor.findOne({ email });

    if (!doctor) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(doctor._id, "doctor");
    setTokenCookie(res, token); // 🍪 Sets cookie named `jwt` or rename to `doc_jwt` if needed

    const {
      password: _,
      __v,
      createdAt,
      updatedAt,
      ...doctorDetails
    } = doctor.toObject();

    res.json({
      msg: "Login successful",
      doctor: {
        ...doctorDetails,
        token, // optional if you’re using cookies only
      },
    });

  } catch (error) {
    console.error("Doctor login failed:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).select('firstName lastName specialization');
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.status(200).json(doctor);
  } catch (error) {
    console.error('Error fetching doctor:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getDoctorAppointments = async (req, res) => {
  try {
    const doctorId = req.doctor._id;
    const appointments = await Appointment.find({ doctorId }).populate("userId", "name email profilePic");

    res.status(200).json({ success: true, appointments });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error", error: err.message });
  }
};



export const updateAppointmentStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const validStatuses = ['Pending', 'Confirmed', 'Rejected', 'Completed'];

  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }

  try {
    const appointment = await Appointment.findById(id);

    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });

    appointment.status = status;
    await appointment.save();

    res.json({ message: 'Appointment status updated', appointment });
  } catch (err) {
    console.error('Error updating appointment status:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getDoctorProfile = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.doctor._id).select('-password -__v');
    res.json(doctor);
  } catch (err) {
    console.error('Get profile error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const updateDoctorProfile = async (req, res) => {
  try {
    const updates = req.body;

    const updatedDoctor = await Doctor.findByIdAndUpdate(req.doctor._id, updates, {
      new: true,
      runValidators: true,
    }).select('-password -__v');

    res.json({ message: 'Profile updated', doctor: updatedDoctor });
  } catch (err) {
    console.error('Update profile error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const uploadPrescription = async (req, res) => {
  try {
    const { id } = req.params;
    const filePath = req.file.path; // from multer
    const { doctorNotes } = req.body;

    const updated = await Appointment.findByIdAndUpdate(id, {
      prescription: filePath,
      doctorNotes,
    }, { new: true });

    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: "Upload failed", error: err.message });
  }
};


export const getPatients = async (req, res) => {
  try {
    const appointments = await Appointment.find({ doctorId: req.doctor._id }).populate('userId');

    const patientMap = new Map();

    appointments.forEach(appt => {
      const p = appt.userId;
      if (p && !patientMap.has(p._id.toString())) {
        patientMap.set(p._id.toString(), {
          _id: p._id,
          firstName: p.firstName,
          lastName: p.lastName,
          email: p.email,
          phone: p.phone,
        });
      }
    });

    res.json({ patients: [...patientMap.values()] });
  } catch (err) {
    console.error('Error fetching patients:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};


export const getEarnings = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      doctorId: req.doctor._id,
      status: 'Completed',
    });

    const totalEarnings = appointments.reduce((sum, appt) => sum + (appt.fee || 0), 0);

    res.json({
      totalEarnings,
      completedAppointments: appointments.length,
    });
  } catch (err) {
    console.error('Earnings error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

