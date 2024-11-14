import Link from "next/link";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const invoices = [
  {
    invoice: "1",
    Assest: "DOGE",
    LastPrice: "$250.00",
    Percentage: "+51.00%",
  },
  {
    invoice: "2",
    Assest: "USTD",
    LastPrice: "$150.00",
    Percentage: "-0.67%",
  },
  {
    invoice: "3",
    Assest: "BTC",
    LastPrice: "$350.00",
    Percentage: "-4.25%",
  },
  {
    invoice: "4",
    Assest: "PEPE",
    LastPrice: "$450.00",
    Percentage: "+31.03%",
  },
  {
    invoice: "5",
    Assest: "ETH",
    LastPrice: "$550.00",
    Percentage: "-1.10%",
  },
  {
    invoice: "6",
    Assest: "CTRN",
    LastPrice: "$200.00",
    Percentage: "+51.00%",
  },
  {
    invoice: "7",
    Assest: "MNTB",
    LastPrice: "$300.00",
    Percentage: "-4.25%",
  },
  {
    invoice: "8",
    Assest: "SOL",
    LastPrice: "$200.00",
    Percentage: "+10.25%",
  },
  {
    invoice: "9",
    Assest: "ADA",
    LastPrice: "$100.00",
    Percentage: "-2.50%",
  },
  {
    invoice: "10",
    Assest: "XRP",
    LastPrice: "$120.00",
    Percentage: "+5.00%",
  },
  {
    invoice: "11",
    Assest: "DOT",
    LastPrice: "$450.00",
    Percentage: "+9.00%",
  },
  {
    invoice: "12",
    Assest: "AVAX",
    LastPrice: "$300.00",
    Percentage: "-6.00%",
  },
  {
    invoice: "13",
    Assest: "LTC",
    LastPrice: "$350.00",
    Percentage: "+3.00%",
  },
  {
    invoice: "14",
    Assest: "LINK",
    LastPrice: "$500.00",
    Percentage: "-1.50%",
  },
  {
    invoice: "15",
    Assest: "MATIC",
    LastPrice: "$250.00",
    Percentage: "+7.00%",
  },
];

const Page = () => {
  return (
    <>
      <div className="my-10 flex flex-col gap-5">
        <div className="flex items-center text-center gap-5">
          <Link href={"/market"}>
            <p className="border border-emerald-800 py-1 px-2 rounded-md text-emerald-800 font-medium">
              All Market
            </p>
          </Link>
          <Link href={"/market"}>
            <p className="border border-emerald-800 py-1 px-2 rounded-md text-emerald-800 font-medium">
              Watchlist
            </p>
          </Link>
        </div>

        <section className="px-5 py-2 bg-white rounded-xl border">
          <Table>
            <TableHeader>
              <TableRow className="text-nowrap">
                <TableHead className="w-[100px] text-black">No</TableHead>
                <TableHead className="w-7/12 text-black">Assest Name</TableHead>
                <TableHead className="text-center text-black">
                  Lastest Price
                </TableHead>
                <TableHead className="text-center text-black">
                  % Change
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.invoice}>
                  <TableCell className="font-medium">
                    {invoice.invoice}
                  </TableCell>
                  <TableCell className="uppercase font-semibold md:text-xl text-base">
                    {invoice.Assest}
                  </TableCell>
                  <TableCell className="text-center font-semibold md:text-xl text-base">
                    {invoice.LastPrice}
                  </TableCell>
                  <TableCell
                    className={`text-center font-semibold md:text-xl text-base ${
                      invoice.Percentage.startsWith("-")
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {invoice.Percentage}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>

        <button className="text-end font-semibold text-emerald-800 hover:underline">
          See More
        </button>
      </div>
    </>
  );
};
export default Page;
