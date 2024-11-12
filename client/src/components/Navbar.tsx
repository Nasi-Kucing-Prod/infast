"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div className="w-screen bg-white drop-shadow-md flex justify-between items-center px-16 py-2 max-[1017px]:px-5 text-center">
      <div className="sm:text-3xl text-2xl">
        <Link href={"/"}>
          <h1 className="font-bold text-emerald-800">Infast</h1>
        </Link>
      </div>

      <div className="sm:flex gap-4 font-medium hidden text-center items-center">
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
      <div className="sm:flex gap-4 font-semibold hidden text-center items-center">
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
