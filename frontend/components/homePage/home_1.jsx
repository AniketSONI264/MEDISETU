// "use client";
// import { useState, useEffect } from "react";
// import { Search } from "lucide-react";
// import Image from "next/image";

// const carouselImages = [
//   "/carousel_1.png",
//   "/carousel_2(1).png",
//   "/carousel_3.png",
// ];

// export default function CarouselPage() {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isPaused, setIsPaused] = useState(false);

//   useEffect(() => {
//     if (isPaused) return;

//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
//     }, 3000);

//     return () => clearInterval(interval);
//   }, [isPaused]);

//   return (
//     <main className="pt-20 pb-10">
//       <div className="relative w-full max-w-5xl mx-auto">
//         {/* Carousel */}
//         <div
//           className="overflow-hidden rounded-2xl shadow-lg relative"
//           onMouseEnter={() => setIsPaused(true)}
//           onMouseLeave={() => setIsPaused(false)}
//         >
//           <div className="relative w-full lg:h-[400px] h-[200px]">
//             {carouselImages.map((img, index) => (
//               <Image
//                 key={index}
//                 src={img}
//                 alt={`Slide ${index + 1}`}
//                 width={1200}
//                 height={800}
//                 className={`absolute inset-0 w-full h-[200px] lg:h-[400px] object-contain lg:object-cover transition-all duration-700 ease-in-out ${
//                   index === currentIndex
//                     ? "opacity-100 scale-100 translate-x-0"
//                     : "opacity-0 scale-95 translate-x-5"
//                 }`}
//               />
//             ))}
//           </div>
//         </div>

//         {/* Overlapping Search Bar */}
//         <div className="absolute bottom-[-25px] left-1/2 transform -translate-x-1/2 w-72 sm:w-96 md:w-[500px] lg:w-[600px]">
//           <div className="relative bg-white shadow-lg rounded-full overflow-hidden border-2 border-gray-300 hover:border-teal-500 focus-within:border-teal-500 transition-all duration-200">
//             <input
//               type="text"
//               placeholder="Search for services, doctors..."
//               className="w-full px-5 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-700"
//             />
//             <Search className="absolute right-4 top-3 text-teal-600 w-6 h-6" />
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }



"use client";
import { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const carouselImages = ["/carousel_1.png", "/carousel_2(1).png", "/carousel_3.png"];

export default function CarouselPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const router = useRouter();

  // Autoplay Carousel
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isPaused]);

  // Search Logic
  useEffect(() => {
    if (!searchTerm) {
      setSearchResults([]);
      setIsDropdownOpen(false);
      return;
    }

    const timeout = setTimeout(async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/search?query=${searchTerm}`);
        const data = await res.json();
        setSearchResults(data);
        setIsDropdownOpen(true);
      } catch (err) {
        console.error("Search error", err);
      } finally {
        setIsLoading(false);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchTerm]);

  // Click Outside Handler
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
        setHighlightedIndex(-1);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard Navigation
  const handleKeyDown = (e) => {
    if (!isDropdownOpen) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) => Math.min(prev + 1, searchResults.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      router.push(`/doctors/${searchResults[highlightedIndex]._id}`);
      setIsDropdownOpen(false);
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSearchResults([]);
    setIsDropdownOpen(false);
    setHighlightedIndex(-1);
  };

  return (
    <main className="pt-20 pb-10">
      <div className="relative w-full max-w-5xl mx-auto">
        {/* Carousel */}
        <div
          className="overflow-hidden rounded-2xl shadow-lg relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative w-full lg:h-[400px] h-[200px]">
            {carouselImages.map((img, index) => (
              <Image
                key={index}
                src={img}
                alt={`Slide ${index + 1}`}
                width={1200}
                height={800}
                className={`absolute inset-0 w-full h-[200px] lg:h-[400px] object-contain lg:object-cover transition-all duration-700 ease-in-out ${
                  index === currentIndex
                    ? "opacity-100 scale-100 translate-x-0"
                    : "opacity-0 scale-95 translate-x-5"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="absolute bottom-[-25px] left-1/2 transform -translate-x-1/2 w-72 sm:w-96 md:w-[500px] lg:w-[600px]">
          <div className="relative bg-white shadow-lg rounded-full overflow-hidden border-2 border-gray-300 hover:border-teal-500 focus-within:border-teal-500 transition-all duration-200">
            <input
              type="text"
              ref={inputRef}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search for services, doctors..."
              className="w-full px-5 py-3 rounded-full focus:outline-none text-gray-700"
            />
            {searchTerm && (
              <X
                className="absolute right-10 top-3 text-gray-400 cursor-pointer hover:text-red-500 w-5 h-5"
                onClick={clearSearch}
              />
            )}
            <Search className="absolute right-4 top-3 text-teal-600 w-6 h-6" />
          </div>
        </div>

        {/* Search Results Dropdown */}
        {isDropdownOpen && (
          <div
            ref={dropdownRef}
            className="absolute top-[105%] left-1/2 transform -translate-x-1/2 bg-white shadow-xl rounded-lg mt-2 w-72 sm:w-96 md:w-[500px] lg:w-[600px] max-h-[300px] overflow-auto z-20"
          >
            {isLoading ? (
              <p className="p-4 text-center text-gray-500">Searching...</p>
            ) : searchResults.length > 0 ? (
              searchResults.map((doctor, i) => (
                <div
                  key={i}
                  onClick={() => router.push(`/doctors/${doctor._id}`)}
                  className={`px-5 py-3 cursor-pointer border-b hover:bg-gray-100 ${
                    highlightedIndex === i ? "bg-teal-100" : ""
                  }`}
                >
                  <p className="font-semibold">
                    {doctor.firstName} {doctor.lastName}
                  </p>
                  <p className="text-sm text-gray-500">
                    {doctor.specialization} • {doctor.city}, {doctor.state}
                  </p>
                </div>
              ))
            ) : (
              <p className="p-4 text-center text-gray-400">No results found</p>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
