// services/admin/toggleDoctorVerification.js
import API from "@/utils/api";

/**
 * Toggle doctor verification status (Admin).
 * @param {Object} params - Parameters
 * @param {string} params.id - Doctor ID
 * @param {boolean} params.isVerified - New verification status
 * @returns {Promise<{ message: string }>} - JSON response
 */
const toggleDoctorVerification = async ({ id, isVerified }) => {
  const response = await API.put(`/admin/doctors/${id}/verify`, { isVerified });
  return response.data;
};

export default toggleDoctorVerification;
