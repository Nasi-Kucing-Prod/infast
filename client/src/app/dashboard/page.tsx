import React from "react";
import { NewsDashboardRow } from "@/components/NewsDashboardRow";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChartDashboard } from "@/components/ChartDashboard";
import { DashboardHeader } from "@/components/DashboardHeader";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const invoices = [
  {
    invoice: "INV001",
    Assest: "DOGE",
    LastPrice: "$250.00",
    Percentage: "+51.00%",
  },
  {
    invoice: "INV002",
    Assest: "USTD",
    LastPrice: "$150.00",
    Percentage: "-0.67%",
  },
  {
    invoice: "INV003",
    Assest: "BTC",
    LastPrice: "$350.00",
    Percentage: "-4.25%",
  },
  {
    invoice: "INV004",
    Assest: "PEPE",
    LastPrice: "$450.00",
    Percentage: "+31.03%",
  },
  {
    invoice: "INV005",
    Assest: "ETH",
    LastPrice: "$550.00",
    Percentage: "-1.10%",
  },
  {
    invoice: "INV006",
    Assest: "CTRN",
    LastPrice: "$200.00",
    Percentage: "+51.00%",
  },
  {
    invoice: "INV007",
    Assest: "MNTB",
    LastPrice: "$300.00",
    Percentage: "-4.25%",
  },
];

export default function Dashboard() {
  return (
    <main className="bg-gray-100 w-full px-5 pb-5 m-2 rounded-3xl">
      <DashboardHeader />
      <div className="space-y-5">
        <div className="flex flex-col md:flex-row w-full gap-5 ">
          <ChartDashboard />
          <section className="w-full md:w-5/12 h-[350px] bg-white rounded-xl p-5 flex flex-col ">
            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-emerald-800">News</h2>
              <hr className="border-emerald-800" />
            </div>
            <ScrollArea className="flex-1 mt-2 ">
              {Array(6)
                .fill(0)
                .map((_, idx) => (
                  <>
                    <NewsDashboardRow key={idx} />
                    <hr />
                  </>
                ))}
            </ScrollArea>
          </section>
        </div>
        <section className="px-5 py-2 bg-white rounded-xl">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">No</TableHead>
                <TableHead>Assest Name</TableHead>
                <TableHead className="text-right">Lastest Price</TableHead>
                <TableHead className="text-right">% Change</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium">
                    {invoice.invoice}
                  </TableCell>
                  <TableCell>{invoice.Assest}</TableCell>
                  <TableCell className="text-right">
                    {invoice.LastPrice}
                  </TableCell>
                  <TableCell className="text-right">
                    {invoice.Percentage}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      </div>
    </main>
  );
}
