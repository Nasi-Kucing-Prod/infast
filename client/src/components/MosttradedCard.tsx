"use client";
import { useState } from "react";

interface MostTradedProps {
  traded: Array<{
    ticker: string;
    price: string;
    change_amount: string;
    change_percentage: string;
    volume: string;
  }>;
}

const MostTradedCard = ({ traded }: MostTradedProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const tradedToShow = traded.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleShowNext = () => {
    if (currentPage * pageSize < traded.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleShowPrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <div className="flex flex-col border rounded-md h-full w-full p-5 gap-5 drop-shadow-md bg-white">
        <div className="flex flex-col">
          <h1 className="font-semibold sm:text-2xl text-xl">Most Traded</h1>
          <p className="text-gray-500 text-sm sm:text-base">
            See what market is trending
          </p>
        </div>
        <div className="flex flex-col gap-3">
          {tradedToShow.length > 0 ? (
            tradedToShow.map((trade) => (
              <div key={trade.ticker}>
                <div className="flex justify-between">
                  <div className="flex gap-2 text-center items-center">
                    <div className="w-14 h-14 rounded-full bg-emerald-800 flex justify-center items-center">
                      <p className="font-semibold sm:text-2xl text-base text-white">
                        {trade.ticker.charAt(0).toUpperCase()}
                      </p>
                    </div>
                    <div className="text-start">
                      <p className="text-gray-500 sm:text-sm text-xs">
                        {trade.ticker}
                      </p>
                      <p className="font-semibold sm:text-lg text-base">
                        {trade.ticker}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 items-center text-center">
                    {/* price */}
                    <p className="font-semibold sm:text-2xl text-xl">
                      {trade.price}
                    </p>
                    {/* change_percentage */}
                    <p className="border border-emerald-800 p-1 text-emerald-800 rounded-md sm:text-sm text-xs">
                      {trade.change_percentage}%
                    </p>
                  </div>
                </div>
                <div className="border-b pt-3"></div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No traded data available.</p>
          )}
        </div>
        <div className="flex gap-2 items-center justify-end">
          {currentPage > 1 && (
            <button
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 text-gray-700 font-semibold"
              onClick={handleShowPrev}
            >
              Previous
            </button>
          )}
          {traded.length > currentPage * pageSize && (
            <button
              className="px-4 py-2 bg-emerald-800 rounded-md text-white font-semibold hover:bg-emerald-700"
              onClick={handleShowNext}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default MostTradedCard;
