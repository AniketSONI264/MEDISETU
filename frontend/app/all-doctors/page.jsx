// // "use client"
// import AllDoctors from '@/components/doctorCards/allDoctors';
// import { getAllDoctors } from '@/utils/api'; // or wherever you stored it

// const DoctorsPage = async () => {
//   const { data: doctors } = await getAllDoctors(); // assuming you're returning axios-style response
//   return <AllDoctors doctors={doctors} />;
// };

// export default DoctorsPage;




// /app/doctors/page.jsx
// "use client";

// import { useEffect, useState } from "react";
// import AllDoctors from "@/components/doctorCards/allDoctors";
// import { getAllDoctors } from "@/utils/api";

// const DoctorsPage = () => {
//   const [doctors, setDoctors] = useState([]);

//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         const { data } = await getAllDoctors();
//         console.log("Page.jsx Response :",data);
//         setDoctors(data.doctors);
//       } catch (err) {
//         console.error("Error fetching doctors:", err);
//       }
//     };
//     fetchDoctors();
//   }, []);

//   return <AllDoctors doctors={doctors} />;
// };

// export default DoctorsPage;



"use client";

import { useEffect, useState } from "react";
import AllDoctors from "@/components/doctorCards/allDoctors";
import { getAllDoctors } from "@/utils/api";

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    // const fetchDoctors = async () => {
    //   try {
    //     const response = await getAllDoctors();  
    //     console.log("Page.jsx Response :", response);
    //     const doctors = response.data.doctors;
    //     console.log(doctors);
    //     setDoctors(doctors);  // <-- 🔥 This is now correct!
    //   } catch (err) {
    //     console.error("Error fetching doctors:", err);
    //   }
    // };
    const fetchDoctors = async () => {
      try {
        const response = await getAllDoctors();  
        console.log("Page.jsx Response :", response);

        const allDoctors = response.data.doctors;
        const verifiedDoctors = allDoctors.filter(doc => doc.isVerified === true);

        console.log("Verified Doctors: ", verifiedDoctors);
        setDoctors(verifiedDoctors);
      } catch (err) {
        console.error("Error fetching doctors:", err);
      }
    };
    fetchDoctors();
  }, []);

  return(
      <div className="mt-[100px] mb-[100px]">
    <AllDoctors doctors={doctors} />;
    </div>
  )
};

export default DoctorsPage;
