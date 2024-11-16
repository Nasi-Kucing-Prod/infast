import React from "react";
import { ChevronRight } from "lucide-react";

export const NewsDashboardRow = ({ item }: { item: NewsItem }) => {
  return (
    <article className="flex justify-between py-2">
      <div className="w-3/4">
        <h3 className="line-clamp-1">{item.title}</h3>
        <p className="line-clamp-1 space-x-3">
          {item.ticker_sentiment?.map((el, idx) => (
            <span key={idx} className="">
              {el.ticker}
            </span>
          ))}
        </p>
      </div>
      <button className="mr-2">
        <ChevronRight className="size-8 text-emerald-800" />
      </button>
    </article>
  );
};
