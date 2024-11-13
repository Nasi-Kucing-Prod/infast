"use client";

import Link from "next/link";

export default function Footer() {
    return (
        <footer className="w-screen bg-white drop-shadow-md flex justify-between items-center px-16 py-4 font-medium text-gray-600">
            <div className="flex flex-col items-center">
                <div className="text-2xl font-bold text-emerald-800">Infast</div>
                <div className="text-sm text-gray-500">Self-serve & Transparent</div>
            </div>

            <div className="text-sm text-right">
                <p>Copyright ©2024 Infast.inc</p>
                <p>This is a website project for a Final Project assignment from Hacktiv8</p>
                <p>
                    Select market & reference data provided by{" "}
                    <Link href="https://www.alphavantage.co" className="text-emerald-800 hover:underline" target="_blank">
                        alphavantage.co
                    </Link>
                    ,{" "}
                    <Link href="https://polygon.io" className="text-emerald-800 hover:underline" target="_blank">
                        api.polygon.io
                    </Link>
                    ,{" "}
                    <Link href="https://www.coingecko.com" className="text-emerald-800 hover:underline" target="_blank">
                        coingecko.com
                    </Link>
                </p>
            </div>
        </footer>
    );
}
