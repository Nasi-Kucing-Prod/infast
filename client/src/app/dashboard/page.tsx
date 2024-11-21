import React from "react";
import { DashboardHeader } from "@/components/DashboardHeader";

// Define the TypeScript interface for the data
interface DashboardItem {
  currency_symbol: string;
  name: string;
  market: string;
  latest_price: number;
  change_percentage: number;
  change_amount: number;
}

export default async function Dashboard() {
  const resp = await fetch("http://localhost:8000/dashboard");
  const { result }: { result: DashboardItem[] } = await resp.json();

  // Find the biggest change for each market
  const markets = ["crypto", "forex", "stocks"];
  const biggestChanges = markets
    .map((market) => {
      return result
        .filter((item) => item.market === market)
        .reduce((prev, current) =>
          Math.abs(current.change_amount) > Math.abs(prev.change_amount)
            ? current
            : prev
        );
    })
    .filter(Boolean); // Remove undefined results if a market has no items

  return (
    <main className="bg-gray-100 w-full px-5 pb-5 xs:m-2 m-0 rounded-3xl">
      <DashboardHeader />
      <div className="space-y-5 h-[calc(100vh-130px)] overflow-auto">
        <h1 className="text-xl font-bold">Biggest Changes by Market</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {biggestChanges.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl p-4 flex flex-col space-y-3"
            >
              <h2 className="text-lg font-semibold text-gray-700">
                {item.name}
              </h2>
              <p className="text-gray-500">Symbol: {item.currency_symbol}</p>
              <p className="text-gray-500">Market: {item.market}</p>
              <p className="text-gray-500">
                Latest Price: ${item.latest_price.toFixed(2)}
              </p>
              <p
                className={`text-lg font-bold ${
                  item.change_amount > 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                Change Amount: {item.change_amount > 0 ? "+" : ""}
                {item.change_amount.toFixed(2)}
              </p>
              <p
                className={`text-sm ${
                  item.change_percentage > 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                ({item.change_percentage > 0 ? "+" : ""}
                {item.change_percentage.toFixed(2)}%)
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
