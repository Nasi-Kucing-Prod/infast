"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "@/image/logo.png";

export default function Footer() {
  return (
    <footer className="w-screen bg-white drop-shadow-md flex justify-between items-center px-16 py-8 font-medium text-gray-600 mt-20 border-t-4">
      <div className="flex flex-col items-center">
        <Image src={logo} alt="logo" width={180} height={180} />
        <div className="text-sm text-gray-500">Self-serve & Transparent</div>
      </div>

      <div className="text-sm text-right">
        <p>Copyright ©2024 Infast.inc</p>
        <p>
          This is a website project for a Final Project assignment from Hacktiv8
        </p>
        <p>
          Select market & reference data provided by{" "}
          <Link
            href="https://www.alphavantage.co"
            className="text-primary-infast hover:underline"
            target="_blank"
          >
            alphavantage.co
          </Link>
          ,{" "}
          <Link
            href="https://polygon.io"
            className="text-primary-infast hover:underline"
            target="_blank"
          >
            api.polygon.io
          </Link>
          ,{" "}
          <Link
            href="https://www.coingecko.com"
            className="text-primary-infast hover:underline"
            target="_blank"
          >
            coingecko.com
          </Link>
        </p>
      </div>
    </footer>
  );
}
