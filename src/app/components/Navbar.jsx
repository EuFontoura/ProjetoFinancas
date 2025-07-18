"use client";

import { useState } from "react";
import { ArrowBigRight } from "lucide-react";
import NavButton from "./NavButton";

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
      {isOpen && (
        <div className="flex flex-col gap-4 w-full px-4">
          <NavButton title="Dashboard" href="/" />
          <NavButton title="Index 2" href="/" />
          <NavButton title="Index 3" href="/" />
          <NavButton title="Index 4" href="/" />
          <NavButton title="Index 5" href="/" />
        </div>
      )}

      <div
        className="
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
        "
      >
        <ArrowBigRight
          className={`w-6 h-6 text-black transition-transform duration-500 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>
    </div>
  );
}
