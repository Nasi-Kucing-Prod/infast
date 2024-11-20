import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronRight } from "lucide-react";
import { NewsDashboardRow } from "./NewsDashboardRow";

export default async function NewsDashboard() {
  const resp = fetch("http://localhost:8000/news");
  const data = await (await resp).json();

  return (
    <section className="w-full md:w-6/12 h-[543.5px] bg-white rounded-xl p-5 flex flex-col ">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-emerald-800">News</h2>
        <hr className="border-emerald-800" />
      </div>
      <ScrollArea className="flex-1 mt-2 ">
        {data.feed.map((item: NewsItem, idx: number) => (
          <div key={idx}>
            <NewsDashboardRow item={item} />
            <hr />
          </div>
        ))}
      </ScrollArea>
    </section>
  );
}
