"use client";
import React, { useEffect, useState } from "react";
import MarketTable from "@/components/MarketTable";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

const currencies = [
  "btc",
  "eth",
  "ltc",
  "bch",
  "bnb",
  "eos",
  "xrp",
  "xlm",
  "link",
  "dot",
  "yfi",
  "usd",
  "aed",
  "ars",
  "aud",
  "bdt",
  "bhd",
  "bmd",
  "brl",
  "cad",
  "chf",
  "clp",
  "cny",
  "czk",
  "dkk",
  "eur",
  "gbp",
  "gel",
  "hkd",
  "huf",
  "idr",
  "ils",
  "inr",
  "jpy",
  "krw",
  "kwd",
  "lkr",
  "mmk",
  "mxn",
  "myr",
  "ngn",
  "nok",
  "nzd",
  "php",
  "pkr",
  "pln",
  "rub",
  "sar",
  "sek",
  "sgd",
  "thb",
  "try",
  "twd",
  "uah",
  "vef",
  "vnd",
  "zar",
  "xdr",
  "xag",
  "xau",
  "bits",
  "sats",
];

const Page = () => {
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState<string>("usd");
  const [loading, setLoading] = useState<boolean>(false);

  const fetchMarketData = async (currency: string) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}`,

        {
          headers: {
            "x-cg-demo-api-key": "CG-UUnXrRvqEcPATphhGCBjK9jY",
            accept: "application/json",
          },

          cache: "no-cache",
        }
      );
      const data = await res.json();
      setMarketData(data || []);
    } catch (error) {
      console.error("Error fetching market data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketData(selectedCurrency);
  }, [selectedCurrency]);
  return (
    <>
      <div className="my-10 flex flex-col gap-5">
        <div className="flex gap-3 mb-3 text-center items-center">
          <h1 className="font-semibold md:text-2xl text-xl">Crypto</h1>
          <DropdownMenu>
            <DropdownMenuTrigger className="border-emerald-800 rounded-md px-2 py-1 text-emerald-800 text-sm border font-semibold cursor-pointer">
              Select Currencies
            </DropdownMenuTrigger>
            <DropdownMenuContent className="max-h-96 overflow-y-auto border border-gray-200 rounded-md shadow-md bg-white">
              <DropdownMenuLabel>Currencies</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {currencies.map((currency) => (
                <DropdownMenuItem
                  key={currency}
                  onClick={() => setSelectedCurrency(currency)}
                  className="cursor-pointer"
                >
                  {currency.toUpperCase()}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <MarketTable marketData={marketData} loading={loading} />
      </div>
    </>
  );
};

export default Page;
