"use client";

import React, { useEffect, useState } from "react";
import { useDashboardContext } from "@/context/DashboardContext";
import { DashboardHeader } from "@/components/DashboardHeader";
import Swal from "sweetalert2";

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
  const { watchlist, setData, setWatchlist, userId } = useDashboardContext();
  const [watchlistItems, setWatchlistItems] = useState<WatchlistItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [removingId, setRemovingId] = useState<string | null>(null); // To track the item being removed

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://woolly-nervous-smoke.glitch.me/dashboard"
      );
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchlist]);

  // Handler function to remove an item from the watchlist
  const handleRemove = async (uniqueId: string) => {
    if (!userId) {
      console.error("User ID is not available.");
      return;
    }

    // Show confirmation dialog using Swal2
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to remove this item from your watchlist?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove it!",
    });

    if (result.isConfirmed) {
      setRemovingId(uniqueId); // Mark the item as being removed

      try {
        const response = await fetch("/signup/api/watchlist", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, uniqueId }),
        });

        if (response.ok) {
          // Update watchlist in context
          setWatchlist((prev) => prev.filter((id) => id !== uniqueId));
          // Update watchlistItems locally
          setWatchlistItems((prev) =>
            prev.filter((item) => item.uniqueId !== uniqueId)
          );

          // Show success notification
          await Swal.fire({
            title: "Removed!",
            text: "The item has been removed from your watchlist.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });
        } else {
          const errorData = await response.json();
          console.error("Failed to remove from watchlist:", errorData.message);
          // Show error notification
          await Swal.fire({
            title: "Error!",
            text: `Failed to remove item: ${errorData.message}`,
            icon: "error",
            timer: 3000,
            showConfirmButton: true,
          });
        }
      } catch (error) {
        console.error("Error while removing from watchlist:", error);
        // Show error notification
        await Swal.fire({
          title: "Error!",
          text: "An error occurred while removing the item from your watchlist.",
          icon: "error",
          timer: 3000,
          showConfirmButton: true,
        });
      } finally {
        setRemovingId(null); // Reset the removing status
      }
    }
  };

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
              {watchlistItems.map((ticker) => (
                <li
                  key={ticker.uniqueId}
                  className="flex justify-between items-center p-2 border rounded-md"
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
                  <div className="flex flex-col items-end">
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
                    <button
                      onClick={() => handleRemove(ticker.uniqueId)}
                      disabled={removingId === ticker.uniqueId}
                      className={`mt-2 px-3 py-1 text-sm rounded ${
                        removingId === ticker.uniqueId
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-red-500 hover:bg-red-600 text-white"
                      }`}
                    >
                      {removingId === ticker.uniqueId ? "Removing..." : "Remove"}
                    </button>
                  </div>
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
