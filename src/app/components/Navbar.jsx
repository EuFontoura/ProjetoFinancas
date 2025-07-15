"use client";

import { useState } from "react";
import { ArrowBigRight } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`bg-black flex flex-col border-r-2 border-amber-300 justify-center items-center transition-all duration-500 relative ${
        isOpen ? "w-52" : "w-12"
      }`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Botões */}
      {isOpen && (
        <div className="flex flex-col gap-4 w-full px-4">
          {Array.from({ length: 5 }, (_, i) => (
            <button
              key={i}
              className="w-full py-3 text-black bg-amber-300 rounded-lg text-center font-semibold transition duration-300 hover:bg-amber-400 hover:scale-105 hover:shadow-lg"
            >
              Index {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* Seta maior com rotação */}
      <div
        className={`
            py-10
            px-2
          absolute 
          top-1/2 
          -right-4 
          transform 
          -translate-y-1/2 
          bg-amber-300 
          rounded-r-lg 
          shadow-md 

        `}
      >
        <ArrowBigRight
          className={`w-6 h-6 text-black transition-transform 
          duration-1000
          ${isOpen ? "rotate-180" : ""}
          hover:rotate-180`}
        />
      </div>
    </div>
  );
}
