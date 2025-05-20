// "use client";
// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import Image from "next/image";

// const reviews = [
//   {
//     name: "Rajesh Kumar",
//     city: "Mumbai, India",
//     rating: 5,
//     image: "/MediSetu_Logo_W100.svg",
//     review: "MediSetu made booking appointments so easy! Highly recommend.",
//   },
//   {
//     name: "Priya Sharma",
//     city: "Delhi, India",
//     rating: 4.5,
//     image: "/MediSetu_Logo_B100.svg",
//     review: "Great experience with online consultation. The doctors are very professional.",
//   },
//   {
//     name: "Amit Verma",
//     city: "Bangalore, India",
//     rating: 4,
//     image: "/MediSetu_Logo_W100.svg",
//     review: "Smooth experience with lab test bookings. Very efficient service.",
//   },
//   {
//     name: "Neha Gupta",
//     city: "Hyderabad, India",
//     rating: 5,
//     image: "/MediSetu_Logo_B100.svg",
//     review: "Loved the video consultation feature. No waiting time at all!",
//   },
//   {
//     name: "Vikram Singh",
//     city: "Chennai, India",
//     rating: 4.8,
//     image: "/MediSetu_Logo_W100.svg",
//     review: "The health packages are really affordable and convenient.",
//   },
//   {
//     name: "Aniket Soni",
//     city: "Satna (M.P), India",
//     rating: 5,
//     image: "/MediSetu_Logo_B100.svg",
//     review: "The Overall things are so good and better compared to other websites.",
//   },
// ];

// export default function ReviewsSlider() {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
//     }, 4000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <section className="py-10 px-4 bg-gradient-to-b from-teal-50 to-white rounded-lg">
//       <h2 className="text-2xl md:text-3xl font-bold text-center text-teal-700 mb-6">
//         What Our Patients Say
//       </h2>
//       <div className="overflow-hidden relative w-full max-w-6xl mx-auto">
//         <motion.div
//           className="flex space-x-6"
//           animate={{ x: `-${currentIndex * 100}%` }}
//           transition={{ ease: "easeInOut", duration: 1.5 }}
//         >
//           {reviews.concat(reviews).map((review, index) => (
//             <motion.div
//               key={index}
//               className="min-w-[300px] md:min-w-[350px] lg:min-w-[400px] bg-white shadow-lg rounded-xl p-6"
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.5 }}
//             >
//               <div className="flex items-center mb-4">
//                 <Image
//                   src={review.image}
//                   alt={review.name}
//                   width={50}
//                   height={50}
//                   className="rounded-full"
//                 />
//                 <div className="ml-4">
//                   <h3 className="font-semibold text-lg text-gray-800">{review.name}</h3>
//                   <p className="text-sm text-gray-500">{review.city}</p>
//                 </div>
//               </div>
//               <p className="text-gray-600 italic">"{review.review}"</p>
//               <div className="mt-3 flex">
//                 {[...Array(5)].map((_, i) => (
//                   <span key={i} className={`text-yellow-400 ${i < Math.floor(review.rating) ? "opacity-100" : "opacity-50"}`}>
//                     ★
//                   </span>
//                 ))}
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   );
// }



// "use client";
// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import Image from "next/image";

// const reviews = [
//   {
//     name: "Rajesh Kumar",
//     city: "Mumbai, India",
//     rating: 5,
//     image: "/MediSetu_Logo_W100.svg",
//     review: "MediSetu made booking appointments so easy! Highly recommend.",
//   },
//   {
//     name: "Priya Sharma",
//     city: "Delhi, India",
//     rating: 4.5,
//     image: "/MediSetu_Logo_B100.svg",
//     review: "Great experience with online consultation. The doctors are very professional.",
//   },
//   {
//     name: "Amit Verma",
//     city: "Bangalore, India",
//     rating: 4,
//     image: "/MediSetu_Logo_W100.svg",
//     review: "Smooth experience with lab test bookings. Very efficient service.",
//   },
//   {
//     name: "Neha Gupta",
//     city: "Hyderabad, India",
//     rating: 5,
//     image: "/MediSetu_Logo_B100.svg",
//     review: "Loved the video consultation feature. No waiting time at all!",
//   },
//   {
//     name: "Vikram Singh",
//     city: "Chennai, India",
//     rating: 4.8,
//     image: "/MediSetu_Logo_W100.svg",
//     review: "The health packages are really affordable and convenient.",
//   },
//   {
//     name: "Aniket Soni",
//     city: "Satna (M.P), India",
//     rating: 5,
//     image: "/MediSetu_Logo_B100.svg",
//     review: "The Overall things are so good and better compared to other websites.",
//   },
// ];

// export default function ReviewsSlider() {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [intervalId, setIntervalId] = useState(null);

//   useEffect(() => {
//     // Start the interval on component mount
//     const id = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
//     }, 4000);
//     setIntervalId(id);
//     return () => clearInterval(id); // Cleanup on unmount
//   }, []);

//   // Next and Previous handlers
//   const handleNext = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
//   };

//   const handlePrev = () => {
//     setCurrentIndex(
//       (prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length
//     );
//   };

