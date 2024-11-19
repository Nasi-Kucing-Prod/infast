"use client";
import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useDashboardContext } from "@/context/DashboardContext";

export default function SideBar() {
  const { sidebarMenu, toggleSidebarMenu } = useDashboardContext();

  return (
    <section
      className={`fixed bg-white rounded-md drop-shadow-md h-[calc(100vh-20px)]   m-5 sm:bg-transparent sm:drop-shadow-none sm:rounded-none sm:h-fit sm:m-0 md:block sm:relative space-y-4 pb-5 pt-4 px-5 my-2 z-50 md:w-3/12 w-1/2 ${
        !sidebarMenu ? "hidden" : ""
      }`}
    >
      <div className="flex ">
        <div className="text-2xl font-bold">Infast</div>
      </div>
      <hr />
      <nav className="flex flex-col gap-3">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-emerald-800 border-2 px-2 rounded-md">
              Market
            </AccordionTrigger>
            <AccordionContent className="flex flex-col ml-5 pt-2">
              <Link href="/dashboard/stocks">Stock</Link>
              <Link href="/dashboard/crypto">Crypto</Link>
              <Link href="/dashboard/stocks">Forex</Link>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <button className="px-2 py-1 border-2 text-left rounded-md">
          Watchlist
        </button>
        <button className="px-2 py-1 border-2 text-left rounded-md">
          Back to home
        </button>
      </nav>
    </section>
  );
}
