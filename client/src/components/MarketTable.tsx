import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  selectedCurrency: string;
  currencies: [];
  market_cap: number;
  total_volume: number;
}

interface Currency {
  currency: string;
  symbol: string;
}
interface MarketTableProps {
  marketData: MarketData[];
  loading: boolean;
  selectedCurrency: string;
  currencies: Currency[];
}

const formatNumber = (number: string | number): string => {
  return new Intl.NumberFormat("id-ID", {
    // minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(number));
};

const MarketTable: React.FC<MarketTableProps> = ({
  marketData,
  loading,
  selectedCurrency,
  currencies,
}) => {
  return (
    <section className="px-5 py-2 bg-white rounded-xl border drop-shadow-md">
      <Table>
        <TableHeader>
          <TableRow className="text-nowrap">
            <TableHead className="w-[100px] text-black">#</TableHead>
            <TableHead className="w-5/12 text-black">Coin</TableHead>
            <TableHead className="text-start text-black"></TableHead>
            <TableHead className="text-start text-black">% Change</TableHead>
            <TableHead className="text-start text-black">Price</TableHead>
            <TableHead className="text-start text-black">Volume</TableHead>
            <TableHead className="text-start text-black">
              Market Capital
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <LoadingMarket />
          ) : (
            marketData.map((market) => {
              // Cari simbol mata uang yang sesuai berdasarkan simbol coin
              const currencyInfo = currencies.find(
                (currency: Currency) => currency.currency === selectedCurrency
              );

              return (
                <TableRow key={market.id}>
                  <TableCell className="font-medium">
                    {formatNumber(market.market_cap_rank)}
                  </TableCell>
                  <TableCell>
                    <div className="flex  gap-2 items-center">
                      <Image
                        src={market.image}
                        alt={market.name}
                        width={25}
                        height={25}
                      />
                      <div className="flex md:flex-row flex-col gap-2 items-start">
                        <p className="font-semibold md:text-sm text-xs">
                          {market.name}
                        </p>
                        <p className="text-gray-500 md:text-sm text-xs uppercase">
                          {market.symbol}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell
                    className={`text-start font-semibold md:text-sm text-xs text-nowrap ${
                      market.market_cap_change_percentage_24h < 0
                        ? ""
                        : "text-green-500 "
                    }`}
                  >
                    {market.market_cap_change_percentage_24h < 0 ? (
                      ""
                    ) : (
                      <span className="border rounded-md border-green-500 px-2">
                        Buy
                      </span>
                    )}
                  </TableCell>
                  <TableCell
                    className={`text-start font-semibold md:text-sm text-xs text-nowrap ${
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
                  <TableCell className="text-start font-semibold md:text-sm text-xs">
                    <span>{currencyInfo?.symbol || "Unknown Currency"}</span>
                    {formatNumber(market.current_price)}
                  </TableCell>

                  <TableCell className="text-start font-semibold md:text-sm text-xs">
                    <span>{currencyInfo?.symbol || "Unknown Currency"}</span>
                    {formatNumber(market.total_volume)}
                  </TableCell>
                  <TableCell className="text-start font-semibold md:text-sm text-xs">
                    <span>{currencyInfo?.symbol || "Unknown Currency"}</span>
                    {formatNumber(market.market_cap)}
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </section>
  );
};

export default MarketTable;
