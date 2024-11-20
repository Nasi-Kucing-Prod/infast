"use client";

import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useDashboardContext } from "@/context/DashboardContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "@/image/logo.png";

export default function SideBar() {
  const router = useRouter();
  const { sidebarMenu, toggleSidebarMenu, watchlist } = useDashboardContext();

  return (
    <section
      className={`fixed bg-white rounded-md drop-shadow-md h-[calc(100vh-20px)] m-5 sm:bg-transparent sm:drop-shadow-none sm:rounded-none sm:h-fit sm:m-0 md:block sm:relative space-y-4 pb-5 pt-4 px-5 my-2 z-50 md:w-3/12 w-1/2 ${
        !sidebarMenu ? "hidden" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <Link href={"/"}>
          <Image
            src={logo}
            alt="logo"
            width={1000}
            height={1000}
            className="w-32"
          />
        </Link>
        <button onClick={toggleSidebarMenu} className="md:hidden">
          ✖
        </button>
      </div>
      <hr />
      <nav className="flex flex-col gap-3">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="hover:text-primary-infast border-2 px-2 rounded-md">
              Market
            </AccordionTrigger>
            <AccordionContent className="flex flex-col ml-5 pt-2 gap-3">
              <Link
                href="/dashboard/crypto"
                className="hover:text-primary-infast "
              >
                Crypto
              </Link>
              <Link
                href="/dashboard/forex"
                className="hover:text-primary-infast"
              >
                Forex
              </Link>
              <Link
                href="/dashboard/stocks"
                className="hover:text-primary-infast"
              >
                Stock
              </Link>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <button
          onClick={() => router.push("/dashboard/watchlist")}
          className="px-2 py-1 border-2 text-left rounded-md hover:text-primary-infast hover:underline font-medium"
        >
          Watchlist ({watchlist.length})
        </button>
      </nav>
    </section>
  );
}
