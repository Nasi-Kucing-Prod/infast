import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronRight } from "lucide-react";

export default async function NewsDashboard() {
  const resp = fetch("http://localhost:8000/news");
  const data = await (await resp).json();

  return (
    <section className="w-full md:w-8/12 h-[500px] bg-white rounded-xl p-5 flex flex-col ">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-emerald-800">News</h2>
        <hr className="border-emerald-800" />
      </div>
      <ScrollArea className="flex-1 mt-2 ">
        {data.feed.map((item: NewsItem, idx: number) => (
          <>
            <article key={idx} className="flex justify-between py-2">
              <div className="w-3/4">
                <h3 className="line-clamp-1">{item.title}</h3>
                <p className="line-clamp-1 space-x-3">
                  {item.ticker_sentiment?.map((el, idx) => (
                    <span className="">{el.ticker}</span>
                  ))}
                </p>
              </div>
              <button className="mr-2">
                <ChevronRight className="size-8 text-emerald-800" />
              </button>
            </article>
            <hr />
          </>
        ))}
      </ScrollArea>
    </section>
  );
}
