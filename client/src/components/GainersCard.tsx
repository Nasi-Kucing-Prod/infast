"use client";
import { useState } from "react";

interface GainersCardProps {
  gainers: Array<{
    ticker: string;
    price: string;
    change_amount: string;
    change_percentage: string;
    volume: string;
  }>;
}

const GainersCard = ({ gainers }: GainersCardProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const gainersToShow = gainers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleShowNext = () => {
    if (currentPage * pageSize < gainers.length) {
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
          <h1 className="font-semibold sm:text-2xl text-xl">Stock Grainers</h1>
          <p className="text-gray-500 text-sm sm:text-base">
            See what gains the most
          </p>
        </div>
        <div className="flex flex-col gap-3">
          {gainersToShow.length > 0 ? (
            gainersToShow.map((gainer) => (
              <div key={gainer.ticker}>
                <div className="flex justify-between">
                  <div className="flex gap-2 text-center items-center">
                    <div className="w-14 h-14 rounded-full bg-primary-infast flex justify-center items-center">
                      <p className="font-semibold sm:text-2xl text-base text-white">
                        {gainer.ticker.charAt(0).toUpperCase()}
                      </p>
                    </div>
                    <div className="text-start">
                      <p className="text-gray-500 sm:text-sm text-xs">
                        {gainer.ticker}
                      </p>
                      <p className="font-semibold sm:text-lg text-base">
                        {gainer.ticker}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 items-center text-center">
                    {/* price */}
                    <p className="font-semibold sm:text-2xl text-xl">
                      {gainer.price}
                    </p>
                    {/* change_percentage */}
                    <p className="border border-primary-infast p-1 text-primary-infast rounded-md sm:text-sm text-xs">
                      {gainer.change_percentage}
                    </p>
                  </div>
                </div>
                <div className="border-b pt-3"></div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No gainers data available.</p>
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
          {gainers.length > currentPage * pageSize && (
            <button
              className="px-4 py-2 bg-primary-infast rounded-md text-white font-semibold hover:bg-emerald-700"
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

export default GainersCard;
