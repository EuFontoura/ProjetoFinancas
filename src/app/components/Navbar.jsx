"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ArrowBigRight } from "lucide-react";
import NavButton from "./NavButton";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <div
      className={`bg-black flex flex-col border-r-2 border-amber-300 justify-center items-center transition-all duration-500 relative ${
        isOpen ? "w-52" : "w-12"
      }`}
      onMouseEnter={() => {
        if (window.innerWidth >= 768) setIsOpen(true);
      }}
      onMouseLeave={() => {
        if (window.innerWidth >= 768) setIsOpen(false);
      }}
    >
      {isOpen && (
        <div className="flex flex-col gap-4 w-full px-4">
          <NavButton title="Dashboard" href="/" />
          <NavButton title="Calculadoras" href="/calculadoras" />
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
        onClick={() => setIsOpen(!isOpen)} // <--- toggle manual no mobile
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