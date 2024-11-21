"use client";

import React, { useEffect, useState } from "react";
import { useDashboardContext } from "@/context/DashboardContext";
import { DashboardHeader } from "@/components/DashboardHeader";

interface TickerDashboard {
  currency_symbol: string;
  name: string;
  latest_price: number;
  change_percentage: number;
  market: string;
}

interface WatchlistItem extends TickerDashboard {
  uniqueId: string;
}

const getUniqueId = (symbol: string, name: string): string =>
  `${symbol}-${name}`;

export default function Watchlist() {
  const { watchlist, data, setData, userId } = useDashboardContext();
  const [watchlistItems, setWatchlistItems] = useState<WatchlistItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:8000/dashboard"); // Fetch data from your API
      if (!response.ok) {
        throw new Error(
          `HTTP error: ${response.status} - ${response.statusText}`
        );
      }
      const json = await response.json();
      if (Array.isArray(json.result)) {
        setData(json.result);
        const watchlistSet = new Set(watchlist);
        const filtered: WatchlistItem[] = json.result
          .filter((ticker: TickerDashboard) =>
            watchlistSet.has(getUniqueId(ticker.currency_symbol, ticker.name))
          )
          .map((ticker: TickerDashboard) => ({
            ...ticker,
            uniqueId: getUniqueId(ticker.currency_symbol, ticker.name),
          }));
        console.log("Filtered Watchlist Items:", filtered); // Debugging
        setWatchlistItems(filtered);
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [watchlist]);

  return (
    <main className="bg-gray-100 min-h-[calc(100vh-20px)] w-full px-5 pb-5 m-2 rounded-3xl">
      <DashboardHeader />
      <div className="space-y-5">
        <section className="px-5 py-2 bg-white rounded-xl w-full flex flex-col justify-between">
          <h2 className="text-2xl font-bold mb-4">My Watchlist</h2>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : watchlistItems.length > 0 ? (
            <ul className="space-y-2">
              {watchlistItems.map((ticker, idx) => (
                <li
                  key={ticker.uniqueId}
                  className="flex justify-between items-end p-2 border rounded-md"
                >
                  <div>
                    <div className="text-gray-500 text-sm">{ticker.market}</div>
                    <div className="flex gap-2 items-center text-center">
                      <span className="font-semibold">{ticker.name}</span>
                      <span className="text-gray-500 text-sm">
                        ({ticker.currency_symbol})
                      </span>
                    </div>
                  </div>
                  <span className="text-right">
                    ${ticker.latest_price.toFixed(2)} (
                    <span
                      className={
                        ticker.change_percentage > 0
                          ? "text-green-500"
                          : "text-red-500"
                      }
                    >
                      {ticker.change_percentage.toFixed(2)}%
                    </span>
                    )
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No items in your watchlist</p>
          )}
        </section>
      </div>
    </main>
  );
}
