import React from "react";
import { ChevronRight } from "lucide-react";

export const NewsDashboardRow = ({ item }: { item: NewsItem }) => {
  return (
    <article className="flex justify-between py-2">
      <div className="w-3/4">
        <h3 className="line-clamp-1">{item.title}</h3>
        <p className="line-clamp-1 space-x-3">
          {item.ticker_sentiment?.map((el, idx) => {
            console;

            let sentimentClass = "";

            switch (el.ticker_sentiment_label.toLocaleLowerCase()) {
              case "neutral":
                sentimentClass = "text-gray-600";
                break;
              case "bearish":
                sentimentClass = "text-red-800";
                break;
              case "somewhat-bearish":
                sentimentClass = "text-red-500";
                break;
              case "somewhat-bullish":
                sentimentClass = "text-green-500";
                break;
              case "bullish":
                sentimentClass = "text-green-800";
                break;
              default:
                sentimentClass = "text-gray-500";
                break;
            }
            return (
              <span key={idx} className={`font-medium ${sentimentClass} `}>
                {el.ticker}
              </span>
            );
          })}
        </p>
      </div>
      <button className="mr-2">
        <ChevronRight className="size-8 text-primary-infast" />
      </button>
    </article>
  );
};
