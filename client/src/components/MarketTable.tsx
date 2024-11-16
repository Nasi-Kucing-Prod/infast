import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/utils/formatCurrency";
import { ArrowDown, ArrowUp } from "lucide-react";
import Image from "next/image";
import LoadingMarket from "./LoadingMarket";

interface MarketData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: string;
  market_cap_rank: number;
  market_cap_change_percentage_24h: number;
  currency: string;
}

interface MarketTableProps {
  marketData: MarketData[];
  loading: boolean;
}

const MarketTable: React.FC<MarketTableProps> = ({ marketData, loading }) => {
  return (
    <section className="px-5 py-2 bg-white rounded-xl border">
      <Table>
        <TableHeader>
          <TableRow className="text-nowrap">
            <TableHead className="w-[100px] text-black">No</TableHead>
            <TableHead className="w-7/12 text-black">Asset Name</TableHead>
            <TableHead className="text-start text-black">
              Latest Price
            </TableHead>
            <TableHead className="text-start text-black">% Change</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <LoadingMarket /> // Use SkeletonLoader here while loading
          ) : (
            marketData.map((market) => (
              <TableRow key={market.id}>
                <TableCell className="font-medium">
                  {market.market_cap_rank}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2 items-center">
                    <Image src={market.image} alt="" width={25} height={25} />
                    <div className="flex gap-2 items-center">
                      <p className="font-semibold md:text-sm text-xs">
                        {market.name}
                      </p>
                      <p className="text-gray-500 md:text-sm text-xs uppercase">
                        {market.symbol}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-start font-semibold md:text-sm text-xs">
                  {formatCurrency(
                    parseFloat(market.current_price),
                    market.currency
                  )}
                </TableCell>
                <TableCell
                  className={`text-start font-semibold md:text-sm text-xs ${
                    market.market_cap_change_percentage_24h < 0
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {market.market_cap_change_percentage_24h < 0 ? (
                    <span>
                      <ArrowDown className="inline-block w-4 h-4 mr-1" />
                      {market.market_cap_change_percentage_24h}%
                    </span>
                  ) : (
                    <span>
                      <ArrowUp className="inline-block w-4 h-4 mr-1" />
                      {market.market_cap_change_percentage_24h}%
                    </span>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </section>
  );
};

export default MarketTable;
