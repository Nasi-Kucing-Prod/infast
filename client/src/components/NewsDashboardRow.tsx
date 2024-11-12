import React from "react";
import { ChevronRight } from "lucide-react";

export const NewsDashboardRow = () => {
  return (
    <article className="flex justify-between py-2">
      <div className="w-3/4">
        <h3 className="line-clamp-1">TSAA Rally: Whats Next?</h3>
        <p className="line-clamp-1">
          Lorem ipsum odor amet, consectetuer adipiscing elit.
        </p>
      </div>
      <button className="mr-2">
        <ChevronRight className="size-8 text-emerald-800" />
      </button>
    </article>
  );
};
