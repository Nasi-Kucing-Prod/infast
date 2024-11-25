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
  selectedCurrency: string;
  currencies: [];
  market_cap: number;
  total_volume: number;
}

const currencies = [
  { currency: "btc", symbol: "₿" },
  { currency: "eth", symbol: "Ξ" },
  { currency: "ltc", symbol: "Ł" },
  { currency: "bch", symbol: "₿" },
  { currency: "bnb", symbol: "B$" },
  { currency: "eos", symbol: "EOS" },
  { currency: "xrp", symbol: "XRP" },
  { currency: "xlm", symbol: "XLM" },
  { currency: "link", symbol: "⛓" },
  { currency: "dot", symbol: "DOT" },
  { currency: "yfi", symbol: "YFI" },
  { currency: "usd", symbol: "$" },
  { currency: "aed", symbol: "د.إ" },
  { currency: "ars", symbol: "$" },
  { currency: "aud", symbol: "A$" },
  { currency: "bdt", symbol: "৳" },
  { currency: "bhd", symbol: ".د.ب" },
  { currency: "bmd", symbol: "$" },
  { currency: "brl", symbol: "R$" },
  { currency: "cad", symbol: "C$" },
  { currency: "chf", symbol: "Fr." },
  { currency: "clp", symbol: "$" },
  { currency: "cny", symbol: "¥" },
  { currency: "czk", symbol: "Kč" },
  { currency: "dkk", symbol: "kr." },
  { currency: "eur", symbol: "€" },
  { currency: "gbp", symbol: "£" },
  { currency: "gel", symbol: "₾" },
  { currency: "hkd", symbol: "HK$" },
  { currency: "huf", symbol: "Ft" },
  { currency: "idr", symbol: "Rp" },
  { currency: "ils", symbol: "₪" },
  { currency: "inr", symbol: "₹" },
  { currency: "jpy", symbol: "¥" },
  { currency: "krw", symbol: "₩" },
  { currency: "kwd", symbol: "KD" },
  { currency: "lkr", symbol: "රු" },
  { currency: "mmk", symbol: "K" },
  { currency: "mxn", symbol: "$" },
  { currency: "myr", symbol: "RM" },
  { currency: "ngn", symbol: "₦" },
  { currency: "nok", symbol: "kr" },
  { currency: "nzd", symbol: "NZ$" },
  { currency: "php", symbol: "₱" },
  { currency: "pkr", symbol: "₨" },
  { currency: "pln", symbol: "zł" },
  { currency: "rub", symbol: "₽" },
  { currency: "sar", symbol: "﷼" },
  { currency: "sek", symbol: "kr" },
  { currency: "sgd", symbol: "S$" },
  { currency: "thb", symbol: "฿" },
  { currency: "try", symbol: "₺" },
  { currency: "twd", symbol: "NT$" },
  { currency: "uah", symbol: "₴" },
  { currency: "vef", symbol: "Bs" },
  { currency: "vnd", symbol: "₫" },
  { currency: "zar", symbol: "R" },
  { currency: "xdr", symbol: "SDR" },
  { currency: "xag", symbol: "Ag" },
  { currency: "xau", symbol: "Au" },
  { currency: "bits", symbol: "ƀ" },
  { currency: "sats", symbol: "⚡" },
];

const Page = () => {
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState<string>("usd");
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [tempQuery, setTempQuery] = useState<string>("");

  const fetchMarketData = async (currency: string, coinIds?: string[]) => {
    setLoading(true);
    try {
      const url = coinIds
        ? `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${coinIds.join(
            ","
          )}`
        : `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}`;

      const res = await fetch(url, {
        headers: {
          "x-cg-demo-api-key": `${process.env.PRIVATE_KEY_COINGECKO}`,
          accept: "application/json",
        },
      });

      const data = await res.json();
      setMarketData(data || []);
    } catch (error) {
      console.error("Error fetching market data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSearchResults = async (query: string) => {
    if (!query) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/search?query=${query}`,
        {
          headers: {
            "x-cg-demo-api-key": "CG-UUnXrRvqEcPATphhGCBjK9jY",
            accept: "application/json",
          },
        }
      );
      const data = await res.json();
      const coinIds = data.coins.map((coin: { id: string }) => coin.id);
      fetchMarketData(selectedCurrency, coinIds);
    } catch (error) {
      console.error("Error searching for coin:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketData(selectedCurrency);
    console.log(marketData);
  }, [selectedCurrency]);

  const handleSearch = () => {
    setSearchQuery(tempQuery);
    fetchSearchResults(tempQuery);
  };

  return (
    <>
      <div className="my-10 flex flex-col gap-5">
        <div className="flex sm:flex-row flex-col justify-between mb-3 gap-2 text-center items-center">
          <div className="flex gap-2 items-center text-center justify-between sm:w-fit w-full">
            <h1 className="font-semibold md:text-2xl text-xl">Crypto</h1>
            <DropdownMenu>
              <DropdownMenuTrigger className="border-primary-infast rounded-md px-2 py-1 text-primary-infast text-sm border font-semibold cursor-pointer sm:text-base">
                {selectedCurrency.toUpperCase()}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="max-h-96 overflow-y-auto border border-gray-200 rounded-md shadow-md bg-white">
                <DropdownMenuLabel className="sm:text-base text-sm">
                  Currencies
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {currencies.map(({ currency }) => (
                  <DropdownMenuItem
                    key={currency}
                    onClick={() => setSelectedCurrency(currency)}
                    className="cursor-pointer sm:text-base text-sm"
                  >
                    {currency.toUpperCase()}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex gap-2 items-center text-center justify-between sm:w-fit w-full ">
            <input
              type="text"
              value={tempQuery}
              onChange={(e) => setTempQuery(e.target.value)}
              placeholder="Search for a coin"
              className="border px-2 py-1 rounded-md sm:text-base text-sm w-full"
            />
            <button
              onClick={handleSearch}
              className="bg-primary-infast text-white px-2 py-1 rounded-md font-semibold sm:text-base text-sm"
            >
              Search
            </button>
          </div>
        </div>
        <MarketTable
          marketData={marketData}
          loading={loading}
          selectedCurrency={selectedCurrency}
          currencies={currencies}
        />
      </div>
    </>
  );
};

export default Page;
