import Doctor from '../../models/doctorModel.js';
import { validateObjectId } from '../../utils/validators.js';

// Get all doctors with filters, search, pagination, sorting, and field selection
export const getAllDoctors = async (req, res) => {
  try {
    const {
      specialization,
      isVerified,
      search,
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      fields
    } = req.query;

    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 10;
    const skip = (pageNumber - 1) * limitNumber;

    // Build filter object
    const filter = {};

    if (specialization) {
      filter.specialization = specialization;
    }

    if (isVerified !== undefined) {
      filter.isVerified = isVerified === 'true';
    }

    if (search) {
      filter.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { specialization: { $regex: search, $options: 'i' } },
        { qualification: { $regex: search, $options: 'i' } },
      ];
    }

    let query = Doctor.find(filter).sort({ [sortBy]: -1 }).select("-password").skip(skip).limit(limitNumber);

    if (fields) {
      const selectFields = fields.split(',').join(' ');
      query = query.select(selectFields);
    }

    const doctors = await query.lean(); // Use lean for faster reads
    const total = await Doctor.countDocuments(filter);

    if (!doctors.length) {
      return res.status(200).json({
        success: true,
        message: 'No doctors found for the applied filters.',
        doctors: [],
        pagination: {
          total: 0,
          page: pageNumber,
          pages: 0
        }
      });
    }

    res.json({
      success: true,
      doctors,
      pagination: {
        total,
        page: pageNumber,
        pages: Math.ceil(total / limitNumber)
      }
    });

  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching doctors',
      error: error.message
    });
  }
};


// Get specific doctor details by ID
export const getDoctorById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!validateObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid doctor ID'
      });
    }

    const doctor = await Doctor.findById(id)
      .populate('reviews', 'rating comment user') // Select relevant fields
      .populate('appointments', 'date status user');

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    res.json({
      success: true,
      doctor
    });
  } catch (error) {
    console.error('Error fetching doctor by ID:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching doctor details',
      error: error.message
    });
  }
};


// Toggle doctor verification status
// export const toggleVerification = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { isVerified } = req.body;

//     if (!validateObjectId(id)) {
//       return res.status(400).json({
//         success: false,
//         message: 'Invalid doctor ID'
//       });
//     }

//     const doctor = await Doctor.findById(id);

//     if (!doctor) {
//       return res.status(404).json({
//         success: false,
//         message: 'Doctor not found'
//       });
//     }

//     doctor.isVerified = isVerified;
//     await doctor.save();

//     res.json({
//       success: true,
//       message: `Doctor has been ${isVerified ? 'verified' : 'unverified'} successfully`,
//       doctor
//     });

//   } catch (error) {
//     console.error('Error toggling doctor verification:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Error updating doctor verification',
//       error: error.message
//     });
//   }
// };

// doctorController.js

export const toggleVerification = async (req, res) => {
  try {
    const { id } = req.params;
    const { isVerified } = req.body;

    if (!validateObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid doctor ID'
      });
    }

    const doctor = await Doctor.findById(id);
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    doctor.isVerified = isVerified;
    await doctor.save();

    res.json({
      success: true,
      message: `Doctor has been ${isVerified ? 'verified' : 'unverified'} successfully`,
      doctor
    });
  } catch (error) {
    console.error('Error toggling doctor verification:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating doctor verification',
      error: error.message
    });
  }
};
