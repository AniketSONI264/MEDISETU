// // hooks/admin/useToggleDoctorVerification.js
// import API from "@/utils/api";
// import { toast } from "react-hot-toast";

// const useToggleDoctorVerification = () => {
//   const toggleVerification = async (id, isVerified) => {
//     const action = isVerified ? "Verifying..." : "Unverifying...";
//     const toastId = toast.loading(action); // show loading toast

//     try {
//       const { data } = await API.put(`/admin/doctors/${id}/verify`, { isVerified });

//       toast.success(`Doctor ${isVerified ? "verified" : "unverified"} successfully ✅`, { id: toastId });

//       return data;
//     } catch (err) {
//       const message = err?.response?.data?.message || "Something went wrong. Try again later.";
//       toast.error(`❌ ${message}`, { id: toastId });
//       return null; // gracefully handle instead of throwing
//     }
//   };

//   return { toggleVerification };
// };

// export default useToggleDoctorVerification;



// import { useState } from "react";
// import toast from "react-hot-toast";
// import API from "@/utils/api"; // your axios config

// const useToggleDoctorVerification = () => {
//   const [loadingId, setLoadingId] = useState(null); // disable btn when loading

//   const toggleVerification = async ({ id, isVerified, name, onOptimisticUpdate }) => {
//     // Optional UI update before waiting for backend response
//     onOptimisticUpdate?.(id, isVerified);

//     const toastId = toast.loading(`${isVerified ? "✅ Verifying" : "❌ Unverifying"} ${name}...`);
//     setLoadingId(id);

//     try {
//       const { data } = await API.put(`/admin/doctors/${id}/verify`, { isVerified });

//       toast.success(`${isVerified ? "🟢" : "🔴"} ${data?.message || "Update complete!"}`, {
//         id: toastId,
//       });

//       return { success: true, message: data?.message };
//     } catch (err) {
//       let errorMsg = "Something went wrong";
//       if (err.response?.data?.message) errorMsg = err.response.data.message;

//       toast.error(`⚠️ ${errorMsg}`, { id: toastId });

//       // Rollback UI if optimistic update was done
//       onOptimisticUpdate?.(id, !isVerified);

//       return { success: false, error: errorMsg };
//     } finally {
//       setLoadingId(null);
//     }
//   };

//   return { toggleVerification, loadingId };
// };

// export default useToggleDoctorVerification;




import { useState } from "react";
import toast from "react-hot-toast";
import toggleDoctorVerification from "./doctorVerification";

const useToggleDoctorVerification = () => {
  const [loadingId, setLoadingId] = useState(null);

  const toggleVerification = async ({ id, isVerified, name, onOptimisticUpdate }) => {
    onOptimisticUpdate?.(id, isVerified);
    const toastId = toast.loading(`${isVerified ? "✅ Verifying" : "❌ Unverifying"} ${name}...`);
    setLoadingId(id);

    try {
      const data = await toggleDoctorVerification({ id, isVerified });

      toast.success(`${isVerified ? "🟢 Verified" : "🔴 Unverified"}: ${data.message}`, {
        id: toastId,
      });

      return { success: true, message: data.message };
    } catch (err) {
      const errorMsg = err?.response?.data?.message || "Something went wrong 💥";
      toast.error(`⚠️ ${errorMsg}`, { id: toastId });

      // Rollback UI if optimistic update failed
      onOptimisticUpdate?.(id, !isVerified);
      return { success: false, error: errorMsg };
    } finally {
      setLoadingId(null);
    }
  };

  return { toggleVerification, loadingId };
};

export default useToggleDoctorVerification;
