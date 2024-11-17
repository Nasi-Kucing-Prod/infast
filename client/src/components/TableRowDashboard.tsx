import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";

export default function TableRowDashboard({ ticker }: { ticker: string }) {
  //   const resp = await fetch(
  //     `https://api.polygon.io/v3/reference/tickers/${ticker}?apiKey=vyXQ8mt1exG0nXMhxgiq2xaeuUKaLAT_`
  //   );

  //   const data = await resp.json();
  //   console.log(data);
  return (
    <TableRow>
      <TableCell className="font-medium">test</TableCell>
      <TableCell>{ticker}</TableCell>
      <TableCell className="text-right">18200</TableCell>
      <TableCell className="text-right">10%</TableCell>
    </TableRow>
  );
}
