"use client";

import { PanelLeftClose } from "lucide-react";
import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function SideBar() {
  return (
    <section className="relative space-y-4 pb-5 pt-4 px-5 my-2 z-50 w-[300px]">
      <div className="flex justify-between">
        <div className="text-2xl font-bold">Infast</div>
        <button>
          <PanelLeftClose />
        </button>
      </div>
      <hr />
      <nav className="flex flex-col gap-3">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-emerald-800 border-2 px-2 rounded-md">
              Market
            </AccordionTrigger>
            <AccordionContent className="flex flex-col ml-5 pt-2">
              <Link href="">Stock</Link>
              <Link href="">Crypto</Link>
              <Link href="">Forex</Link>
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
