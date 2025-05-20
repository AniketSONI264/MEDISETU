"use client";
import { useRouter } from 'next/navigation';
import React, { useState,useEffect} from "react";
import { FaMapMarkerAlt, FaUserMd, FaLanguage, FaMoneyBill, FaVideo, FaAngleDown } from "react-icons/fa";
import { Button } from "@/components/ui/button"; // shadcn/ui
import Image from "next/image";


export const DoctorCard = ({ doctor }) => {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  // Ensure this runs only on the client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Avoid rendering the button until client-side rendering is complete
  if (!isClient) return null;
  // const router = useRouter();
  return (
    
<div className="bg-#FFFDD0 shadow-xl rounded-2xl p-4 sm:p-4 md:p-8 w-full max-w-4xl mx-auto flex flex-col gap-2 transition-transform duration-300 ease-in-out hover:shadow-xl hover:scale-[1.02]">

{/* Top Section: Profile Pic + Info */}
<div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full">
  
  {/* Left: Profile + Rating */}
  
{/* <div className="flex flex-col items-center gap-2 w-full sm:w-1/3 sm:items-center sm:justify-start"> */}
<div className="flex flex-col items-center gap-2 w-full sm:w-1/3 sm:items-center sm:justify-start lg:mt-8">

  <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-24 md:h-24  rounded-full overflow-hidden border-2 border-teal-500 mx-auto">
    <Image
      // src=`doctor.profilePic || /MediSetu_Logo_W100.svg`
      src={doctor.profilePic ? doctor.profilePic : "/MediSetu_Logo_W100.svg"}
      // src={doctor.profilePic || "/MediSetu_Logo_W100.svg"}
      alt={`Dr. ${doctor.firstName} ${doctor.lastName}`}
      layout="fill"
      objectFit="cover"
    />
  </div>
  <div className="flex items-center justify-center gap-1 sm:justify-center">
    {Array(5).fill(0).map((_, i) => (
      <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
        <path d="M10 15l-5.878 3.09 1.122-6.545L.487 6.91l6.564-.955L10 0l2.949 5.955 6.564.955-4.757 4.635 1.122 6.545z"/>
      </svg>
    ))}
  </div>
</div>


  {/* Right: Doctor Info */}
  <div className="flex-1 flex flex-col gap-2 text-center sm:text-left">
    <h2 className="text-[clamp(1rem,2.5vw,1.5rem)] font-semibold text-gray-800">
      Dr. {doctor.firstName} {doctor.lastName}
    </h2>

    <p className="text-[clamp(0.85rem,2vw,1rem)] text-gray-600 flex items-center gap-2 justify-center sm:justify-start">
      <FaUserMd className="text-teal-600" />
      {doctor.specialization}
    </p>

    <p className="text-[clamp(0.85rem,2vw,1rem)] text-gray-600 flex items-center gap-2 justify-center sm:justify-start">
      <FaMapMarkerAlt className="text-teal-600" />
      {doctor.location?.city}, {doctor.location?.state}
    </p>

    <p className="text-[clamp(0.85rem,2vw,1rem)] text-gray-600 flex items-center gap-2 justify-center sm:justify-start">
      <FaLanguage className="text-teal-600" />
      {doctor.languagesSpoken?.join(", ") || "N/A"}
    </p>

    <p className="text-[clamp(0.85rem,2vw,1rem)] text-gray-600 flex items-center gap-2 justify-center sm:justify-start">
      <FaMoneyBill className="text-teal-600" />
      ₹{doctor.consultationFees || "Free"}
    </p>

    <p className="text-[clamp(0.85rem,2vw,1rem)] text-gray-600 flex items-center gap-2 justify-center sm:justify-start">
      <FaVideo className="text-teal-600" />
      {doctor.consultationMode}
    </p>
  </div>
</div>

{/* Bottom: Button */}

<div className="pt-2 flex justify-center">
  <Button
    variant="outline"
    className="relative overflow-hidden z-0 text-teal-700 font-semibold border border-teal-500 px-6 py-2 rounded-xl shadow-md
               bg-white hover:text-green hover:bg-teal-600 hover:shadow-xl hover:scale-105 
               transition-all duration-300 ease-in-out 
               text-[clamp(0.85rem,2vw,1rem)] w-full sm:w-auto 
               before:absolute before:inset-0 before:bg-teal-100 before:z-[-1] before:scale-0 hover:before:scale-100 
               before:transition-transform before:duration-500 before:rounded-xl cursor-pointer"
               onClick={() => router.push(`/all-doctors/${doctor.slug}`)}
  >
    View Profile
  </Button>
</div>

</div>


  );
};

export const DocCardList = ({ doctors }) => {
  const [showAll, setShowAll] = useState(false);
  const visibleDoctors = showAll ? doctors : doctors.slice(0, 6);

  return (
    <section className="p-6 w-full">
      <h1 className="text-2xl font-bold mb-4 text-teal-700">Top Rated Doctors</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleDoctors.map((doc, index) => (
          <DoctorCard key={doc._id || doc.id || doc.email || index} doctor={doc} />
        ))}
      </div>

      {doctors.length > 6 && (
        <div className="flex justify-center mt-4">
          <Button
            variant="outline"
            className="flex items-center text-teal-600 border-teal-500 hover:bg-teal-100 transition-colors duration-300"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? (
              <>
                Show Less <FaAngleDown className="ml-2" />
              </>
            ) : (
              <>
                See More <FaAngleDown className="ml-2" />
              </>
            )}
          </Button>
        </div>
      )}
    </section>
  );
};

// // export default { DoctorCard, DocCardList };

