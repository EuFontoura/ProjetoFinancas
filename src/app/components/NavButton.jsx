"use client";

import Link from "next/link";

export default function NavButton({ title, href }) {
  return (
    <Link href={href}>
      <button
        className="w-full py-3 text-black bg-amber-300 rounded-lg text-center font-semibold transition duration-300 hover:bg-amber-400 hover:scale-105 hover:shadow-lg"
      >
        {title}
      </button>
    </Link>
  );
}
