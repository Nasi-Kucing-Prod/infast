import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";

export default function TableRowDashboard({
  index,
  ticker,
}: TableRowDashboardProps) {
  return (
    <TableRow>
      <TableCell>{index}</TableCell>
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
