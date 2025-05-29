import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js"; // You already have this 👌

const prescriptionStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "medisetu/prescriptions", // 🔥 dedicated folder
    allowed_formats: ["pdf"],
    resource_type: "raw", // 🧠 super important for non-image files!
    public_id: (req, file) => {
      const timestamp = Date.now();
      const doctorId = req.doctor?._id || "unknownDoctor";
      const appointmentId = req.params?.id || "unknownAppointment";
      return `prescription-${doctorId}-${appointmentId}-${timestamp}`;
    },
  },
});

const uploadPrescription = multer({ storage: prescriptionStorage });

export default uploadPrescription;
