"use client";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import Image from "next/image";

const carouselImages = [
  "/carousel_1.png",
  "/carousel_2(1).png",
  "/carousel_3.png",
];

export default function CarouselPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused]);

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

        {/* Overlapping Search Bar */}
        <div className="absolute bottom-[-25px] left-1/2 transform -translate-x-1/2 w-72 sm:w-96 md:w-[500px] lg:w-[600px]">
          <div className="relative bg-white shadow-lg rounded-full overflow-hidden border-2 border-gray-300 hover:border-teal-500 focus-within:border-teal-500 transition-all duration-200">
            <input
              type="text"
              placeholder="Search for services, doctors..."
              className="w-full px-5 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-700"
            />
            <Search className="absolute right-4 top-3 text-teal-600 w-6 h-6" />
          </div>
        </div>
      </div>
    </main>
  );
}
