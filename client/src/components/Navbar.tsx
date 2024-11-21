"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "@/image/logo.png";
import { Menu } from "lucide-react";
import Profile from "./Profile";
import { useAuth } from "@/app/signup/context/AuthContext";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  // const [token, setToken] = useState<string | null>(null);
  const { token, logout } = useAuth();
  

  // useEffect(() => {
  //   const storedToken = window.localStorage.getItem("token");
  //   setToken(storedToken);
  // }, []);

  // const handleLogout = () => {
  //   window.localStorage.removeItem("token");
  //   setToken(null);
  // };

  return (
    <nav className="fixed w-screen bg-white drop-shadow-md flex justify-between items-center px-16 py-2 max-[1017px]:px-5 text-center z-50 top-0">
      {/* Dropdown menu for smaller screens */}
      <div className="sm:hidden flex items-center">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-primary-infast"
        >
          <Menu />
        </button>
      </div>

      {/* Dropdown content */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col sm:hidden items-center py-4 gap-4 z-50">
          <Link
            href={"/market"}
            className={
              pathname === "/market"
                ? "text-primary-infast border-b border-primary-infast"
                : "text-black"
            }
            onClick={() => setMenuOpen(false)}
          >
            Market
          </Link>
          <Link
            href={"/news"}
            className={
              pathname === "/news"
                ? "text-primary-infast border-b border-primary-infast"
                : "text-black"
            }
            onClick={() => setMenuOpen(false)}
          >
            News
          </Link>
          <Link
            href={"/AboutUs"}
            className={
              pathname === "/AboutUs"
                ? "text-primary-infast border-b border-primary-infast"
                : "text-black"
            }
            onClick={() => setMenuOpen(false)}
          >
            About Us
          </Link>

          {!token && (
            <>
              <Link
                href={"/signup"}
                className="text-primary-infast border border-primary-infast px-2 py-1 rounded-md w-11/12 text-center"
                onClick={() => setMenuOpen(false)}
              >
                Sign Up
              </Link>
              <Link
                href={"/login"}
                className="text-white bg-primary-infast px-2 py-1 rounded-md w-11/12 text-center"
                onClick={() => setMenuOpen(false)}
              >
                Log In
              </Link>
            </>
          )}
        </div>
      )}

      {/* Logo */}
      <Link href={"/"}>
        <Image
          src={logo}
          alt="logo"
          width={1000}
          height={1000}
          className="w-32"
        />
      </Link>

      {/* Navigation for larger screens */}
      <div className="sm:flex gap-4 font-medium hidden text-center items-center">
        <Link
          href={"/market"}
          className={
            pathname === "/market"
              ? "text-primary-infast border-b border-primary-infast"
              : "text-black"
          }
        >
          Market
        </Link>
        <Link
          href={"/news"}
          className={
            pathname === "/news"
              ? "text-primary-infast border-b border-primary-infast"
              : "text-black"
          }
        >
          News
        </Link>
        <Link
          href={"/AboutUs"}
          className={
            pathname === "/AboutUs"
              ? "text-primary-infast border-b border-primary-infast"
              : "text-black"
          }
        >
          About Us
        </Link>
      </div>

      {/* Sign-up/Login for larger screens */}
      {token ? (
        <Profile />
      ) : (
        <>
          {" "}
          <div className="sm:flex gap-4 font-semibold hidden text-center items-center">
            <Link
              href={"/signup"}
              className="text-primary-infast border border-primary-infast px-2 py-1 rounded-md"
            >
              Sign Up
            </Link>
            <Link
              href={"/login"}
              className="text-white bg-primary-infast px-2 py-1 rounded-md"
            >
              Log In
            </Link>
          </div>
        </>
      )}
    </nav>
  );
}
