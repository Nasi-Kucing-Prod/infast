"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div className="w-screen bg-white drop-shadow-md flex justify-between items-center px-16 py-2">
      <div className="text-3xl max-[767px]:text-2xl">
        <Link href={"/"}>
          <h1 className="font-bold text-emerald-800">Infast</h1>
        </Link>
      </div>
      <div className="max-[682px]:overflow-x-scroll flex gap-4 font-medium">
        <Link
          href={"/market"}
          className={
            pathname === "/market"
              ? "text-emerald-800 border-b border-emerald-800"
              : "text-black"
          }
        >
          Market
        </Link>
        <Link
          href={"/news"}
          className={
            pathname === "/news"
              ? "text-emerald-800 border-b border-emerald-800"
              : "text-black"
          }
        >
          News
        </Link>
        <Link
          href={"/about-us"}
          className={
            pathname === "/about-us"
              ? "text-emerald-800 border-b border-emerald-800"
              : "text-black"
          }
        >
          About Us
        </Link>
      </div>
      <div className="flex gap-4 font-semibold">
        <Link
          href={"/signup"}
          className="text-emerald-800 border border-emerald-800 px-2 py-1 rounded-md"
        >
          Sign Up
        </Link>
        <Link
          href={"/login"}
          className="text-white bg-emerald-800 px-2 py-1 rounded-md"
        >
          Log In
        </Link>
      </div>
    </div>
  );
}
