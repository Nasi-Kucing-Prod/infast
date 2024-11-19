"use client";
import { Star, Star as StarOutline } from "lucide-react";
import { useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";

export default function TableRowDashboard({
  index,
  ticker,
}: TableRowDashboardProps) {
  const [isInWatchlist, setIsInWatchlist] = useState(false);

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
    </TableRow>
  );
}
