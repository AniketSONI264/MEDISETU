"use client";

import React, { useEffect, useState } from "react";
import { DoctorCard } from "./doctorCards/doctorCard";
import { getAllDoctors } from "@/utils/api";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button"; // If you're using shadcn/ui
import { FaAngleDown } from "react-icons/fa";

const DoctorCardList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  // useEffect(() => {
  //   const fetchDoctors = async () => {
  //     try {
  //       const res = await getAllDoctors();

  //       console.log("Raw API Response:", res);

  //       const fetchedDoctors = Array.isArray(res?.data?.doctors)
  //         ? res.data.doctors
  //         : [];

  //       setDoctors(fetchedDoctors);
  //     } catch (error) {
  //       console.error("Error fetching doctors:", error);
  //       setDoctors([]);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchDoctors();
  // }, []);
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await getAllDoctors();
  
        console.log("Raw API Response:", res);
  
        const fetchedDoctors = Array.isArray(res?.data?.doctors)
          ? res.data.doctors.filter((doc) => doc.isVerified === true) // 💥 FILTERED here
          : [];
  
        setDoctors(fetchedDoctors);
      } catch (error) {
        console.error("Error fetching doctors:", error);
        setDoctors([]);
      } finally {
        setLoading(false);
      }
    };
  
    fetchDoctors();
  }, []);
  
  const visibleDoctors = showAll ? doctors : doctors.slice(0, 6);

  return (
    <section className="p-6 w-full">
      <h1 className="text-2xl font-bold mb-4 text-teal-700">Top Rated Doctors</h1>

      {loading ? (
        <div className="flex justify-center items-center text-gray-500 mt-10">
          <Loader2 className="animate-spin mr-2" />
          Loading doctors...
        </div>
      ) : doctors.length === 0 ? (
        <p className="text-center text-gray-400">No doctors found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleDoctors.map((doc, index) => (
              <DoctorCard
                key={doc._id || doc.id || doc.email || index}
                doctor={doc}
              />
            ))}
          </div>

          {/* Toggle Button */}
          {doctors.length > 0 && (
            <div className="flex justify-center mt-4">
              <Button
                variant="outline"
                className="flex items-center text-teal-600 border-teal-500 hover:bg-teal-100 transition-colors duration-300"
                onClick={() => setShowAll(!showAll)}
              >
                {showAll ? (
                  <>
                    Show Less <FaAngleDown className="ml-2 rotate-180" />
                  </>
                ) : (
                  <>
                    See More <FaAngleDown className="ml-2" />
                  </>
                )}
              </Button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default DoctorCardList;











// "use client";

// import React, { useEffect, useState } from "react";
// import { DoctorCard } from "./doctorCards/doctorCard";
// import { Button } from "@/components/ui/button"; // If you're using shadcn/ui
// import { FaAngleDown } from "react-icons/fa";

// const DoctorCardList = ({ doctorsData, showSearch = false, initialLimit = 6 }) => {
//   const [doctors, setDoctors] = useState(doctorsData);
//   const [loading, setLoading] = useState(false);
//   const [showAll, setShowAll] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredDoctors, setFilteredDoctors] = useState(doctorsData);

//   useEffect(() => {
//     setDoctors(doctorsData);
//     setFilteredDoctors(doctorsData);
//   }, [doctorsData]);

//   // Handle search functionality if enabled
//   useEffect(() => {
//     if (searchTerm) {
//       const results = doctors.filter((doctor) =>
//         doctor.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         doctor.lastName.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//       setFilteredDoctors(results);
//     } else {
//       setFilteredDoctors(doctors);
//     }
//   }, [searchTerm, doctors]);

//   const visibleDoctors = showAll ? filteredDoctors : filteredDoctors.slice(0, initialLimit);

//   return (
//     <section className="p-6 w-full">
//       <h1 className="text-2xl font-bold mb-4 text-teal-700">Doctors List</h1>

//       {/* Search bar */}
//       {showSearch && (
//         <div className="relative mb-4">
//           <input
//             type="text"
//             placeholder="Search for doctors..."
//             className="w-full px-5 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-700"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//       )}

//       {loading ? (
//         <div className="flex justify-center items-center text-gray-500 mt-10">
//           Loading doctors...
//         </div>
//       ) : filteredDoctors.length === 0 ? (
//         <p className="text-center text-gray-400">No doctors found.</p>
//       ) : (
//         <>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {visibleDoctors.map((doc, index) => (
//               <DoctorCard key={doc._id || doc.id || doc.email || index} doctor={doc} />
//             ))}
//           </div>

//           {/* Toggle Button */}
//           {filteredDoctors.length > initialLimit && (
//             <div className="flex justify-center mt-4">
//               <Button
//                 variant="outline"
//                 className="flex items-center text-teal-600 border-teal-500 hover:bg-teal-100 transition-colors duration-300"
//                 onClick={() => setShowAll(!showAll)}
//               >
//                 {showAll ? (
//                   <>
//                     Show Less <FaAngleDown className="ml-2 rotate-180" />
//                   </>
//                 ) : (
//                   <>
//                     See More <FaAngleDown className="ml-2" />
//                   </>
//                 )}
//               </Button>
//             </div>
//           )}
//         </>
//       )}
//     </section>
//   );
// };

// export default DoctorCardList;
