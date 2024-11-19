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

export default function SideBar() {
  const router = useRouter();
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
            <AccordionTrigger className="hover:text-emerald-800 border-2 px-2 rounded-md">
              Market
            </AccordionTrigger>
            <AccordionContent className="flex flex-col ml-5 pt-2 gap-3">
              <Link
                href="/dashboard/crypto"
                className="hover:text-emerald-800 "
              >
                Crypto
              </Link>
              <Link href="/dashboard/forex" className="hover:text-emerald-800">
                Forex
              </Link>
              <Link href="/dashboard/stocks" className="hover:text-emerald-800">
                Stock
              </Link>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <button
          onClick={() => router.push("/dashboard/watchlist")}
          className="px-2 py-1 border-2 text-left rounded-md hover:text-emerald-800 hover:underline font-medium"
        >
          Watchlist
        </button>
        <Link
          href={"/"}
          className="px-2 py-1 border-2 text-left rounded-md hover:text-emerald-800 hover:underline font-medium"
        >
          Back to home
        </Link>
      </nav>
    </section>
  );
}
