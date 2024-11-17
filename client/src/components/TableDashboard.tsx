"use client";
import { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableRowDashboard from "./TableRowDashboard";

export default function TableDashboard() {
  const [data, setData] = useState<Ticker[][]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const apiKey = "vyXQ8mt1exG0nXMhxgiq2xaeuUKaLAT_";

  const fetchData = async (url: string, pageIndex: number) => {
    setLoading(true);
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const json: ApiResponse = await response.json();

      if (Array.isArray(json.results)) {
        setData((prevData) => {
          const newData = [...prevData];
          newData[pageIndex] = json.results;
          return newData;
        });
        setNextUrl(json.next_url ? `${json.next_url}&apiKey=${apiKey}` : null);
      } else {
        console.warn("Unexpected data format:", json);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initialUrl = `https://api.polygon.io/v3/reference/tickers?market=crypto&active=true&limit=8&apiKey=${apiKey}`;
    fetchData(initialUrl, 0);
  }, []);

  const handleNextPage = () => {
    if (currentPage + 1 < data.length) {
      setCurrentPage(currentPage + 1);
    } else if (nextUrl) {
      fetchData(nextUrl, currentPage + 1);
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <section className="px-5 py-2 bg-white rounded-xl w-full">
      <Table>
        <TableHeader>
          <TableRow className="text-nowrap">
            <TableHead className="w-[100px]">No</TableHead>
            <TableHead>Asset Name</TableHead>
            <TableHead className="text-right">Latest Price</TableHead>
            <TableHead className="text-right">% Change</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data[currentPage]?.map((ticker, idx) => (
            <TableRowDashboard key={idx} ticker={ticker.ticker} />
          )) || (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                {loading ? "Loading..." : "No data available"}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 0}
          className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
        >
          Prev
        </button>
        <button
          onClick={handleNextPage}
          disabled={!nextUrl && currentPage + 1 === data.length}
          className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </section>
  );
}
