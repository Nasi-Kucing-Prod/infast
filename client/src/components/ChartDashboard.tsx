"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { Search } from "lucide-react";

declare global {
  interface Window {
    TradingView?: {
      widget: new (config: Record<string, unknown>) => void;
    };
  }
}

interface ChartDashboardProps {
  market: "crypto" | "stocks" | "fx";
}

export function ChartDashboard({ market }: ChartDashboardProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Ticker[]>([]);
  const [chartSymbol, setChartSymbol] = useState<string>("");
  const [selectedCurrency, setSelectedCurrency] = useState<{
    name: string;
    symbol: string;
  }>({ name: "", symbol: "" });

  const getDefaultChartSymbol = useCallback(async () => {
    try {
      let topSymbol = "";
      if (market === "crypto") {
        topSymbol = "BTCUSD";
      } else if (market === "stocks") {
        topSymbol = "AAPL";
      } else if (market === "fx") {
        topSymbol = "EURUSD";
      }

      setChartSymbol(topSymbol);
      setSelectedCurrency({
        name: topSymbol,
        symbol: topSymbol.split("/")[0] || topSymbol,
      });
    } catch (error) {
      console.error("Error setting default chart symbol:", error);
    }
  }, [market]);

  useEffect(() => {
    getDefaultChartSymbol();
  }, [getDefaultChartSymbol]);

  useEffect(() => {
    if (typeof window !== "undefined" && chartContainerRef.current) {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/tv.js";
      script.async = true;
      script.onload = () => {
        if (window.TradingView) {
          new window.TradingView.widget({
            container_id: chartContainerRef.current?.id,
            symbol: chartSymbol,
            interval: "5",
            theme: "Light",
            style: "1",
            library_path: "/charting_library/",
            locale: "en",
            width: "100%",
            height: "400px",
            hide_top_toolbar: false,
            left_toolbar: true,
            hide_side_toolbar: false,
            allow_symbol_change: false,
            hideideas: true,
            hide_technical_indicators: true,
            debug: false,
            chartsStorageUrl: "https://saveload.tradingview.com",
            chartsStorageApiVersion: "1.1",
            clientId: "tradingview.com",
            userId: "public_user_id",
            preset: "mobile",
          });
        }
      };
      document.body.appendChild(script);

      return () => {
        script.remove();
      };
    }
  }, [chartSymbol]);

  const fetchSearchResults = async (query: string) => {
    try {
      const response = await fetch(
        `https://api.polygon.io/v3/reference/tickers?market=${market}&search=${query}&active=true&limit=3&apiKey=${process.env.NEXT_PUBLIC_PRIVATE_KEY_POLYGON}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      }
      const data: SearchResponse = await response.json();
      setSearchResults(data.results || []);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchResults([]);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchClick = () => {
    if (searchQuery) {
      fetchSearchResults(searchQuery);
    } else {
      setSearchResults([]);
    }
  };

  const handleResultClick = (currencySymbol: string, currencyName: string) => {
    setChartSymbol(currencySymbol);
    setSelectedCurrency({ name: currencyName, symbol: currencySymbol });
    setSearchResults([]);
    setSearchQuery("");
  };

  return (
    <section className="w-full bg-white rounded-xl p-5 flex flex-col justify-between h-full">
      <div className="flex justify-between">
        <div className="flex gap-2 mb-5">
          <div className="bg-emerald-200/30 text-primary-infast border-2 border-emerald-400/30 rounded-full p-2 w-10 h-10 flex items-center justify-center">
            {selectedCurrency.symbol[0]}
          </div>
          <div>
            <h3 className="text-xs">{selectedCurrency.symbol}</h3>
            <h2 className="text-lg">{selectedCurrency.name}</h2>
          </div>
        </div>
        <div className=" max-w-sm w-1/2 md:min-w-[200px]">
          <div className="relative">
            <input
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-9 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              placeholder="Search tickers..."
            />
            <button
              onClick={handleSearchClick}
              className="absolute top-1 right-1 flex items-center rounded bg-slate-800 py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
            >
              <Search className="size-5" />
            </button>
            {searchResults.length > 0 && (
              <ul className="absolute z-10 bg-white border border-gray-200 rounded-md shadow-lg mt-2 w-full">
                {searchResults.map((result) => (
                  <li
                    key={result.ticker}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() =>
                      handleResultClick(
                        result.base_currency_symbol,
                        result.name
                      )
                    }
                  >
                    {result.name} ({result.base_currency_symbol})
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      <div id="tv_chart_container" ref={chartContainerRef} />
    </section>
  );
}
