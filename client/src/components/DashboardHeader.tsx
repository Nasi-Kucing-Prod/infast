import { Slash } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const DashboardHeader = () => {
  return (
    <section className="flex justify-between  items-center px-5 p-3">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage className="text-emerald-800">Market</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex gap-2 items-center">
        <div>
          <h2 className="text-sm">User 1</h2>
          <h3 className="text-xs">ID: 3133</h3>
        </div>
        <div className="bg-emerald-200/30 text-emerald-800 border-2 border-emerald-400/30 rounded-full p-2 w-10 h-10 flex items-center justify-center">
          ?
        </div>
      </div>
    </section>
  );
};