//   return (
//     <section className="py-10 px-4 bg-gradient-to-b from-teal-50 to-white rounded-lg">
//       <h2 className="text-2xl md:text-3xl font-bold text-center text-teal-700 mb-6">
//         What Our Patients Say
//       </h2>
//       <div className="overflow-hidden relative w-full max-w-6xl mx-auto">
//         <motion.div
//           className="flex space-x-6"
//           animate={{ x: `-${currentIndex * 100}%` }}
//           transition={{ ease: "easeInOut", duration: 1.5 }}
//         >
//           {reviews.map((review, index) => (
//             <motion.div
//               key={index}
//               className="min-w-[300px] md:min-w-[350px] lg:min-w-[400px] bg-white shadow-lg rounded-xl p-6"
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.5 }}
//             >
//               <div className="flex items-center mb-4">
//                 <Image
//                   src={review.image}
//                   alt={review.name}
//                   width={50}
//                   height={50}
//                   className="rounded-full"
//                 />
//                 <div className="ml-4">
//                   <h3 className="font-semibold text-lg text-gray-800">{review.name}</h3>
//                   <p className="text-sm text-gray-500">{review.city}</p>
//                 </div>
//               </div>
//               <p className="text-gray-600 italic">"{review.review}"</p>
//               <div className="mt-3 flex">
//                 {[...Array(5)].map((_, i) => (
//                   <span key={i} className={`text-yellow-400 ${i < Math.floor(review.rating) ? "opacity-100" : "opacity-50"}`}>
//                     ★
//                   </span>
//                 ))}
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>
//         {/* Add Next/Prev buttons */}
//         <div className="absolute top-1/2 left-2 transform -translate-y-1/2 text-teal-700 cursor-pointer" onClick={handlePrev}>
//           &#8592;
//         </div>
//         <div className="absolute top-1/2 right-2 transform -translate-y-1/2 text-teal-700 cursor-pointer" onClick={handleNext}>
//           &#8594;
//         </div>
//       </div>
//     </section>
//   );
// }



"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaRegCommentDots} from "react-icons/fa"
const reviews = [
  {
    name: "Rajesh Kumar",
    city: "Mumbai, India",
    rating: 5,
    image: "/MediSetu_Logo_W100.svg",
    review: "MediSetu made booking appointments so easy! Highly recommend.",
  },
  {
    name: "Priya Sharma",
    city: "Delhi, India",
    rating: 4.5,
    image: "/MediSetu_Logo_B100.svg",
    review: "Great experience with online consultation. The doctors are very professional.",
  },
  {
    name: "Amit Verma",
    city: "Bangalore, India",
    rating: 4,
    image: "/MediSetu_Logo_W100.svg",
    review: "Smooth experience with lab test bookings. Very efficient service.",
  },
  {
    name: "Neha Gupta",
    city: "Hyderabad, India",
    rating: 5,
    image: "/MediSetu_Logo_B100.svg",
    review: "Loved the video consultation feature. No waiting time at all!",
  },
  {
    name: "Vikram Singh",
    city: "Chennai, India",
    rating: 4.8,
    image: "/MediSetu_Logo_W100.svg",
    review: "The health packages are really affordable and convenient.",
  },
  {
    name: "Aniket Soni",
    city: "Satna (M.P), India",
    rating: 5,
    image: "/MediSetu_Logo_B100.svg",
    review: "The Overall things are so good and better compared to other websites.",
  },
];

export default function ReviewsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Infinite Looping effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-10 px-4 bg-gradient-to-b from-teal-50 to-white rounded-lg">
      {/* <h2 className="text-2xl md:text-3xl font-bold text-center text-teal-700 mb-6">
        What Our Patients Say
      </h2> */}
      {/* <div className="flex justify-center items-center gap-2 mb-6">
  <span className="text-3xl">💬</span>
  <h2 className="text-2xl md:text-3xl font-bold text-teal-700">
    What Our Patients Say
  </h2>
</div> */}

<div className="flex justify-center items-center gap-3 mb-6">
  <FaRegCommentDots className="text-4xl text-teal-700" />
  <h2 className="text-3xl md:text-4xl font-bold text-teal-700">
    What Our Patients Say
  </h2>
</div>


      <div className="overflow-hidden relative w-full max-w-6xl mx-auto ">
        <motion.div
          className="flex gap-4"
          animate={{ x: `-${currentIndex * 100}%` }}
          transition={{ ease: "easeInOut", duration: 1.5 }}
        >
          {/* Cloning reviews to create the infinite loop */}
          {reviews.concat(reviews).map((review, index) => (
            <motion.div
              key={index}
              className="min-w-[300px] md:min-w-[350px] lg:min-w-[400px] bg-white shadow-lg rounded-xl p-6 gap-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center mb-4">
                <Image
                  src={review.image}
                  alt={review.name}
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div className="ml-4">
                  <h3 className="font-semibold text-lg text-gray-800">{review.name}</h3>
                  <p className="text-sm text-gray-500">{review.city}</p>
                </div>
              </div>
              <p className="text-gray-600 italic">"{review.review}"</p>
              <div className="mt-3 flex">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-yellow-400 ${i < Math.floor(review.rating) ? "opacity-100" : "opacity-50"}`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
