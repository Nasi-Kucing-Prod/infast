"use client";

import React, { useState } from "react";
import { Star, Star as StarOutline } from "lucide-react";
import { TableCell, TableRow } from "@/components/ui/table";
import { useDashboardContext } from "@/context/DashboardContext";

interface TickerDashboard {
  currency_symbol: string;
  name: string;
  latest_price: number;
  change_percentage: number;
  market: string;
}

interface TableRowDashboardProps {
  index: number;
  ticker: TickerDashboard;
}

const getUniqueId = (symbol: string, name: string): string => `${symbol}-${name}`;

export default function TableRowDashboard({
  index,
  ticker,
}: TableRowDashboardProps) {
  const { watchlist, setWatchlist, userId } = useDashboardContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  const uniqueId = getUniqueId(ticker.currency_symbol, ticker.name);
  const isWatched = watchlist.includes(uniqueId);

  const handleToggle = async () => {
    if (!userId) {
      alert("User ID tidak ditemukan. Pastikan Anda sudah login.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/signup/api/watchlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, uniqueId }),
      });

      if (response.ok) {
        const updatedWatchlist = isWatched
          ? watchlist.filter((id) => id !== uniqueId)
          : [...watchlist, uniqueId];
        
        setWatchlist([...new Set(updatedWatchlist)]);
        setIsInWatchlist(!isInWatchlist);  // Toggle state for watchlist
        console.log("Watchlist setelah toggle:", [...new Set(updatedWatchlist)]);
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Gagal memperbarui watchlist.");
      }
    } catch (error) {
      console.error("Error toggling watchlist:", error);
      alert("Gagal memperbarui watchlist. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleWatchlist = () => {
    setIsInWatchlist((prev) => !prev);
  };

  return (
    <TableRow>
      <TableCell onClick={toggleWatchlist} className="cursor-pointer">
        {isInWatchlist ? (
          <Star className="size-5 text-yellow-500" />
        ) : (
          <StarOutline className="size-5" />
        )}
      </TableCell>
      <TableCell className="line-clamp-1 break-all">{ticker.name}</TableCell>
      <TableCell className="text-right">
        {ticker.latest_price.toFixed(2)}
      </TableCell>
      <TableCell
        className={`text-right ${
          ticker.change_percentage > 0 ? "text-green-500" : "text-red-500"
        }`}
      >
        {ticker.change_percentage.toFixed(2)}%
      </TableCell>
      <TableCell className="text-center">
        <button
          onClick={handleToggle}
          className="focus:outline-none"
          disabled={isLoading}
        >
          {isWatched ? (
            <span
              role="img"
              aria-label="Unwatch"
              style={{ fontSize: "1.5rem", color: "red" }}
            >
              ❤️
            </span>
          ) : (
            <span
              role="img"
              aria-label="Watch"
              style={{ fontSize: "1.5rem", color: "gray" }}
            >
              🤍
            </span>
          )}
        </button>
      </TableCell>
    </TableRow>
  );
}
