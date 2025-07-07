"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const pathname = usePathname();
  const navItems = [
    { text: "Home", href: "/" },
    { text: "Chart", href: "/chart" },
    { text: "Contact", href: "/contact" },
    { text: "Login", href: "/login" },
  ];

  return (
    <div
      className={`flex items-center px-2 py-3 bg-black md:px-0 md:space-x-8 pt-7 justify-evenly`}
    >
      {navItems.map((one) => {
        const isActive = one.href === pathname;
        return (
          <Link key={one.text} href={one.href}>
            <div
              className={`md:px-[7rem] text-black hover:shadow-theme-yellow hover:bg-white font-semibold border px-4 py-2 border-black md:py-[0.9rem] tracking-wide uppercase text-xs md:text-[14px] rounded-3xl md:shadow-[0_2px_2px_hsla(0,0%,100%,.9)] ${
                isActive ? "bg-white" : "bg-theme-yellow"
              }`}
            >
              {one.text}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
