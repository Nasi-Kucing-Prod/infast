// components/SkeletonLoader.tsx
import React from "react";

// SkeletonLoader component to display loading skeleton for table rows
const LoadingMarket = () => {
  return (
    <>
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <tr key={index} className="h-screen">
            <td className="animate-pulse bg-gray-300 h-6 w-24"></td>
            <td className="animate-pulse bg-gray-300 h-6 w-40"></td>
            <td className="animate-pulse bg-gray-300 h-6 w-24"></td>
            <td className="animate-pulse bg-gray-300 h-6 w-20"></td>
          </tr>
        ))}
    </>
  );
};

export default LoadingMarket;
